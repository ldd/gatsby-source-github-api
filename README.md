[![Build Status](https://travis-ci.com/ldd/gatsby-source-github-api.svg?branch=master)](https://travis-ci.com/ldd/gatsby-source-github-api)
[![Coverage Status](https://coveralls.io/repos/github/ldd/gatsby-source-github-api/badge.svg?branch=master)](https://coveralls.io/github/ldd/gatsby-source-github-api?branch=master)

# gatsby-source-github-api

Source plugin for pulling data into Gatsby from the official GitHub v4 [GraphQL API](https://developer.github.com/v4/).

## Install

`npm i gatsby-source-github-api`

## How to use

Follow GitHub's guide [how to generate a token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

Once you are done, either create a `gatsby-config.js` file or open the one you already have.

In there, you want to add this plugin and at least add the token in the options object:

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github-api`,
    options: {
      // url: API URL to use. Defaults to  https://api.github.com/graphql
      url: someUrl,

      // token: required by the GitHub API
      token: someString,

      // GraphQLquery: defaults to a search query
      graphQLQuery: anotherString,

      // variables: defaults to variables needed for a search query
      variables: someObject
    }
  }
];
```

## Examples

**Search query:**

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github-api`,
    options: {
      token: "hunter2",
      variables: {
        q: "author:ldd state:closed type:pr sort:comments",
        nFirst: 2
      }
    }
  }
];
```

resulting API call:

```graphql
  query ($nFirst: Int, $q: String) {
    search(query: "${q}", type: ISSUE, first: ${nFirst}){
      edges{
        node{
          ... on PullRequest{
            title
          }
        }
      }
    }
  }
```

**Custom GraphQL query:**

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github-api`,
    options: {
      token: "hunter2",
      variables: {},
      graphQLQuery: `
        query {
          repository(owner:"torvalds",name:"linux"){
            description
          }
        }
        `
    }
  }
];
```

resulting API call:

```graphql
query {
  repository(owner: "torvalds", name: "linux") {
    description
  }
}
```

For more examples see [gatsby-starter-github-portfolio](https://github.com/ldd/gatsby-starter-github-portfolio).

## Tips and Tricks

You'll probably want to use valid GraphQL queries. To help you, GitHub has a [Query Explorer](https://developer.github.com/v4/explorer/) with auto-completion.

![Query Explorer](https://user-images.githubusercontent.com/1187476/30273078-69695a10-96c5-11e7-90b8-7dc876cc214a.png)

## Changelog

- `v0.2.1` update dependencies
- `v0.2.0` provide raw github response
- `v0.1.5` document url option (for GitHub Enterprise users)
- `v0.1.4`
  - Add tests
  - expose DEFAULT_QUERY by exporting it
- `v0.1.3`
  - Change mediaType of exported node to be ignored by `gatsby-transformer-json`
  - prettify changelog of this file
- `v0.1.2` Updated `yarn.lock` to address github security warnings
- `v0.1.1` Updated Readme for easier usage
- `v0.1.0` Submit to Gatsby's Plugin Library
- `v0.0.4` Update dev dependencies, add linting script to package.json
- `v0.0.3` Initial public release
