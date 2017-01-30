require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');

// Create body parsers for application/json and application/x-www-form-urlencoded
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var useTls = process.env.MY_APP_TLS_ENABLED > 0 ? true : false;
var server = null;
var port = process.env.MY_APP_PORT;

var subscribed = false;

if (useTls) {
  var tls = require('tls'),
      fs = require('fs');
  server = https.createServer({
    key: fs.readFileSync(process.env.MY_APP_TLS_PRIVATE_KEY),
    cert: fs.readFileSync(process.env.MY_APP_TLS_PUBLIC_CERT)
  }, app).listen(port, function() {
    console.log('LISTEN_HTTPS ' + port);    
  });
} else if (! useTls) {
  server = require('http').Server(app);
  server.listen(port, function() {
    console.log('LISTEN_HTTP ' + port);    
  });
}

var callback = function(error, normalized) {
  var hook = {
    icon: normalized.icon,
    email: normalized.email,
    name: normalized.name,
    link: normalized.link,
    title: normalized.title,
    activity: normalized.activity,
    body: normalized.body
  };

  request({
    url: 'https://hooks.glip.com/webhook/' + normalized.glipguid,
    method: "POST",
    json: hook
  });
}

var tc = require('./normalizer_travisci.js');

app.post('/webhook/travisci/out/glip/:glipguid/?', function(req, res) {
  var payload = JSON.parse(req.body.payload);
  var options = { glipguid: req.params.glipguid, payload: payload };
  var travisci = new tc.Travisci_Normalizer();
  travisci.normalize(options, callback);
  var note = 'Finished Travis CI Webhook Request';
  console.log(note);
  res.send(note);
});
