import React, { Component } from "react";
import gql from "graphql-tag";
import { client } from "../../modules/apolloClient";

const currencyQuery = gql`
  query($slug: String) {
    taxonomyItems(
      where: {
        slug: { contains: $slug }
        parent: { slug: { contains: "currencies" } }
      }
    ) {
      id
      createdAt
      name
      createdBy {
        id
        name
        email
      }
      parent {
        id
        createdAt
        name
        createdBy {
          id
          name
          email
        }
        noListing
        disableTierTwo
        tierTwoBase
        tierTwoFilter
        countryCode
        weight
        slug
      }
      noListing
      disableTierTwo
      tierTwoBase
      tierTwoFilter
      countryCode
      weight
      slug
    }
  }
`;

export default class IndexPage extends Component {
  static async getInitialProps(ctx) {
    let { slug } = ctx.query;

    let {
      data: { taxonomyItems }
    } = await client.query({
      query: currencyQuery,
      variables: {
        slug: slug
      }
    });

    return { currency: taxonomyItems[0] };
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.currency, null, 2)}</pre>
      </div>
    );
  }
}
