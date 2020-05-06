const request = require("node-fetch");

module.exports = function fetch(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options)
      .then((body) => body.json())
      .then((data) => resolve(data.data))
      .catch(reject);
  });
};
