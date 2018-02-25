import SNS from 'aws-sdk/clients/sns';

export function sendFeed(feed) {
  const snsClient = new SNS();
  const params = {
    TopicArn: 'arn:aws:sns:us-east-2:202087792881:feed-update-dev',
    Message: feed
  };
  snsClient.publish(params).promise();
}
