const appInsights = require("applicationinsights");
appInsights.setup().setInternalLogging(true, true);
appInsights.defaultClient.config.maxBatchSize = 1;
const client = appInsights.defaultClient;

module.exports = async function (context, topicItem) {
    context.log(`[save-change] JavaScript Service Bus trigger function called for message topicItem ${topicItem}, type: ${typeof topicItem} `);

    const item = JSON.parse(topicItem);
    const operationIdOverride = { "ai.operation.id": item.operation_id };
    client.trackEvent({ name: "save-change", tagOverrides: operationIdOverride, properties: { item: topicItem } });
    client.trackDependency({ target: "db-actions", name: "save status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "CosmosDB", tagOverrides: operationIdOverride });

    const doc = JSON.stringify({
        operation_id: item.operation_id,
        item,
        bindingData: context.bindingData
    });

    context.bindings.actionDocument = doc;

    context.res = {
        status: 200,
        body: doc
    };
};