import SNS from 'aws-sdk/clients/sns';

export function sendFeed(feed, lastUpdated) {
  const snsClient = new SNS();
  const params = {
    TopicArn: process.env.SNS_TOPIC_ARN,
    Message: JSON.stringify({ feed, lastUpdated })
  };
  return snsClient.publish(params).promise();
}
