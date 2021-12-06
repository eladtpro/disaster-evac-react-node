module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger broadcaster function processed a request.');

    //const name = (req.query.name || (req.body && req.body.name));
    const body = JSON.parse(req.body);
    const messages = [{
        target: 'statusUpdates',
        arguments: ['args1', 'args2']
    },
    {
        target: 'statusUpdates',
        arguments: ['args3', 'args4']
    }]

    context.bindings.signalRMessages = messages

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}