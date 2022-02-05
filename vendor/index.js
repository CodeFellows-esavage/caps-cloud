'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const sns = new AWS.SNS();
const topic = 'arn:aws:sns:us-west-2:130781547038:pickup';

const payload = {
  Message: 'PICK UP READY!',
  TopicArn: topic,
};

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));