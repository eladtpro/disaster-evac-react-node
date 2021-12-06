const configuration = {
    signalr: {
        configEndpoint: process.env.REACT_APP_SIGNALR_FUNCTION_ENDPOINT!,
        disconnectBeforeUnload: false
    },
    monitor:{
        appInsightsKey: process.env.REACT_APP_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY!
    }
}

export { configuration }