import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import guidesStyles from "./guides.module.scss"
import guideStyles from "../templates//guide/guide.module.scss"
import stickyNavStyles from '../components/sticky-nav/sticky-nav.module.scss'
import Head from "../components/head/head"

const GuidesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulGuide ( sort: { fields:publishedDate, order:DESC } ) {
        edges {
          node {
            title
            subject
            slug
            publishedDate(formatString:"MMMM Do YYYY")
            coverImage {
              file {
                url
              }
              title
            }
            author {
              englishName
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Japanese Genre Guides | The Glow"/>
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
          <p>Brief guides to Japanese genres.</p>
        </div>
      </div>
      <div className={guidesStyles.guides}>
        {data.allContentfulGuide.edges.map((edge) => {
          return (
            <div className={guidesStyles.guide}>
              <Link to={`${edge.node.slug}`}>
                <div className={guidesStyles.image} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0)), url(${edge.node.coverImage.file.url})`}}>
                  <div className={guidesStyles.title}>
                    <h1>{edge.node.subject}</h1>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default GuidesPage
