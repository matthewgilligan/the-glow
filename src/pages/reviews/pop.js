import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import reviewsStyles from '../reviews.module.scss'
import Head from "../../components/head/head"

const ReviewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview ( sort: { fields:publishedDate, order:DESC }, filter: { genre: { name:{ eq: "Pop"} } } ) {
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
            <li className={reviewsStyles.featureNavItem}>All Reviews</li>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="./contemporary">Contemporary</Link>
            </li>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="./classic">Classic</Link>
            </li>
            <li className={reviewsStyles.featureNavItem}>
              <Link to="./high-rating">★★★★+</Link>
            </li>
          </ul>
        </div>
      </div>
      <select name="genres" id="genres">
        <option value="all">All Genres</option>
        <option value="electronic">Electronic</option>
        <option value="experimental">Experimental</option>
        <option value="folk">Folk</option>
        <option value="hipHop">Hip-Hop</option>
        <option value="pop">Pop</option>
        <option value="rock">Rock</option>
      </select>
      <div className={reviewsStyles.albums}>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={reviewsStyles.album}>
              <Link to={`${edge.node.slug}`}>
                <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
                <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default ReviewsPage
