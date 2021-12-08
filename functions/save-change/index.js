const appInsights = require("applicationinsights");
appInsights.setup().setInternalLogging(true, true);
appInsights.defaultClient.config.maxBatchSize = 1;
const client = appInsights.defaultClient;

module.exports = async function (context, queueItem) {
    context.log(`[save-change] JavaScript Service Bus trigger function called for message queueItem ${queueItem}`);

    const operationIdOverride = { "ai.operation.id": queueItem.operation_id };
    client.trackEvent({ name: "save-change", tagOverrides: operationIdOverride, properties: { operation_id: queueItem.operation_id } });
    client.trackDependency({ target: "db-actions", name: "save status change", data: queueItem.operation_id, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "CosmosDB", tagOverrides: operationIdOverride });

    const doc = JSON.stringify({
        operation_id: queueItem.operation_id,
        queueItem,
        bindingData: context.bindingData
    });

    context.bindings.actionDocument = doc;

    context.res = {
        status: 200,
        body: doc
    };
};