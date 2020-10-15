import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import reviewsStyles from '../reviews.module.scss'
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const ReviewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview ( sort: { fields:publishedDate, order:DESC }, filter: { genre: { name:{ eq: "Rock"} } } ) {
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
      <div className={stickyNavStyles.nav}>
        <div className={stickyNavStyles.navTitle}>
          <div className={stickyNavStyles.titleEnglish}>
            <p>Reviews</p>
          </div>
          <div className={stickyNavStyles.titleJapanese}>
            <p>レビュー</p>
          </div>
        </div>
        <div className={stickyNavStyles.navItems}>
          <ul>
            <li>
              All Reviews
            </li>
            <li>
              <Link to="../contemporary">Contemporary</Link>
            </li>
            <li>
              <Link to="../classic">Classic</Link>
            </li>
            <li>
              <Link to="../high-rating">★★★★+</Link>
            </li>
          </ul>
          <div class={stickyNavStyles.dropdown}>
            <button class={stickyNavStyles.rockButton}>Rock ▾</button>
            <div class={stickyNavStyles.dropdownContent}>
              <Link to="../">All Genres</Link>
              <Link to="../electronic">Electronic</Link>
              <Link to="../experimental">Experimental</Link>
              <Link to="../folk">Folk</Link>
              <Link to="../hip-hop">Hip-Hop</Link>
              <Link to="../pop">Pop</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={reviewsStyles.albums}>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={reviewsStyles.album}>
              <Link to={`../${edge.node.slug}`}>
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