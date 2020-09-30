import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout/layout"
import artistStyles from "./artist.module.scss"
import reviewsStyles from "../../pages/reviews.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulArtist (slug: { eq: $slug }) {
      englishName
      japaneseName
    }
    allContentfulReview (
      filter: {
        artist:{
          slug: {
            eq: $slug
          }
        }
      }
    ) {
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
    allContentfulNews (
      filter: {
        artist:{
          elemMatch:{
            slug: {
              eq: $slug
            }
          }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }
    allContentfulFeature (
      filter: {
        artist:{
          elemMatch:{
            slug: {
              eq: $slug
            }
          }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }
  }
`

const Artist = (props) => {
  return (
    <Layout>
      <div className={artistStyles.artistDetails}>
        <h1>{props.data.contentfulArtist.englishName}</h1>
        <h2>{props.data.contentfulArtist.japaneseName}</h2>
      </div>
      <div className={artistStyles.reviewsSection}>
        <h2>Reviews</h2>
        <hr></hr>
        <ul>
          {props.data.allContentfulReview.edges.map((edge) => {
            return (
              <li>
                <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
                <h2>{edge.node.artist.englishName}</h2>
                <h2>{edge.node.albumTitle}</h2>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={artistStyles.featuresSection}>
        <h2>Features</h2>
        <hr></hr>
        <ul>
          {props.data.allContentfulFeature.edges.map((edge) => {
            return (
              <li>
                <h2>{edge.node.title}</h2>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={artistStyles.newsSection}>
        <h2>News</h2>
        <hr></hr>
        <ul>
          {props.data.allContentfulNews.edges.map((edge) => {
            return (
              <li>
                <h2>{edge.node.title}</h2>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Artist
