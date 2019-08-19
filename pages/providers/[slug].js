
import React, { Component } from "react";
import gql from "graphql-tag";
import { client } from "../../modules/apolloClient";

const providerQuery = gql`
  query($slug: String) {
    providers(where: {slug: {contains: $slug}}){
      id
      createdAt
      name
      website
      logotype {
        url
      }
      affiliateLink
      screenshots
      termsUrl
      founded
      rating
      weight
      slug
      numberOfTags
    }
  }
`;

export default class IndexPage extends Component {
  static async getInitialProps(ctx) {
    let { slug } = ctx.query

    let { data: {providers}} = await client.query({
      query: providerQuery,
      variables: {
        slug: slug
      }
    })

    return { provider: providers[0] };
  }

  render() {
    let {provider} = this.props
    let {logotype={}} = provider
    return (
      <div>
        <div>
          <h1><a href={provider.affiliateLink}>{provider.name}</a></h1>
          { logotype ?
            <img src={logotype.url}></img>
            : null
          }
        </div>
        <pre>{JSON.stringify(provider, null, 2)}</pre>
      </div>
    );
  }
}
