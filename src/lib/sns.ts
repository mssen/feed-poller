// const SNS = require('aws-sdk/clients/sns');
import AWS = require('aws-sdk');

export const sendFeed = (feedUrl: string, lastUpdated: number) => {
  const snsClient = new AWS.SNS();
  const params = {
    TopicArn: process.env.SNS_TOPIC_ARN,
    Message: JSON.stringify({ feedUrl, lastUpdated })
  };
  return snsClient.publish(params).promise();
};
