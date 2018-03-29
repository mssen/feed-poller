const successUrl = 'avalidurl';
const failureUrl = 'abadurl';

module.exports.successUrl = successUrl;
module.exports.failureUrl = failureUrl;

module.exports.listFeeds = jest
  .fn()
  .mockResolvedValue({ Items: [{ Url: successUrl, LastUpdated: 123 }] });
// .mockResolvedValueOnce({ Items: [{ Url: failureUrl, LastUpdated: 123 }] });

module.exports.updateLastUpdatedFeed = jest
  .fn()
  .mockImplementation(
    (url) =>
      url === failureUrl
        ? Promise.reject({ error: 'This failed' })
        : Promise.resolve()
  );
