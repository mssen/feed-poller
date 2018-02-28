import subHours from 'date-fns/sub_hours';
import format from 'date-fns/format';

import { listFeeds } from './lib/dynamo';
import { sendFeed } from './lib/sns';

export async function main(event, context, callback) {
  try {
    const feeds = await listFeeds(format(subHours(Date.now(), 12), 'x'));
    feeds.Items.forEach(
      async (feed) => await sendFeed(feed.Url, feed.LastUpdatedAt)
    );
    callback(null, `Sent ${feeds.Count} feeds.`);
  } catch (error) {
    callback(error);
  }
}
