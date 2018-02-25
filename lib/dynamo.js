import AWS from 'aws-sdk/global';
import DynamoDB from 'aws-sdk/clients/dynamodb';

AWS.config.update({ region: 'us-east-2' });

export function putWork(work) {
  const documentClient = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'Works',
    Item: work
  };
  return documentClient.put(params).promise();
}
