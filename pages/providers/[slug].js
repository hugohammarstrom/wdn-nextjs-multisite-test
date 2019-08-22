
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
      content {
        key
        strings {
          key
          language
          value
        }
      }
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
    
    let provider = providers[0]
    if (provider && provider.content && typeof provider.content.reduce === "function"){
      provider.content = provider.content.reduce((prev, curr) => {
        let key = curr.key.split(".").last()
        prev[key] = curr.strings.reduce((_prev, _string) => {
          _prev[_string.language] = _string.value
          return _prev
        }, {})
        return prev
      }, {})
    }


    return { provider };
  }

  render() {
    let {provider={}, site} = this.props
    let {logotype={}, content} = provider
    let {language="en-us"} = site
    language = language.toLowerCase()
    
    if (!provider) return null
    
    return (
      <div>
        <div style={{maxWidth: 800, marginLeft: "auto", marginRight: "auto"}}>
          <div style={{display: "flex", alignItems: "center"}}>
            { logotype ?
              <img style={{maxHeight: 200, maxWidth: "400"}} src={logotype.url}></img>
              : null
            }
            <div style={{justifySelf: "flex-end", marginLeft: "auto"}}>
              <h2 style={{fontSize: 50, marginBottom: 16}}>{content.bonusamount[language]}</h2>
              <h3 style={{textAlign: "center"}}>{content.bonusoffer[language]}</h3>
              <div style={{marginBlock: 32}}>
                {
                  content.usps[language].split("\n").map((usp) => (
                    <React.Fragment>

                      <span><svg aria-hidden="true" data-prefix="fas" style={{width: "1em", color: "rgb(104, 198, 58)", marginRight:8}} data-icon="check" class="svg-inline--fa fa-check fa-w-16 pros__Checkmark-vsutmh-1 fJIchu" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>{usp}</span><br />
                    </React.Fragment>
                  ))
                }
              </div>
              <a href={provider.affiliateLink}><span>Play now</span></a>
            </div>
          </div>
          <h1>{content.title[language].replace("%NICHE", site.niche)}</h1>
          <p>{content.abouttext[language]}</p>
          <h2>Promotions</h2>
          <p>{content.promotionstext[language]}</p>
          <h2>Games</h2>
          <p>{content.gamestext[language]}</p>
          <h2>Software</h2>
          <p>{content.softwaretext[language]}</p>
          <h2>Deposit methods</h2>
          <p>{content.depositstext[language]}</p>
          <h2>Withdrawal methods</h2>
          <p>{content.withdrawalstext[language]}</p>
          <h2>Languages</h2>
          <p>{content.languagestext[language]}</p>
          <h2>Currencies</h2>
          <p>{content.currenciestext[language]}</p>
          <h2>Support</h2>
          <p>{content.casinotypestext[language]}</p>
          <h2>Casino types</h2>
          <p>{content.supporttext[language]}</p>
        </div>
        {/*<pre>{JSON.stringify(provider, null, 2)}</pre>*/}
        {/*<pre>{JSON.stringify(site, null, 2)}</pre>*/}
      </div>
    );
  }
}


Array.prototype.last = function() {
  return this[this.length - 1]
}