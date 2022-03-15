const http = require('http');
const util = require('util')
const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = '<SERVICE-BUS CONNECTION STRING>';
const queueName = 'evac-process-q';
const port = process.env.PORT || 5000;
const serviceBusClient = new ServiceBusClient(connectionString);

const server = http.createServer(async (req, res) => {
  let msg = "Test Queue";
  if (req.method === "GET")
    msg = await getMessages();
  else
    msg = await queueMessage(req);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});

const getMessages = async () => {
  // To receive from a queue's dead letter sub-queue
  const deadLetter = serviceBusClient.createReceiver(queueName, {
    subQueueType: "deadLetter"
  });

  const messages = await deadLetter.receiveMessages(1);
  console.log('MESSAGES', messages);
  console.log('UTIL', util.inspect(messages));
  const deadMsgs = JSON.stringify(util.inspect(messages));
  return deadMsgs;
}

const queueMessage = async (req) => {

  const sender = serviceBusClient.createSender(queueName);
  const queueMessage = { ...req.body, operation_id: Date.now().toString() }
  const message = JSON.stringify(queueMessage);
  console.log('UTIL', util.inspect(message));

  // sending a single message
  await sender.sendMessages(message);
} 
