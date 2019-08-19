const { ApolloClient, } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
import { createHttpLink } from 'apollo-link-http';
import fetch from "isomorphic-unfetch"


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.browse,
  link: createHttpLink({
      uri: "https://api.wdnsolutions.com",
      // uri: "http://localhost:4000",
      fetch: process.browser ? window.fetch : fetch
  })
})
