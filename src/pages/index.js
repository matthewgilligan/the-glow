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
        }
      }
    }
  }
`

const IndexPage = (props) => {
  return (
    <Layout>
      <div className={indexStyles.featureInterview}>
        <h1>{props.data.firstInterview.edges[0].node.title}</h1>
      </div>
      <div className={indexStyles.reviews}>
        <div className={indexStyles.reviewsTitle}>
          <hr></hr>
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
        <div className={indexStyles.reviewsLink}>
          <Link to="/reviews">View All Reviews</Link>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
