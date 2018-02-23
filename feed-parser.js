import axios from 'axios';
import FeedParser from 'feedparser';

const feedparser = new FeedParser();

function poller(url) {
  return axios({
    method: 'get',
    url,
    responseType: 'stream'
  });
}

function parseResposne(response) {
  response.data.pipe(feedparser);
  return new Promise((resolve, reject) => {
    feedparser.on('error', (error) => reject(error));

    feedparser.on('readable', () => {
      const items = [];
      let item;

      while ((item = feedparser.read())) {
        items.push(item);
      }

      return resolve(items);
    });
  });
}

export async function main(event, context, callback) {
  try {
    const response = await poller(
      'https://archiveofourown.org/tags/12064265/feed.atom'
    );
    const items = await parseResposne(response);
    callback(null, `Length: ${items.length}`);
  } catch (error) {
    callback(null, error);
  }
}
