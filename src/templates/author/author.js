import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout/layout"
import Head from "../../components/head/head"
import artistStyles from "../artist/artist.module.scss"
import reviewsStyles from "../../pages/reviews.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulAuthor (slug: { eq: $slug }) {
      englishName
      japaneseName
    }
    allContentfulReview (filter: { author:{ slug: { eq: $slug } } }) {
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
    allContentfulNews (filter: { author:{ slug: { eq: $slug } } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
    allContentfulFeature (filter: { author:{ slug: { eq: $slug } } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

const Artist = (props) => {
  const head = props.data.contentfulAuthor.englishName + " - Contributor | The Glow"

  return (
    <Layout>
      <Head title={head}/>
      <div className={artistStyles.artistDetails}>
        <h1>{props.data.contentfulAuthor.englishName}</h1>
        <h1>{props.data.contentfulAuthor.japaneseName}</h1>
      </div>
      <div className={artistStyles.reviewsSection}>
        <h2>Reviews</h2>
        <hr></hr>
        <br></br>
        <div className={reviewsStyles.albums}>
          {props.data.allContentfulReview.edges.map((edge) => {
            return (
              <div className={reviewsStyles.album}>
                <Link to={`../../reviews/${edge.node.slug}`}>
                  <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
                  <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                  <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className={artistStyles.featuresSection}>
        <h2>Features</h2>
        <hr></hr>
        <ul>
          {props.data.allContentfulFeature.edges.map((edge) => {
            return (
              <li>
                <Link to={`../../features/${edge.node.slug}`}>
                  <h2>{edge.node.title}</h2>
                </Link>
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
                <Link to={`../../news/${edge.node.slug}`}>
                  <h2>{edge.node.title}</h2>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Artist
