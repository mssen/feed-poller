import subHours from 'date-fns/sub_hours';

import { listFeeds } from './lib/dynamo';
import { sendFeed } from './lib/sns';

export async function main(event, context, callback) {
  try {
    // const feeds = await listFeeds(subHours(Date.now(), 12));
    const feeds = {
      Items: [{ Url: 'feed1', LastUpdatedAt: Date.now() }]
    };
    feeds.Items.forEach(
      async (feed) => await sendFeed(feed.Url, feed.LastUpdatedAt)
    );
  } catch (error) {
    callback(error);
  }
}
