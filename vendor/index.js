'use strict';

const AWS = require('aws-sdk');
const { nanoid } = require('nanoid');
const randName = require('random-name');

AWS.config.update({ region: 'us-west-2' });

const sns = new AWS.SNS();
//the topic this message is published to on AWS
const topic = 'arn:aws:sns:us-west-2:130781547038:pickup.fifo';

const shipment = {
  orderId: nanoid(),
  customer: `${randName.first()} ${randName.last()}`,
  vendorId: 'arn:aws:sqs:us-west-2:130781547038:vendor',
};

const payload = {
  Message: shipment,
  TopicArn: topic,
};

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));

