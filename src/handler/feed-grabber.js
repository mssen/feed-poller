const subHours = require('date-fns/fp/subHours');
const flatten = require('lodash/fp/flatten');

const { formatDate } = require('../lib/util');
const { listFeeds, updateLastUpdatedFeed } = require('../lib/dynamo');
const { sendFeed } = require('../lib/sns');

module.exports.main = async (event, context, callback) => {
  const now = Date.now();

  try {
    const feeds = await listFeeds(formatDate(subHours(12, now)));
    await updateFeeds(feeds.Items, now);
    callback(null, `Successfully sent ${feeds.Count} feed(s).`);
  } catch (error) {
    callback(error);
  }
};

const updateFeeds = (feeds, now) =>
  Promise.all(
    flatten(
      feeds.map((feed) => [
        sendFeed(feed.Url, feed.LastUpdated),
        updateLastUpdatedFeed(feed.Url, now)
      ])
    )
  );
