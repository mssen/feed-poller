const SNS = require('aws-sdk/clients/sns');

module.exports.sendFeed = (feed, lastUpdated) => {
  const snsClient = new SNS();
  const params = {
    TopicArn: process.env.SNS_TOPIC_ARN,
    Message: JSON.stringify({ feed, lastUpdated })
  };
  return snsClient.publish(params).promise();
};
