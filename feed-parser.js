import axios from 'axios';
import FeedParser from 'feedparser';
import cheerio from 'cheerio';
import isAfter from 'date-fns/is_after';

import { formatDate } from './lib/util';
import { putWork } from './lib/dynamo';

function poller(url) {
  return axios({
    url,
    method: 'get',
    responseType: 'stream'
  });
}

async function parseItem(item, lastUpdatedAt) {
  const updatedTime = formatDate(item['atom:updated']['#']);
  if (isAfter(updatedTime, lastUpdatedAt)) {
    const work = {};

    work.Url = item.link;
    work.Title = item.title;

    const author = cheerio.load(item.author)('a');
    work.Author = {
      Name: author.text(),
      Url: author.attr('href')
    };

    const summary = cheerio.load(item.summary);

    // Might need to do this a different way, since this removes the href info for a series
    const pTags = summary('p')
      .slice(1) // drops author paragraph
      .map((index, element) => cheerio(element).text())
      .get();

    // TODO: Parse more
    if (pTags[pTags.length - 1].startsWith('Words')) {
      work.WordsLine = pTags.pop();
    } else {
      work.SeriesLine = pTags.pop();
      work.WordsLine = pTags.pop();
    }

    work.Summary = pTags;

    // TODO: Decide if I care about links
    work.Metadata = summary('li')
      .map((index, element) => cheerio(element).text())
      .get();

    work.Published = formatDate(item['atom:published']['#']);
    work.Updated = updatedTime;

    await putWork(work);
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
  event.Records.forEach((rec) => console.log(rec.Sns));
  // // Extract url and update date from event
  // const feedUrl = 'https://archiveofourown.org/tags/12064265/feed.atom';
  // const lastUpdatedAt = 0;
  // try {
  //   const response = await poller(feedUrl);
  //   parseFeed(response.data, lastUpdatedAt);
  //   // trying this without a callback for success
  // } catch (error) {
  //   callback(error);
  // }
}
