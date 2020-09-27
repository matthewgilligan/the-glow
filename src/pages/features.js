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
            subtitle
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

  const firstFeature = data.allContentfulFeature.edges[0];

  const scrollFeatures = data.allContentfulFeature.edges.slice(1, 4)

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
      <div class={featuresStyles.topFeatures}>
        <div class={featuresStyles.firstFeature}
          style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 80%, rgba(0,0,0,0.8)), url(${firstFeature.node.coverImage.file.url})`} }>
          <div class={featuresStyles.firstFeatureDetails}>
            <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
            <p class={featuresStyles.firstFeatureSubtitle}>{firstFeature.node.subtitle}</p>
            <p class={featuresStyles.firstFeatureSubtitle}>By: {firstFeature.node.author.englishName}</p>
            <p class={featuresStyles.firstFeatureSubtitle}>{firstFeature.node.publishedDate}</p>
          </div>
        </div>
      </div>

      <ul className={featuresStyles.feature}>
      {scrollFeatures.map((edge) => {
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
