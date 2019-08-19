import React, { Component } from "react";
import gql from "graphql-tag";
import { client } from "../../modules/apolloClient";

const postQuery = gql`
  query($slug: String) {
    posts(where: { slug: { contains: $slug } }) {
      id
      createdAt
      updatedAt
      published
      publishedAt
      author {
        name
        email
        id
      }
      title
      slug
      content
      language
      featuredImage {
        url
      }
      mainTaxonomy {
        name
      }
    }
  }
`;

export default class IndexPage extends Component {
  static async getInitialProps(ctx) {
    let { slug } = ctx.query;

    let {
      data: { posts }
    } = await client.query({
      query: postQuery,
      variables: {
        slug: slug
      }
    });

    return { post: posts[0] };
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.post, null, 2)}</pre>
      </div>
    );
  }
}
