import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import '../styles/index.scss'
import indexStyles from "./index.module.scss"
import reviewsStyles from "./reviews.module.scss"

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
    allContentfulFeature ( sort: { fields:publishedDate, order:DESC } ) {
      edges {
        node {
          title
          slug
          category {
            name
          }
        }
      }
    }
    firstInterview : allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Interviews" } } }, limit: 1 ) {
      edges {
        node {
          title
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

      <section className={indexStyles.featureInterview}>
        <div className={indexStyles.container}>
          <Link to={`features/${props.data.firstInterview.edges[0].node.slug}`}>
            <img src={props.data.firstInterview.edges[0].node.coverImage.file.url} alt={props.data.firstInterview.edges[0].node.coverImage.title} className={indexStyles.featureInterviewImage}/>
            <h1>{props.data.firstInterview.edges[0].node.artist[0].englishName}</h1>
          </Link>
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

      <section className={indexStyles.supportAndLatestNews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.supportNews}>
            <div className={indexStyles.support}>
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

      <section className={indexStyles.playlists}>
      </section>

      <section className={indexStyles.features}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Features</h2>
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/features">View All Features</Link>
          </div>
        </div>
      </section>

      <div className={indexStyles.container}>
        <Footer />
      </div>
    </div>
  )
}

export default IndexPage
