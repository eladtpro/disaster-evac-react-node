const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;

module.exports = async function (context, _req, connectionInfo) {
    context.log('[signalr] JavaScript HTTP trigger function processed a request.');
    context.res = { body: connectionInfo };

    const operationIdOverride = { "ai.operation.id": context.traceContext.traceparent };
    client.trackEvent({ name: "signalr", tagOverrides: operationIdOverride, properties: { operation_id: topicItem.operation_id } });
    //client.trackDependency({ target: "db-actions", name: "save status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "CosmosDB", tagOverrides: operationIdOverride });
}