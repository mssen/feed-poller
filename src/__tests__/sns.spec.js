const { __publish, __promise } = require('aws-sdk/clients/sns');

const { sendFeed } = require('../lib/sns');

describe('SNS library', () => {
  it('should send a feed', () => {
    const feed = 'avalidfeed';
    const lastUpdated = 123;
    process.env.SNS_TOPIC_ARN = 'topicarn';
    const result = sendFeed(feed, lastUpdated);

    expect(__publish).toHaveBeenCalledWith({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: `{"feed":"${feed}","lastUpdated":${lastUpdated}}`
    });
    expect(__promise).toHaveBeenCalled();
    expect(result.promise).toBe(__promise);
  });
});
