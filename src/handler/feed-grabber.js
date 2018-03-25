import subHours from 'date-fns/sub_hours';
import flatten from 'lodash/fp/flatten';

import { formatDate } from '../lib/util';
import { listFeeds, updateLastUpdatedFeed } from '../lib/dynamo';
import { sendFeed } from '../lib/sns';

export async function main(event, context, callback) {
  try {
    const now = Date.now();
    const feeds = await listFeeds(formatDate(subHours(now, 12)));
    await updateFeeds(feeds.Items, now);
    callback(null, `Sent ${feeds.Count} feeds.`);
  } catch (error) {
    callback(error);
  }
}

function updateFeeds(feeds, now) {
  return Promise.all(
    flatten(
      feeds.map((feed) => [
        sendFeed(feed.Url, feed.LastUpdated),
        updateLastUpdatedFeed(feed.Url, now)
      ])
    )
  );
}
