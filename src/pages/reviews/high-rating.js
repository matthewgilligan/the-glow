import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../components/layout/layout"
import reviewsStyles from '../reviews.module.scss'
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
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
            publishedDate(formatString:"MMMM DD YYYY")
            rating
            category {
              name
            }
            albumCover {
              fluid {
                ...GatsbyContentfulFluid
              }
              title
              file {
                url
              }
            }
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
      <Head title="Highly Rated Japanese Album Reviews | The Glow"/>
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
              <Link to="../">All Reviews</Link>
            </li>
            <li>
              <Link to="../contemporary">Contemporary</Link>
            </li>
            <li>
              <Link to="../classic">Classic</Link>
            </li>
            <li>
              ★★★★+
            </li>
          </ul>
          <div className={stickyNavStyles.mobileNav}>
            <div class={stickyNavStyles.navDropdown}>
              <button className={stickyNavStyles.navDropdownButton}>★★★★+ ▾</button>
              <div className={stickyNavStyles.navDropdownContent}>
                <Link to="../">All Reviews</Link>
                <Link to="../contemporary">Contemporary</Link>
                <Link to="../classic">Classic</Link>
              </div>
            </div>
          </div>
          {/* <div class={stickyNavStyles.dropdown}>
            <button className={stickyNavStyles.dropdownButton}>All Genres ▾</button>
            <div className={stickyNavStyles.dropdownContent}>
              <Link to="./electronic">Electronic</Link>
              <Link to="./experimental">Experimental</Link>
              <Link to="./folk">Folk</Link>
              <Link to="./hip-hop">Hip-Hop</Link>
              <Link to="./pop">Pop</Link>
              <Link to="./rock">Rock</Link>
            </div>
          </div> */}
        </div>
      </div>
      <div className={reviewsStyles.albums}>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={reviewsStyles.album}>
              <Link to={`../${edge.node.slug}`}>
                <Img
                  fluid={edge.node.albumCover.fluid}
                  key={edge.node.albumCover.fluid.src}
                  alt={edge.node.albumCover.title}
                  className={reviewsStyles.albumCover}>
                </Img>
                <h2 className={reviewsStyles.artistName}>{edge.node.artist[0].englishName}</h2>
                <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                <p class={reviewsStyles.publishedDate}>{edge.node.publishedDate}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default ReviewsPage
