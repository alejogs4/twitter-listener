const needle = require('needle');

const token = process.env.TOKEN;
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';

const rules = [
  { value: 'dog has:images -is:retweet', tag: 'dog pictures' },
  { value: 'cat has:images -grumpy', tag: 'cat pictures' },
];

async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle('post', rulesURL, data, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body);
  }

  return response.body;
}

module.exports = {
  setRules,
};
