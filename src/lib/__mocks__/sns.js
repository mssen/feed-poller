const { badSnsUrl, error } = require('./resources');

module.exports.sendFeed = jest
  .fn()
  .mockImplementation(
    (url) => (url === badSnsUrl ? Promise.reject(error) : Promise.resolve())
  );
