import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FaStar, FaStarHalf } from 'react-icons/fa'

import Layout from "../../components/layout/layout"
import reviewStyles from "./review.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      slug
      artist {
        englishName
        japaneseName
      }
      author {
        englishName
        twitter
        bio
      }
      publishedDate(formatString:"MMMM Do YYYY")
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

  return (
    <Layout>
      <div className={reviewStyles.content}>
        <div className={reviewStyles.post}>
          <div className={reviewStyles.albumBanner}>
            <img src={props.data.contentfulReview.albumCover.file.url} alt={props.data.contentfulReview.albumCover.title} className={reviewStyles.albumCover} />
            <div className={reviewStyles.albumDetails}>
              <h1 className={reviewStyles.artistName}>{props.data.contentfulReview.artist.englishName}</h1>
              <h1 className={reviewStyles.albumTitle}>{props.data.contentfulReview.albumTitle}</h1>
              <h3 className={reviewStyles.stars}>{stars}</h3>
              <p>{props.data.contentfulReview.label} ● {props.data.contentfulReview.initialReleaseDate}</p>
            </div>
          </div>
        </div>
        <div className={reviewStyles.latestReviews}>
          <h1>Latest Reviews</h1>
        </div>
      </div>



          {/*<div className={reviewStyles.metaDetails}>
            <p>By: {props.data.contentfulReview.author.englishName}</p>
            <p className={reviewStyles.date}>{props.data.contentfulReview.publishedDate}</p>
            <p className={reviewStyles.genre}>{props.data.contentfulReview.genre.name}</p>
          </div>
        </div>
        <div className={reviewStyles.post}>
          <div className={reviewStyles.albumDetails}>
            <h1>{props.data.contentfulReview.artist.englishName}</h1>
            <h1>{props.data.contentfulReview.albumTitle}</h1>
            <h3 className={reviewStyles.stars}>{stars}</h3>
            <p>{props.data.contentfulReview.label} ● {props.data.contentfulReview.initialReleaseDate}</p>
          </div>
          <p className={reviewStyles.subtitle}>{props.data.contentfulReview.subtitle}</p>
          {documentToReactComponents(props.data.contentfulReview.body.json, options)}
        </div>
      </div>*/}
    </Layout>
  )
}

export default Review
