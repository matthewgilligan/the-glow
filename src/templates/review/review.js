import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../../components/layout/layout"
import Head from "../../components/head/head"
import reviewStyles from "./review.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      slug
      artist {
        englishName
        japaneseName
        slug
      }
      author {
        englishName
        twitter
        bio
        slug
      }
      publishedDate(formatString:"MMMM D YYYY")
      rating
      label
      initialReleaseDate(formatString:"YYYY")
      reviewCategory {
        name
      }
      albumCover {
        title
        file {
          url
        }
      }
      subtitle
      genre {
        name
      }
      body {
        json
      }
    }
    allContentfulReview ( sort: { fields:publishedDate, order:DESC }, limit: 5 ) {
        edges {
          node {
            albumTitle
            slug
            artist {
              englishName
              japaneseName
            }
            publishedDate(formatString:"MMMM D YYYY")
            albumCover {
              title
              file {
                url
              }
            }
          }
        }
      }
  }
`

const Review = (props) => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }

  const stars = "★".repeat(props.data.contentfulReview.rating)
  const head = props.data.contentfulReview.artist.englishName + ": " + props.data.contentfulReview.albumTitle

  return (
    <Layout>
      <Head title={head}/>
      <div className={reviewStyles.content}>
        <div className={reviewStyles.post}>
          <div className={reviewStyles.albumBanner}>
            <img src={props.data.contentfulReview.albumCover.file.url} alt={props.data.contentfulReview.albumCover.title} className={reviewStyles.albumCover} />
            <div className={reviewStyles.albumDetails}>
              <Link to={`../../artist/${props.data.contentfulReview.artist.slug}`}>
                <h1 className={reviewStyles.artistName}>{props.data.contentfulReview.artist.englishName}</h1>
              </Link>
              <h1 className={reviewStyles.albumTitle}>{props.data.contentfulReview.albumTitle}</h1>
              <h3 className={reviewStyles.stars}>{stars}</h3>
              <p>{props.data.contentfulReview.label} ● {props.data.contentfulReview.initialReleaseDate}</p>
            </div>
          </div>
          <div className={reviewStyles.reviewContent}>
            <div className={reviewStyles.authorDetails}>
              <Link to={`../../author/${props.data.contentfulReview.author.slug}`}>
                <p>By: {props.data.contentfulReview.author.englishName}</p>
              </Link>
              <p className={reviewStyles.date}>{props.data.contentfulReview.publishedDate}</p>
              <p className={reviewStyles.genre}>{props.data.contentfulReview.genre.name}</p>
            </div>
            <div className={reviewStyles.body}>
              <p className={reviewStyles.subtitle}>{props.data.contentfulReview.subtitle}</p>
              {documentToReactComponents(props.data.contentfulReview.body.json, options)}
            </div>
          </div>
        </div>
        <div className={reviewStyles.latestReviews}>
          <h1 className={reviewStyles.title}>Latest Reviews</h1>
          <ul className={reviewStyles.albums}>
            {props.data.allContentfulReview.edges.map((edge) => {
              return (
                <li>
                  <Link to={`../${edge.node.slug}`} className={reviewStyles.album}>
                    <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewStyles.albumCover} />
                    <div className={reviewStyles.latestDetails}>
                      <h1 className={reviewStyles.artistName}>{edge.node.artist.englishName}</h1>
                      <h1 className={reviewStyles.albumTitle}>{edge.node.albumTitle}</h1>
                      <p className={reviewStyles.date}>{edge.node.publishedDate}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Review
