'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const { nanoid } = require('nanoid');
const randName = require('random-name');

AWS.config.update({ region: 'us-west-2' });

//the topic this message is published to on AWS
const topic = 'arn:aws:sns:us-west-2:130781547038:pickup.fifo';
const vendorArn = 'arn:aws:sqs:us-west-2:130781547038:vendor';

setInterval(() => {
  const sns = new AWS.SNS();

  const shipment = {
    orderId: nanoid(),
    customer: `${randName.first()} ${randName.last()}`,
    vendorId: vendorArn,
  };

  //using vendor arn for MessageGroupId so each vendors groupId is unique and processed in FIFO;
  const payload = {
    Message: JSON.stringify(shipment),
    MessageGroupId: vendorArn,
    TopicArn: topic,
  };

  sns.publish(payload).promise()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}, 10000);


const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/130781547038/vendor',
  handleMessage: (message) => {
    const messageBody = JSON.parse(message.Body);
    const deliveredMessage = messageBody.Message;
    console.log(deliveredMessage);
  },
});

app.start();