import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import featuresStyles from './features.module.scss'
import Head from "../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC } ) {
        edges {
          node {
            title
            slug
            author {
              englishName
            }
            publishedDate(formatString:"MMMM Do YYYY")
            category {
              name
            }
            genre {
              name
            }
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
      <Head title="Japanese Music Articles and Features"/>
      <div className={featuresStyles.featureNav}>
        <div className={featuresStyles.featureNavTitle}>
          <div className={featuresStyles.titleEnglish}>
            <p>features</p>
          </div>
          <div className={featuresStyles.titleJapanese}>
            <p>特徴</p>
          </div>
        </div>
        <div className={featuresStyles.featureNavBottom}>
          <ul className={featuresStyles.featureNavList}>
            <li className={featuresStyles.featureNavItem}>All features</li>
            <li className={featuresStyles.featureNavItem}>Interviews</li>
            <li className={featuresStyles.featureNavItem}>Lists</li>
            <li className={featuresStyles.featureNavItem}>Columns</li>
          </ul>
        </div>
      </div>
      <ul className={featuresStyles.feature}>
        {data.allContentfulFeature.edges.map((edge) => {
          return (
            <li className={featuresStyles.album}>
              <Link to={`${edge.node.slug}`}>
                <img src={edge.node.coverImage.file.url} alt={edge.node.coverImage.title} className={featuresStyles.albumCover} />
                <h2 className={featuresStyles.title}>{edge.node.title}</h2>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default FeaturesPage
