var Travisci_Normalizer = function() {};

Travisci_Normalizer.prototype.icon = 'https://blog.travis-ci.com/images/travis-mascot-200px.png';

Travisci_Normalizer.prototype.normalize = function(options, callback) {
  var payload = options.payload;
  if (!payload) {
    return callback("No payload sent");
  }
  var normalized = this._standard_normalize(payload);
  normalized.glipguid = options.glipguid;
  return callback(null, normalized);
};

Travisci_Normalizer.prototype._standard_normalize = function(payload) {
  return {
    icon: this.icon,
    name: "Travis CI",
    link: payload.compare_url, 
    body: this._get_markdown(payload),
    payload: payload
  };
}

Travisci_Normalizer.prototype._get_markdown = function(payload) {
  var mkdn = 'Build [#' + payload.number + '](' + payload.build_url
    + ') ([' + payload.commit.substr(0,7) + '](' + payload.compare_url + ')) of '
    + payload.repository.name + '@' + payload.branch;
  return mkdn;
}

module.exports.Travisci_Normalizer = Travisci_Normalizer;
