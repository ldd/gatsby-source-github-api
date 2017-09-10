const { fetchFromGithub } = require("./src/helper");
const crypto = require("crypto");
const uuid = require("uuid/v1");

exports.sourceNodes = (
  { boundActionCreators },
  { token, variables, graphQLQuery, url }
) => {
  const { createNode } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // we need a token to use this plugin
    if (token === undefined) {
      reject("token is undefined");
      return;
    }
    fetchFromGithub(url, token, graphQLQuery, variables).then(result => {
      createNode({
        data: result.data,
        id: result.id || uuid(),
        parent: null,
        children: [],
        internal: {
          type: "GithubData",
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(result))
            .digest(`hex`),
          mediaType: "application/json"
        }
      });
      resolve();
    });
  });
};
