import AWS from 'aws-sdk/global';
import DynamoDB from 'aws-sdk/clients/dynamodb';

AWS.config.update({ region: 'us-east-2' });

export function listFeeds(threshold) {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Feeds',
    FilterExpression: 'LastUpdated < :threshold',
    ExpressionAttributeValues: { ':threshold': threshold }
  };
  return documentClient.scan(params).promise();
}

export function updateLastUpdatedFeed(url, lastUpdated) {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Nope',
    Key: { HashKey: url },
    UpdateExpression: 'set LastUpdated = :currentLastUpdated',
    ExpressionAttributeValues: {
      ':currentLastUpdated': lastUpdated
    }
  };
  return documentClient.update(params).promise();
}

export function putWork(work) {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Works',
    Item: work
  };
  return documentClient.put(params).promise();
}
