const AWS = require('aws-sdk/global');
const {
  mockScan,
  __update,
  __put,
  __promise
} = require('aws-sdk/clients/dynamodb');

const { listFeeds, updateLastUpdatedFeed, putWork } = require('./dynamo');

describe('DynamoDB library', () => {
  it('should set the region', () => {
    expect(AWS.config.update).toHaveBeenLastCalledWith({ region: 'us-east-2' });
  });
  it('should list feeds', () => {
    const threshold = 123;
    const result = listFeeds(threshold);

    expect(mockScan).toHaveBeenCalledWith({
      TableName: 'Feeds',
      FilterExpression: 'LastUpdated < :threshold',
      ExpressionAttributeValues: { ':threshold': threshold }
    });
    expect(__promise).toHaveBeenCalled();
    expect(result.promise).toBe(__promise);
  });

  it('should update LastUpdated for a feed', () => {
    const url = 'validurl';
    const lastUpdated = 456;
    const result = updateLastUpdatedFeed(url, lastUpdated);

    expect(__update).toHaveBeenCalledWith({
      TableName: 'Feeds',
      Key: { Url: url },
      UpdateExpression: 'set LastUpdated = :currentLastUpdated',
      ExpressionAttributeValues: {
        ':currentLastUpdated': lastUpdated
      }
    });
    expect(__promise).toHaveBeenCalled();
    expect(result.promise).toBe(__promise);
  });

  it('should put a given work', () => {
    const work = { some: 'thing' };
    const result = putWork(work);

    expect(__put).toHaveBeenCalledWith({
      TableName: 'Works',
      Item: work
    });
    expect(__promise).toHaveBeenCalled();
    expect(result.promise).toBe(__promise);
  });
});
