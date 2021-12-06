const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;

module.exports = async function (context, _req, connectionInfo) {
    context.log('JavaScript HTTP trigger signalr function processed a request.');
    context.res = { body: connectionInfo };
    context.done();
    client.trackEvent("SignalR Connection Requested")

    //client.trackDependency({ target: "http://dbname", name: "signalr-function", data: "connection info", duration: 231, resultCode: 0, success: true, dependencyTypeName: "ZSQL", tagOverrides: operationIdOverride });
}

//module.exports = async function (context, req) {
//    context.log('JavaScript HTTP trigger function processed a request.');

//    const name = (req.query.name || (req.body && req.body.name));
//    const responseMessage = name
//        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//    context.res = {
//        // status: 200, /* Defaults to 200 */
//        body: responseMessage
//    };
//}