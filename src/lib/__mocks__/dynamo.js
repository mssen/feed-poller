const { badDynamoUrl, badSnsUrl, error } = require('./resources');

module.exports.listFeeds = jest.fn();

module.exports.updateLastUpdatedFeed = jest
  .fn()
  .mockImplementation(
    (url) => (url === badDynamoUrl ? Promise.reject(error) : Promise.resolve())
  );
