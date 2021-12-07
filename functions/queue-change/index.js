const appInsights = require("applicationinsights");
appInsights.setup().setInternalLogging(true, true);
appInsights.defaultClient.config.maxBatchSize = 1;
const client = appInsights.defaultClient;

module.exports = async function (context, req) {
    context.log(`[queue-change] JavaScript HTTP trigger function processed a request: ${req.rawBody}`);
    const queueMessage = { ...req.body, operation_id: context.traceContext.traceparent }
    const message = JSON.stringify(queueMessage);

    const operationIdOverride = { "ai.operation.id": context.traceContext.traceparent };
    client.trackEvent({ name: "queue-change", tagOverrides: operationIdOverride, properties: { operation_id: context.traceContext.traceparent } });
    client.trackDependency({ target: "evac-process", name: "queue status change", data: message, duration: context.traceContext.duration, resultCode: 0, success: true, dependencyTypeName: "Topic", tagOverrides: operationIdOverride });

    context.bindings.outputSbTopic = message;
    context.res = {
        status: 204
    };
}

//context.log(context.req.rawBody);
//context.log(context.req.body);
//context.log(JSON.parse(context.req.rawBody));
//context.log(req.rawBody);
//context.log(req.body);
//context.log(JSON.parse(req.rawBody));
//context.log(context.traceContext);
//context.log(context.traceContext.traceparent);
