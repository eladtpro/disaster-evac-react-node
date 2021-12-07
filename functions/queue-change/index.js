const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;

module.exports = async function (context, req) {
    const body = JSON.parse({ req })
    context.log(`[queue-change] JavaScript HTTP trigger function processed a request: ${body}`);

    const queueMessage = { ...req, operation_id: context.traceContext.traceparent }
    const message = JSON.parse(queueMessage);

    const operationIdOverride = { "ai.operation.id": context.traceContext.traceparent };
    client.trackEvent({ name: "queue-change", tagOverrides: operationIdOverride, properties: { operation_id: context.traceContext.traceparent } });
    client.trackDependency({ target: "evac-process", name: "queue status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "Topic", tagOverrides: operationIdOverride });

    context.bindings.outputSbQueue = message;
    context.res = {
        status: 204
    };
}