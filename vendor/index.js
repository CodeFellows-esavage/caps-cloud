'use strict';

const AWS = require('aws-sdk');
const { nanoid } = require('nanoid');
const randName = require('random-name');

AWS.config.update({ region: 'us-west-2' });

const sns = new AWS.SNS();
//the topic this message is published to on AWS
const topic = 'arn:aws:sns:us-west-2:130781547038:pickup.fifo';
const vendorArn = 'arn:aws:sqs:us-west-2:130781547038:vendor';

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

