# gatsby-source-github

Source plugin for pulling data into Gatsby from the official Github v4 [graphQL API](https://developer.github.com/v4/).

## Install

`npm install --save gatsby-source-github`

## How to use
Follow Github's guide to [generate a token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

Once you are done, either create a `gatsby-config.js` file or open the one you already have.

In there, you want to add this plugin and at least add the token in the options object:
```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github`,
    options: {
      // token required by the Github API
      token: someString = undefined, //required
      // graphQL query
      // defaults to a search query. See below
      graphQLQuery: anotherString,
      // graphQL variables
      // defaults to variables needed for a
      // search query. See below
      variables: someObject
    }
  }
]
```

### Examples (How to use)

Simple search query
```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github`,
    options: {
      token: 'hunter2',
      variables: {
        q: "author:ldd state:closed type:pr sort:comments",
        nFirst: 2
      }
    }
  }
]
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
generic graphQL query 
```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github`,
    options: {
      token: 'hunter2',
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
]
```
resulting API call:
```graphql
  query {
    repository(owner:"torvalds", name:"linux"){
      description
    }
  }
```

## Tips and Tricks

You'll probably want to use valid graphQL queries. To help you, Github has a [Query Explorer](https://developer.github.com/v4/explorer/) with auto-completion.

![Query Explorer](https://user-images.githubusercontent.com/1187476/30273078-69695a10-96c5-11e7-90b8-7dc876cc214a.png)

### Changelog

v0.0.3    Initial public release
