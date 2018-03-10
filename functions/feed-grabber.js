import subHours from 'date-fns/sub_hours';

import { formatDate } from '../lib/util';
import { listFeeds } from '../lib/dynamo';
import { sendFeed } from '../lib/sns';

export async function main(event, context, callback) {
  try {
    const feeds = await listFeeds(formatDate(subHours(Date.now(), 12)));
    feeds.Items.forEach(
      async (feed) => await sendFeed(feed.Url, feed.LastUpdatedAt)
    );
    callback(null, `Sent ${feeds.Count} feeds.`);
  } catch (error) {
    callback(error);
  }
}
