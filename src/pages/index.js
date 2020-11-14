import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import '../styles/index.scss'
import indexStyles from "./index.module.scss"
import reviewsStyles from "./reviews.module.scss"
import newsStyles from "./news.module.scss"

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
          }
        }
      }
    }
    allContentfulNews ( sort: { fields:publishedDate, order:DESC }, limit: 5 ) {
      edges {
        node {
          title
          subtitle
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
          subtitle
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
          }
          artist {
            englishName
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
          subtitle
          slug
          category {
            name
          }
          coverImage {
            title
            file {
              url
            }
          }
          artist {
            englishName
            japaneseName
          }
          author {
            englishName
          }
          publishedDate(formatString:"MMMM Do YYYY")
        }
      }
    }
    thePlaylist: allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { subcategory:{ name: { eq: "The Playlist" } } }, limit: 4 ) {
      edges {
        node {
          title
          subtitle
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
          }
          publishedDate (formatString:"MMMM Do YYYY")
        }
      }
    }
  }
`

const IndexPage = (props) => {
  return (
    <div>
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

      <div className={indexStyles.container}>
        <Header />
      </div>


      <section className={indexStyles.topFeature}>
        <div className={indexStyles.container}>
          <div className={indexStyles.topFeatureContent}>
            <img src={props.data.firstInterview.edges[0].node.coverImage.file.url} alt={props.data.firstInterview.edges[0].node.coverImage.title} className={indexStyles.topFeatureImage}/>
            <div className={indexStyles.topFeatureText}>
              <h1 className={indexStyles.topFeatureTitle}>{props.data.firstInterview.edges[0].node.artist[0].englishName}</h1>
              <div className={indexStyles.topFeatureDetails}>
                <p class={indexStyles.topFeatureSubtitle}>{props.data.firstInterview.edges[0].node.subtitle}</p>
                <div class={indexStyles.topFeatureInfo}>
                  <div class={indexStyles.topFeatureMeta}>
                    <p class={indexStyles.topFeatureAuthor}>By: {props.data.firstInterview.edges[0].node.author.englishName}</p>
                    <p class={indexStyles.topFeatureDate}>{props.data.firstInterview.edges[0].node.publishedDate}</p>
                  </div>
                  <Link to={props.data.firstInterview.edges[0].node.category.slug}  className={indexStyles.topFeatureCategory}>
                    <p>{props.data.firstInterview.edges[0].node.category.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.reviews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Album Reviews</h2>
          </div>
          <div className={reviewsStyles.albums}>
            {props.data.allContentfulReview.edges.map((edge) => {
              return (
                <div className={reviewsStyles.album}>
                  <Link to={`reviews/${edge.node.slug}`}>
                    <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
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
            <div className={indexStyles.patreon}>
              Patreon
            </div>
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
                    <div class={indexStyles.featureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                    <div class={indexStyles.featureDetails}>
                      <Link to={`${edge.node.slug}`}>
                        <h3 class={indexStyles.featureTitle}>{edge.node.title}</h3>
                      </Link>
                      <div class={newsStyles.remainingInfo}>
                        <div class={newsStyles.remainingMeta}>
                          <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                          <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                        </div>
                        <Link to={edge.node.category.slug}  className={newsStyles.remainingCategory}>
                          <p>{edge.node.category.name}</p>
                        </Link>
                      </div>
                    </div>
                  </Link>
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
        <div className={indexStyles.container}>
          <div className={indexStyles.thePlaylistTitle}>
            <p>The Playlist</p>
          </div>
          <div className={indexStyles.playlists}>
            {props.data.thePlaylist.edges.map((edge) => {
              return (
                <div className={indexStyles.playlist}>
                  <Link to={`features/${edge.node.slug}`}>
                    <img src={edge.node.coverImage.file.url} alt={edge.node.coverImage.title} className={indexStyles.playlistImage} />
                    <div className={indexStyles.playlistDetails}>
                      <h2 className={indexStyles.playlistArtist}>{edge.node.artist[0].englishName}</h2>
                      <p className={indexStyles.playlistSubtitle}>{edge.node.subtitle}</p>
                      <p className={indexStyles.playlistDate}>{edge.node.publishedDate}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className={indexStyles.guidesSection}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Guides</h2>
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
