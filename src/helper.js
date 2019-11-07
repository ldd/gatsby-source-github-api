const fetcher = require("graphql-fetch");

const GITHUB_URL = "https://api.github.com/graphql";
const DEFAULT_QUERY = `
query ($nFirst: Int = 2, $q: String = "") {
  search(query: $q, type: ISSUE, first: $nFirst){
    edges{
      node{
        ... on PullRequest{
          title
        }
      }
    }
  }
}
`;
const DEFAULT_VARIABLES = { q: "", nFirst: 1 };
const fetchFromAPI = (
  url = GITHUB_URL,
  token,
  graphQLQuery = DEFAULT_QUERY,
  variables = DEFAULT_VARIABLES
) => {
  const fetch = fetcher(url);
  return fetchJSON(fetch, token, graphQLQuery, variables);
};

async function fetchJSON(fetch, token, query, variables) {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  return await fetch(query, variables, {
    headers,
    method: "POST",
    mode: "cors"
  });
}

exports.fetchFromGithub = fetchFromAPI;
exports.DEFAULT_QUERY = DEFAULT_QUERY;
