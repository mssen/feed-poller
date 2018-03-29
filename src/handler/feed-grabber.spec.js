const { listFeeds, updateLastUpdatedFeed } = require('../lib/dynamo');
const { sendFeed } = require('../lib/sns');

const { main } = require('./feed-grabber');

jest.mock('../lib/dynamo');
jest.mock('../lib/sns');

describe('Feed Grabber', () => {
  it('should sucessfully send feeds', () => {
    const callback = jest.fn().mockReturnValue('called');
    main(undefined, undefined, callback);

    expect(listFeeds).toHaveBeenCalled();
    // TODO get this promise stuff working
  });

  it('should handle a failed sendFeed');

  it('should handle a failed update LastUpdated');
});
