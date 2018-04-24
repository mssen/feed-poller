const { listFeeds, updateLastUpdatedFeed } = require('../lib/dynamo');
const { sendFeed } = require('../lib/sns');
const {
  successUrl,
  badDynamoUrl,
  badSnsUrl,
  error
} = require('../lib/__mocks__/resources');

const { main } = require('../handler/feed-grabber');

jest.mock('../lib/dynamo');
jest.mock('../lib/sns');

describe('Feed Grabber', () => {
  const callback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send feeds', async () => {
    listFeeds.mockResolvedValue({
      Items: [{ Url: successUrl, LastUpdated: 123 }],
      Count: 1
    });

    await main(undefined, undefined, callback);

    expect(listFeeds).toHaveBeenCalled();
    expect(sendFeed).toHaveBeenCalledTimes(1);
    expect(updateLastUpdatedFeed).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 'Successfully sent 1 feed(s).');
  });

  it('should handle a failed sendFeed', async () => {
    listFeeds.mockResolvedValue({
      Items: [{ Url: badSnsUrl, LastUpdated: 123 }],
      Count: 1
    });

    await main(undefined, undefined, callback);

    expect(listFeeds).toHaveBeenCalled();
    expect(sendFeed).toHaveBeenCalledTimes(1);
    expect(updateLastUpdatedFeed).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(error);
  });

  it('should handle a failed lastUpdated', async () => {
    listFeeds.mockResolvedValue({
      Items: [{ Url: badDynamoUrl, LastUpdated: 123 }],
      Count: 1
    });

    await main(undefined, undefined, callback);

    expect(listFeeds).toHaveBeenCalled();
    expect(sendFeed).toHaveBeenCalledTimes(1);
    expect(updateLastUpdatedFeed).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(error);
  });
});
