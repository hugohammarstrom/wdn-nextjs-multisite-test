import React from 'react';
import App, { Container } from 'next/app';
import {ApolloProvider} from "react-apollo"
import {client} from "../modules/apolloClient"
import gql from "graphql-tag";

const siteQuery = gql`
  query($url: String) {
    sites(where: {url: {contains: $url}}) {
      id
      createdAt
      name
      description
      variation
      language
      hrefLang
      hrefLangParent
      languageLabel
      niche
      url
      providers {
        name
        slug
      }
    }
  }
`;


class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    let { data: {sites}} = await client.query({
      query: siteQuery,
      variables: {
        url: ctx.req.headers["wdn-site-url"]
      }
    })

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.siteUrl = ctx.req.headers["wdn-site-url"]
    pageProps.site = sites[0]

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    if (!pageProps.siteUrl) return <h1>No site specified!</h1>

    return (
      <Container>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default MyApp;