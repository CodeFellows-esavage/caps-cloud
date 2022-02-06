'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/130781547038/packages.fifo',
  handleMessage: (message) => {
    const messageBody = JSON.parse(message.Body);
    const shipment = JSON.parse(messageBody.Message);

    console.log('SHIPMENT IN-TRANSIT: ', shipment);



    //the topic this message is published to on AWS
    const topic = 'arn:aws:sns:us-west-2:130781547038:delivered';
    const payload = {
      Message: `DELIVERED ORDER ID: ${shipment.orderId} to CUSTOMER: ${shipment.customer}`,
      TopicArn: topic,
    };

    let publishing = async () => {
      let randTime = Math.trunc(Math.random() * 6 + 5) * 1000;
      await new Promise(resolve => setTimeout(resolve, randTime));
      sns.publish(payload).promise()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    };

    publishing();
  },
});

app.start();