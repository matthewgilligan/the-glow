import React from "react"
import { Link, graphql } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"

import patreon from "../images/patreon_ad.png"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import '../styles/index.scss'
import indexStyles from "./index.module.scss"
import reviewsStyles from "./reviews.module.scss"
import newsStyles from "./news.module.scss"
import featuresStyles from "./features.module.scss"
import guidesStyles from "./guides.module.scss"

export const query = graphql`
  query {
    allContentfulReview ( sort: { fields:publishedDate, order:DESC }, limit: 12 ) {
      edges {
        node {
          albumTitle
          slug
          artist {
            englishName
          }
          albumCover {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          publishedDate (formatString:"MMMM Do YYYY")
        }
      }
    }
    allContentfulNews ( sort: { fields:publishedDate, order:DESC }, limit: 5 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          publishedDate (formatString:"MMMM Do YYYY")
          coverImage {
            title
            file {
              url
            }
          }
        }
      }
    }
    allContentfulFeature ( sort: { fields: publishedDate, order:DESC }, filter: { subcategory:{ name: { ne: "The Playlist" } } } limit: 6 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          category {
            name
          }
          publishedDate (formatString:"MMMM Do YYYY")
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          artist {
            englishName
          }
          author {
            englishName
            slug
          }
        }
      }
    }
    allContentfulGuide ( sort: { fields:publishedDate, order:DESC }, limit: 3 ) {
      edges {
        node {
          title
          subject
          slug
          publishedDate(formatString:"MMMM Do YYYY")
          coverImage {
            file {
              url
            }
            title
          }
          author {
            englishName
          }
        }
      }
    }
    firstInterview : allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Interviews" } } }, limit: 1 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          category {
            name
          }
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          artist {
            englishName
            japaneseName
          }
          author {
            englishName
            slug
          }
          publishedDate(formatString:"MMMM Do YYYY")
        }
      }
    }
    thePlaylist: allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { subcategory:{ name: { eq: "The Playlist" } } }, limit: 4 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          artist {
            englishName
            japaneseName
          }
          slug
          category {
            name
          }
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          publishedDate (formatString:"MMMM Do YYYY")
        }
      }
    }
  }
`

