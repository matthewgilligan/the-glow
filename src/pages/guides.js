import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import guidesStyles from "./guides.module.scss"
import stickyNavStyles from '../components/sticky-nav/sticky-nav.module.scss'
import Head from "../components/head/head"

const GuidesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulGuide ( sort: { fields:publishedDate, order:DESC } ) {
        edges {
          node {
            title
            slug
            publishedDate(formatString:"MMMM Do YYYY")
            coverImage {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Japanese Genre Guides"/>
      <div className={stickyNavStyles.nav}>
        <div className={stickyNavStyles.navTitle}>
          <div className={stickyNavStyles.titleEnglish}>
            <p>Guides</p>
          </div>
          <div className={stickyNavStyles.titleJapanese}>
            <p>ガイド</p>
          </div>
        </div>
        <div className={stickyNavStyles.navItems}>
          <ul>
            <li>
              All News
            </li>
            <li>
              <Link to="./tours">Tours</Link>
            </li>
            <li>
              <Link to="./releases">Releases</Link>
            </li>
          </ul>
          <div class={stickyNavStyles.dropdown}>
            <button className={stickyNavStyles.dropdownButton}>All Genres ▾</button>
            <div className={stickyNavStyles.dropdownContent}>
              <Link to="./electronic">Electronic</Link>
              <Link to="./experimental">Experimental</Link>
              <Link to="./folk">Folk</Link>
              <Link to="./hip-hop">Hip-Hop</Link>
              <Link to="./pop">Pop</Link>
              <Link to="./rock">Rock</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={guidesStyles.guides}>
        {data.allContentfulGuide.edges.map((edge) => {
          return (
            <div className={guidesStyles.guide}>
              <Link to={`${edge.node.slug}`}>
                  <div class={guidesStyles.guideImg} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                  <h3 class={guidesStyles.guideTitle}>{edge.node.title}</h3>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default GuidesPage
