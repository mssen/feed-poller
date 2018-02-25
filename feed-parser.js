import axios from 'axios';
import FeedParser from 'feedparser';
import isAfter from 'date-fns/is_after';

function poller(url) {
  return axios({
    url,
    method: 'get',
    responseType: 'stream'
  });
}

function parseItem(item, lastUpdatedAt) {
  const updatedTime = item['atom:updated']['#'];
  if (isAfter(updatedTime, lastUpdatedAt)) {
    // Then parse and put to Dynamo
  }
}

function parseFeed(responseStream, lastUpdatedAt) {
  const feedparser = new FeedParser();
  let item;
  responseStream
    .pipe(feedparser)
    .on('readable', () => {
      while ((item = feedparser.read())) {
        parseItem(item, lastUpdatedAt);
      }
    })
    .on('error', (error) => {
      throw error;
    });
}

export async function main(event, context, callback) {
  // Extract url and update date from event
  const feedUrl = 'https://archiveofourown.org/tags/12064265/feed.atom';
  const lastUpdatedAt = Date.now();
  try {
    const response = await poller(feedUrl);
    parseFeed(response.data, lastUpdatedAt);
    // trying this without a callback for success
  } catch (error) {
    callback(error);
  }
}
