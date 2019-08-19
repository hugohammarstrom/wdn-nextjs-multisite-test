import React, { Component } from "react";
import gql from "graphql-tag";
import { client } from "../modules/apolloClient";
import Link from 'next/link'

const siteQuery = gql`
  query($siteUrl: String) {
    sites(where: { name: { equals: $siteUrl } }) {
      id
      language
      languageLabel
      name
      niche
      url
      logotype {
        url
      }
      providers(first: 10) {
        id
        name
        rating
        slug
      }
    }
  }
`;

export default class IndexPage extends Component {
  static async getInitialProps(ctx) {
    let { data: {sites} } = await client.query({
      query: siteQuery,
      variables: {
        siteUrl: ctx.req.headers["wdn-site-url"]
      }
    });

    return { site: sites[0] };
  }

  render() {
    let {site} = this.props
    let {providers} = site
    return (
      <div>
        <div>
          <h1><a href={site.url}>{site.name}</a></h1>
          { site.logotype ?
            <img src={site.logotype.url}></img>
            : null
          }
        </div>
        <h3>Providers</h3>
        {providers.map(provider => {
          return (
            <Link key={provider.id} href={`/providers/${provider.slug}`} prefetch>
              <a>
                {provider.name}
                <br></br>
              </a>
            </Link>
          )
        })}
        <pre>{JSON.stringify(site, null, 2)}</pre>
      </div>
    );
  }
}
