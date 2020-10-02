import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import reviewsStyles from '../reviews.module.scss'
import Head from "../../components/head/head"

const ReviewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview ( sort: { fields:publishedDate, order:DESC }, filter: { rating:{ gte: 4 } } ) {
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
      <div className={reviewsStyles.featureNav}>
        <div className={reviewsStyles.featureNavTitle}>
          <div className={reviewsStyles.titleEnglish}>
            <p>Reviews</p>
          </div>
          <div className={reviewsStyles.titleJapanese}>
            <p>レビュー</p>
          </div>
        </div>
        <div className={reviewsStyles.featureNavBottom}>
          <ul className={reviewsStyles.featureNavList}>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="../">All Reviews</Link>
            </li>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="../contemporary">Contemporary</Link>
            </li>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="../classic">Classic</Link>
            </li>
            <li className={reviewsStyles.featureNavItem}>★★★★+</li>
          </ul>
        </div>
      </div>
      <ul className={reviewsStyles.albums}>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <li className={reviewsStyles.album}>
              <Link to={`../${edge.node.slug}`}>
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
