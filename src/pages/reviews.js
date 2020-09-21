import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import reviewsStyles from './reviews.module.scss'
import Head from "../components/head/head"

const ReviewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview ( sort: { fields:publishedDate, order:DESC } ) {
        edges {
          node {
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
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Japanese Album Reviews"/>
      <h1>Reviews</h1>
      <ul className={reviewsStyles.albums}>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <li className={reviewsStyles.album}>
              <Link to={`${edge.node.slug}`}>
                <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
                <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default ReviewsPage
