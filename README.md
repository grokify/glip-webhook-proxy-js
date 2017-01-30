Glip Webhook Proxy
==================

[![Scrutinizer Code Quality][scrutinizer-status-svg]][scrutinizer-status-link]

Proxy service to map different requests to Glip's inbound webhook service. This is useful because various chat services have similar, but slightly different inbound webhook services. This proxy service does the conversion so you don't have to. Applications already integrated with Slack's inbound webhooks can create messages on Glip simply by using the proxy URL.

Conversion of the following webhook message formats to Glip inbound webhooks include:

* Travis CI (outbound)

Example Webhook Message from Travis CI:

![](docs/images/travisci_glip.png)

## Installation

```
$ git clone https://github.com/grokify/glip-webhook-proxy
```

## Usage

### Starting the Service

Start the service with the following.

```
$ cd glip-webhook-proxy
$ MY_APP_PORT=8080 node index.js
```

### Creating the Glip Webhook

1. create a Glip webhook
2. use webhook URL's GUID to create the proxy URL as shown below
3. use the proxy URL in your outbound webhook service

| Service | URL |
|------|-------|
| Glip | `https://hooks.glip.com/webhook/11112222-3333-4444-5555-666677778888` |
| Travis CI Outbound | `https://example.com/webhook/travisci/out/glip/11112222-3333-4444-5555-666677778888` |

The webhook proxy URLs support both inbound and outbound formats. For example:

* when using Travis CI's webhook format use `travisci/out/glip` to indicate converting a Travis CI outbound webhook format message to Glip.

To create the Glip webhook and receive a webhook URL do the following:

#### Add the Webhook Integration

At the top of any conversation page, click the Settings gear icon and then click `Add Integration`.

![](docs/images/glip_webhook_step-1_add-integration.png)

Select the `Glip Webhooks` integration.

![](docs/images/glip_webhook_step-2_add-webhook.png)

#### Get the Webhook URL

Once you get the URL, the proxy URL is created by appending the GUID (e.g. `1112222-3333-4444-5555-666677778888`) to the proxy URL base, `/webhook/slack/glip` (e.g. `https://glip-proxy.example.com/webhook/slack/glip/1112222-3333-4444-5555-666677778888`). Use the proxy URL in the app that is posting the Slack webhook and the payload will be sent to Glip.

![](docs/images/glip_webhook_step-3_details.png)

## Notes

Glip Webhook Proxy is built using:

* [express](https://github.com/expressjs/express)

 [scrutinizer-status-svg]: https://scrutinizer-ci.com/g/grokify/glip-webhook-proxy/badges/quality-score.png?b=master
 [scrutinizer-status-link]: https://scrutinizer-ci.com/g/grokify/glip-webhook-proxy/?branch=master
