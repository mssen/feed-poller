const { mockPublish, mockPromise } = require('aws-sdk/clients/sns');

const { sendFeed } = require('./sns');

describe('SNS library', () => {
  it('should send a feed', () => {
    const feed = 'avalidfeed';
    const lastUpdated = 123;
    process.env.SNS_TOPIC_ARN = 'topicarn';
    const result = sendFeed(feed, lastUpdated);

    expect(mockPublish).toHaveBeenCalledWith({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: `{"feed":"${feed}","lastUpdated":${lastUpdated}}`
    });
    expect(mockPromise).toHaveBeenCalled();
    expect(result.promise).toBe(mockPromise);
  });
});
