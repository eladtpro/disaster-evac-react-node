const appInsights = require("applicationinsights");
appInsights.setup().setInternalLogging(true, true);
appInsights.defaultClient.config.maxBatchSize = 1;
const client = appInsights.defaultClient;

module.exports = async function (context, documents) {
    context.log(`[notify-change] CosmosDB Queue trigger broadcaster function processed a document. documents: ${documents.length}`);

    context.bindings.signalRMessages = documents.map(document => {
        const operationIdOverride = { "ai.operation.id": document.operation_id };
        client.trackEvent({ name: "notify-change", tagOverrides: operationIdOverride, properties: { ...document.queueItem } });
        client.trackDependency({ target: "sigr-backchannel", name: "notify status change", data: document.title, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "SignalR", tagOverrides: operationIdOverride });

        return {
            // message will only be sent to this user ID
            //"userId": "userId1",
            "target": "statusUpdates",
            "arguments": [document.queueItem]
        }
    });

    context.res = {
        status: 200
    };
}