'use strict';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/130781547038/packages.fifo',
  handleMessage: (message) => {
    console.log(JSON.parse(message.Body));
  },
});

app.start();