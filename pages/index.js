import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { client } from "../modules/apolloClient";

const siteQuery = gql`
  query($siteUrl: String) {
    sites(where: { name: { equals: $siteUrl } }) {
      id
      language
      languageLabel
      name
      niche
      logotype {
        url
      }
      providers(first: 10) {
        name
        rating
      }
    }
  }
`;

export default class IndexPage extends Component {
  static async getInitialProps(ctx) {
    let { data } = await client.query({
      query: siteQuery,
      variables: {
        siteUrl: ctx.req.headers["wdn-site-url"] || "livecasinorank.se"
      }
    });

    return { site: data.sites[0] };
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.site, null, 2)}</pre>
      </div>
    );
  }
}
