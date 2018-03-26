const subHours = require('date-fns/sub_hours');
const flatten = require('lodash/fp/flatten');

const { formatDate } = require('../lib/util');
const { listFeeds, updateLastUpdatedFeed } = require('../lib/dynamo');
const { sendFeed } = require('../lib/sns');

module.exports.main = (event, context, callback) => {
  const now = Date.now();

  listFeeds(formatDate(subHours(now, 12)))
    .then(({ Items }) => updateFeeds(Items, now))
    .then(() => callback(null, 'Successfully sent feeds.'))
    .catch(callback);
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
