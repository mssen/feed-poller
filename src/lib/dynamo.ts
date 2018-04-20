import AWS = require('aws-sdk/global');
import DynamoDB = require('aws-sdk/clients/dynamodb');

AWS.config.update({ region: 'us-east-2' });

export const listFeeds = (threshold: number) => {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Feeds',
    FilterExpression: 'LastUpdated < :threshold',
    ExpressionAttributeValues: { ':threshold': threshold }
  };
  return documentClient.scan(params).promise();
};

export const updateLastUpdatedFeed = (url: string, lastUpdated: number) => {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Feeds',
    Key: { Url: url },
    UpdateExpression: 'set LastUpdated = :currentLastUpdated',
    ExpressionAttributeValues: {
      ':currentLastUpdated': lastUpdated
    }
  };
  return documentClient.update(params).promise();
};
