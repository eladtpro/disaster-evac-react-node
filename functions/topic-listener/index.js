module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
   
    const messages = [];
    eventHubMessages.forEach((message, index) => {
        const message = {
            target: 'statusUpdates',
            arguments: [index, message]
        }
        messages.push(message);
        context.log(`Processed message ${message}`);
    });
    context.bindings.signalRMessages = messages
    
    context.res = {
        status: 204, /* Defaults to 200 */
        //body: responseMessage
    };
};