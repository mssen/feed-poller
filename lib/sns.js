import SNS from 'aws-sdk/clients/sns';

export function sendFeed(feed, lastUpdatedAt) {
  const snsClient = new SNS();
  const params = {
    TopicArn: 'arn:aws:sns:us-east-2:202087792881:feed-update',
    Subject: feed,
    Message: `${lastUpdatedAt}`
  };
  snsClient.publish(params).promise();
}
