const needle = require('needle');
const { Observable } = require('rxjs');

const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
const headers = { Authorization: `Bearer ${process.env.TOKEN}` };

const tweets = new Observable((observable) => {
  const tweetsStream = needle.get(streamURL, { headers }, { timeout: 20000 });

  tweetsStream.on('data', (tweet) => {
    try {
      const parsedTweet = JSON.parse(tweet);

      observable.next(parsedTweet);
    } catch (error) {
      // Nothing
    }
  });

  tweetsStream.on('error', observable.error);
});

module.exports = tweets;
