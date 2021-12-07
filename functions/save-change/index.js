const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;

module.exports = async function (context, topicItem) {
    context.log(`[save-change] JavaScript Service Bus trigger function called for message topicItem ${topicItem}`);

    const operationIdOverride = { "ai.operation.id": topicItem.operation_id };
    client.trackEvent({ name: "save-change", tagOverrides: operationIdOverride, properties: { operation_id: topicItem.operation_id } });
    client.trackDependency({ target: "db-actions", name: "save status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "CosmosDB", tagOverrides: operationIdOverride });

    context.bindings.actionDocument = JSON.stringify({
        operation_id: topicItem.operation_id,
        topicItem,
        bindingData: context.bindingData
    });

    context.res = {
        status: 200,
        body: item
    };
};