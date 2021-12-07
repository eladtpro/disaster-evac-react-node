const appInsights = require("applicationinsights");
appInsights.setup().setInternalLogging(true, true);
appInsights.defaultClient.config.maxBatchSize = 1;
const client = appInsights.defaultClient;

module.exports = async function (context) {
    context.log(`[notify-change] CosmosDB Queue trigger broadcaster function processed a document. inputDocumentIn: ${context.bindings.inputDocumentIn}`);

    const message = JSON.stringify(context.bindings.inputDocumentIn);

    const operationIdOverride = { "ai.operation.id": context.bindings.inputDocumentIn.operation_id };
    client.trackEvent({ name: "notify-change", tagOverrides: operationIdOverride, properties: { document: message } });
    client.trackDependency({ target: "sigr-backchannel", name: "notify status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "SignalR", tagOverrides: operationIdOverride });

    context.bindings.signalRMessages = [{
        // message will only be sent to this user ID
        //"userId": "userId1",
        "target": "statusUpdates",
        "arguments": [message]
    }];
}