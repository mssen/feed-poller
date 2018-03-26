const AWS = require('aws-sdk/global');
const DynamoDB = require('aws-sdk/clients/dynamodb');

AWS.config.update({ region: 'us-east-2' });

module.exports.listFeeds = (threshold) => {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Feeds',
    FilterExpression: 'LastUpdated < :threshold',
    ExpressionAttributeValues: { ':threshold': threshold }
  };
  return documentClient.scan(params).promise();
};

module.exports.updateLastUpdatedFeed = (url, lastUpdated) => {
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
};

module.exports.putWork = (work) => {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Works',
    Item: work
  };
  return documentClient.put(params).promise();
};
