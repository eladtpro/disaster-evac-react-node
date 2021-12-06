const configuration = {
    signalr: {
        configEndpoint: process.env.REACT_APP_SIGNALR_FUNCTION_ENDPOINT!,
        disconnectBeforeUnload: false
    },
    serviceBus:{
        topicEndpoint: process.env.REACT_APP_SERVICEBUS_PUBLISH_ENDPOINT!
    },
    monitor:{
        appInsightsKey: process.env.REACT_APP_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY!
    }
}

export { configuration }