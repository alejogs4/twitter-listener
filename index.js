require('dotenv').config();

const { of } = require('rxjs');
const {
  catchError, map, delay,
} = require('rxjs/operators');

const tweets = require('./observable');
const { setRules } = require('./rules');

(async () => {
  await setRules();

  tweets.pipe(
    delay(1000),
    map((tweet) => tweet.data.text),
    catchError((error) => of({ error })),
  ).subscribe((tweetText) => console.log(tweetText));
})();
