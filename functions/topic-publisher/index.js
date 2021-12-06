module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //const name = (req.query.name || (req.body && req.body.name));
    const message = JSON.parse(req.body);

    context.bindings.outputSbQueue = message;
    context.done();

    context.res = {
         status: 204, /* Defaults to 200 */
        //body: responseMessage
    };
}