const IndexPage = (props) => {
  const topFeatureTitleShort = <h1 className={indexStyles.topFeatureTitleShort}>{props.data.firstInterview.edges[0].node.artist[0].englishName}</h1>
  const topFeatureTitleLong = <h1 className={indexStyles.topFeatureTitleLong}>{props.data.firstInterview.edges[0].node.artist[0].englishName}</h1>

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      },
      [INLINES.HYPERLINK]: (node) => {
        if(node.data.uri.indexOf('youtube.com/embed') !== -1){
          return(
            <iframe width="100%" height="321" title="YouTube" src={node.data.uri} frameborder="0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          )
        } else {
          return <a href={node.data.uri} target={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '' : 'noopener noreferrer'}`}>{node.content[0].value}</a>;
        }
      }
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
  }

  return (
    <div className={indexStyles.indexContainter}>
      <Helmet>
        <title>The Glow | Japanese music in the spotlight</title>
        <meta name="description" content="Japanese music in the spotlight." />
        <meta name="keywords" content="music, japan, indie, japanese, reviews, albums" />
        <meta name="og:title" content="The Glow | Japanese music in the spotlight" />
        <meta name="og:type" content="website" />
        <meta name="og:description" content="Japanese music in the spotlight." />
        <meta name="og:image" content="../images/red_logo_text_medium.png" />
        <meta name="og:locale" content="en_US" />
        <meta name="og: url" content="https://xenodochial-dubinsky-db8110.netlify.app" />
        <link rel="canonical" href="https://xenodochial-dubinsky-db8110.netlify.app" />
      </Helmet>

      <div className={indexStyles.headerContainer}>
        <Header />
      </div>


      <section className={indexStyles.topFeature}>
        <div className={indexStyles.container}>
          <div className={indexStyles.topFeatureContent}>
            <h1 className={indexStyles.topFeatureResponsiveTitle}>Hakushi Hasegawa</h1>
            <Link to={`features/${props.data.firstInterview.edges[0].node.slug}`} className={indexStyles.topFeatureImageLink}>
              <Img
                fluid={props.data.firstInterview.edges[0].node.coverImage.fluid}
                key={props.data.firstInterview.edges[0].node.coverImage.fluid.src}
                alt={props.data.firstInterview.edges[0].node.coverImage.title}
                className={indexStyles.topFeatureImage}>
              </Img>
            </Link>
            <Link to={`features/${props.data.firstInterview.edges[0].node.slug}`} className={indexStyles.topFeatureTitleLink}>
              {props.data.firstInterview.edges[0].node.artist[0].englishName.length > 11 ? topFeatureTitleLong : topFeatureTitleShort}
            </Link>
            <div className={indexStyles.topFeatureText}>
              <div className={indexStyles.topFeatureDetails}>
                <p className={indexStyles.topFeatureSubtitle}>{documentToReactComponents(props.data.firstInterview.edges[0].node.subtitle.json, options)}</p>
                <div class={indexStyles.topFeatureInfo}>
                  <div class={indexStyles.topFeatureMeta}>
                    <p class={indexStyles.topFeatureAuthor}>By: <Link to={`/author/${props.data.firstInterview.edges[0].node.author.slug}`}>{props.data.firstInterview.edges[0].node.author.englishName}</Link></p>
                    <p class={indexStyles.topFeatureDate}>{props.data.firstInterview.edges[0].node.publishedDate}</p>
                  </div>
                  <Link to={`features/${props.data.firstInterview.edges[0].node.category.name.toLowerCase()}`}  className={indexStyles.topFeatureCategory}>
                    <p>{props.data.firstInterview.edges[0].node.category.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={indexStyles.responsiveTopFeature}>
            <div class={indexStyles.responsiveTopFeature}>
              <Link to={`features/${props.data.firstInterview.edges[0].node.slug}`}>
                <div class={indexStyles.responsiveTopFeatureImg}
                  style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${props.data.firstInterview.edges[0].node.coverImage.file.url})`} }>
                  <div class={indexStyles.responsiveTopFeatureDetails}>
                    <h2 class={indexStyles.responsiveTopFeatureTitle}>{props.data.firstInterview.edges[0].node.title}</h2>
                    <p className={indexStyles.responsiveTopFeatureSubtitle}>{documentToReactComponents(props.data.firstInterview.edges[0].node.subtitle.json, options)}</p>
                    <p class={indexStyles.responsiveTopFeatureAuthor}>By: {props.data.firstInterview.edges[0].node.author.englishName}</p>
                    <p class={indexStyles.responsiveTopFeatureDate}>{props.data.firstInterview.edges[0].node.publishedDate}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.reviews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Reviews</h2>
          </div>
          <div className={indexStyles.albums}>
            {props.data.allContentfulReview.edges.map((edge) => {
              return (
                <div className={reviewsStyles.album}>
                  <Link to={`reviews/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.albumCover.fluid}
                      key={edge.node.albumCover.fluid.src}
                      alt={edge.node.albumCover.title}
                      className={reviewsStyles.albumCover}>
                    </Img>
                    <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                    <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                    <p class={reviewsStyles.publishedDate}>{edge.node.publishedDate}</p>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.lessAlbums}>
            {props.data.allContentfulReview.edges.slice(0,6).map((edge) => {
              return (
                <div className={reviewsStyles.album}>
                  <Link to={`reviews/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.albumCover.fluid}
                      key={edge.node.albumCover.fluid.src}
                      alt={edge.node.albumCover.title}
                      className={reviewsStyles.albumCover}>
                    </Img>
                    <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                    <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/reviews">View All Reviews</Link>
          </div>
        </div>
      </section>

      <section className={indexStyles.patreonAndLatestNews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.patreonAndLatestNewsContent}>

              <img src={patreon} alt="Support us on Patreon!" className={indexStyles.patreon} />


            <div className={indexStyles.latestNews}>
              <div className={indexStyles.sectionTitle}>
                <h2>Latest News</h2>
              </div>
              <div className={indexStyles.newsList}>
                {props.data.allContentfulNews.edges.map((edge) => {
                  return (
                    <Link to={`news/${edge.node.slug}`}>
                      <div className={indexStyles.newsItem}>
                        <img src={edge.node.coverImage.file.url} alt={edge.node.coverImage.title} className={indexStyles.albumCover} />
                        <div className={indexStyles.newsDetails}>
                          <h2>{edge.node.title}</h2>
                          <p>{edge.node.publishedDate}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className={indexStyles.sectionLink}>
                <Link to="/news">View All News</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.featuresSection}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Features</h2>
          </div>
          <div className={indexStyles.features}>
            {props.data.allContentfulFeature.edges.map((edge) => {
              return (
                <div className={indexStyles.feature}>
                  <Link to={`features/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.coverImage.fluid}
                      key={edge.node.coverImage.fluid.src}
                      alt={edge.node.coverImage.title}
                      className={indexStyles.featureImage}>
                    </Img>
                  </Link>
                  <div class={indexStyles.featureDetails}>
                    <Link to={`features/${edge.node.slug}`}>
                      <h3 class={indexStyles.featureTitle}>{edge.node.title}</h3>
                    </Link>
                    <div class={newsStyles.remainingInfo}>
                      <div class={newsStyles.remainingMeta}>
                        <p class={newsStyles.remainingAuthor}>By: <Link to={`/author/${edge.node.author.slug}`}>{edge.node.author.englishName}</Link></p>
                        <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                      </div>
                      <Link to={`features/${edge.node.category.name.toLowerCase()}`} className={newsStyles.remainingCategory}>
                        <p>{edge.node.category.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.lessFeatures}>
            {props.data.allContentfulFeature.edges.slice(0, 4).map((edge) => {
              return (
                <div className={indexStyles.feature}>
                  <Link to={`features/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.coverImage.fluid}
                      key={edge.node.coverImage.fluid.src}
                      alt={edge.node.coverImage.title}
                      className={indexStyles.featureImage}>
                    </Img>
                  </Link>
                  <div class={indexStyles.featureDetails}>
                    <Link to={`features/${edge.node.slug}`}>
                      <h3 class={indexStyles.featureTitle}>{edge.node.title}</h3>
                    </Link>
                    <div class={newsStyles.remainingInfo}>
                      <div class={newsStyles.remainingMeta}>
                        <p class={newsStyles.remainingAuthor}>By: <Link to={`/author/${edge.node.author.slug}`}>{edge.node.author.englishName}</Link></p>
                        <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                      </div>
                      <Link to={`features/${edge.node.category.name.toLowerCase()}`} className={newsStyles.remainingCategory}>
                        <p>{edge.node.category.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/features">View All Features</Link>
          </div>
        </div>
      </section>

      <section className={indexStyles.thePlaylistSection}>
        <div className={indexStyles.playlistContainer}>
          <div className={indexStyles.thePlaylistTitle}>
            <h2>The Playlist</h2>
            <p>swipe →</p>
          </div>
          <div className={indexStyles.playlistsScroll}>
            <div className={indexStyles.playlists}>
              {props.data.thePlaylist.edges.map((edge) => {
                return (
                  <div className={indexStyles.playlist}>
                    <Link to={`features/${edge.node.slug}`}>
                      <Img
                        fluid={edge.node.coverImage.fluid}
                        key={edge.node.coverImage.fluid.src}
                        alt={edge.node.coverImage.title}
                        className={indexStyles.playlistImage}>
                      </Img>
                    </Link>
                    <div className={indexStyles.playlistDetails}>
                      <Link to={`features/${edge.node.slug}`}>
                        <h2 className={indexStyles.playlistArtist}>{edge.node.artist[0].englishName}</h2>
                      </Link>
                      <p className={indexStyles.playlistSubtitle}>{documentToReactComponents(edge.node.subtitle.json, options)}</p>
                      <p className={indexStyles.playlistDate}>{edge.node.publishedDate}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.guidesSection}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Guides</h2>
          </div>
          <div className={guidesStyles.guides}>
            {props.data.allContentfulGuide.edges.map((edge) => {
              return (
                <div className={guidesStyles.guide}>
              <Link to={`guides/${edge.node.slug}`}>
                <div className={guidesStyles.image} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0)), url(${edge.node.coverImage.file.url})`}}>
                  <div className={guidesStyles.title}>
                    <h1>{edge.node.subject}</h1>
                  </div>
                </div>
              </Link>
            </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/guides">View All Guides</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default IndexPage
