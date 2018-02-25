import subHours from 'date-fns/sub_hours';

import { listFeeds } from './lib/dynamo';
import { sendFeed } from './lib/sns';

export async function main(event, context, callback) {
  try {
    const feeds = await listFeeds(subHours(Date.now(), 12));
    feeds.Items.map(async (feed) => await sendFeed(feed.Url));
  } catch (error) {
    callback(error);
  }
}
