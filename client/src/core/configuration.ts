const configuration = {
    signalr: {
        configEndpoint: 'https://func-saga.azurewebsites.net/api/signalr?code=mMlyFXj52OCsMMsNrIECqOih/UZR2Cskdp8yAle5rOf1ZGSl8FMsAQ==',// process.env.REACT_APP_SIGNALR_FUNCTION_ENDPOINT!,
        disconnectBeforeUnload: false
    },
    serviceBus:{
        topicEndpoint: 'https://func-saga.azurewebsites.net/api/queue-change?code=FO0fnDCEdz4TiCKOTUaQmQI7pwHGsXOw1JHuH5WOZWkwh9e20NY9WA==' // process.env.REACT_APP_QUEUE_CHANGE_ENDPOINT!
    },
    monitor:{
        appInsightsKey: '3359c7d4-06ae-4380-806d-71de3494f0bb' // process.env.REACT_APP_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY!
    }
}

export { configuration }