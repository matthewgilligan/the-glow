import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Head from "../components/head/head"
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
    allContentfulNews ( sort: { fields:publishedDate, order:DESC } ) {
      edges {
        node {
          title
          slug
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
    <Layout>
      <div className={indexStyles.featureInterview}>
        <img src={props.data.firstInterview.edges[0].node.coverImage.file.url} alt={props.data.firstInterview.edges[0].node.coverImage.title} className={indexStyles.featureInterviewImage}/>
        <h1>Ichiko Aoba</h1>
      </div>
      <div className={indexStyles.reviews}>
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
      <div className={indexStyles.supportAndLatestNews}>
        <div className={indexStyles.support}>
          Patreon
        </div>
        <div className={indexStyles.latestNews}>
          <div className={indexStyles.sectionTitle}>
            <h2>Latest News</h2>
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/news">View All News</Link>
          </div>
        </div>
      </div>
      <div className={indexStyles.playlists}>
      </div>
      <div className={indexStyles.features}>
        <div className={indexStyles.sectionTitle}>
          <h2>Features</h2>
        </div>
        <div className={indexStyles.sectionLink}>
          <Link to="/features">View All Features</Link>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
