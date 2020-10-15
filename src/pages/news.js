import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import featuresStyles from "./features.module.scss"
import Head from "../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNews ( sort: { fields:publishedDate, order:DESC } ) {
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
              title
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

  const firstFeature = data.allContentfulNews.edges[0];
  const scrollFeatures = data.allContentfulNews.edges.slice(1, 5);
  const remainingFeatures = data.allContentfulNews.edges.slice(5);

  return (
    <Layout>
      <Head title="Japanese Music News"/>
      <div className={featuresStyles.featureNav}>
        <div className={featuresStyles.featureNavTitle}>
          <div className={featuresStyles.titleEnglish}>
            <p>News</p>
          </div>
          <div className={featuresStyles.titleJapanese}>
            <p>ニュース</p>
          </div>
        </div>
        <div className={featuresStyles.featureNavBottom}>
          <ul className={featuresStyles.featureNavList}>
            <li className={featuresStyles.featureNavItem}>All news</li>
            <li className={featuresStyles.featureNavItem}>Tours</li>
            <li className={featuresStyles.featureNavItem}>Releases</li>
          </ul>
        </div>
      </div>
      <div class={featuresStyles.topFeatures}>
        <div class={featuresStyles.firstFeature}>
          <Link to={`${firstFeature.node.slug}`}>
            <div class={featuresStyles.firstFeatureImg}
              style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstFeature.node.coverImage.file.url})`} }>
              <div class={featuresStyles.firstFeatureDetails}>
                <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
                <p class={featuresStyles.firstFeatureSubtitle}>{firstFeature.node.subtitle}</p>
                <p class={featuresStyles.firstFeatureAuthor}>By: {firstFeature.node.author.englishName}</p>
                <p class={featuresStyles.firstFeatureDate}>{firstFeature.node.publishedDate}</p>
              </div>
            </div>
          </Link>
        </div>
        <ul className={featuresStyles.scrollFeatures}>
          {scrollFeatures.map((edge) => {
            return (
              <li className={featuresStyles.scrollFeature}>
                <Link to={`${edge.node.slug}`}>
                  <div class={featuresStyles.scrollFeatureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                  <div class={featuresStyles.scrollFeatureDetails}>
                    <p class={featuresStyles.scrollFeatureTitle}>{edge.node.title}</p>
                    <div class={featuresStyles.scrollFeatureInfo}>
                      <p class={featuresStyles.scrollFeatureAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={featuresStyles.scrollFeatureDate}>{edge.node.publishedDate}</p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <ul className={featuresStyles.remainingFeatures}>
        {remainingFeatures.map((edge) => {
          return (
            <li>
              <div className={featuresStyles.remainingFeature}>
                <Link to={`${edge.node.slug}`} class={featuresStyles.remainingFeatureImageLink}>
                  <div class={featuresStyles.remainingFeatureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                </Link>
                <div class={featuresStyles.remainingFeatureDetails}>
                  <Link to={`${edge.node.slug}`}>
                    <h3 class={featuresStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p class={featuresStyles.remainingFeatureSubtitle}>{edge.node.subtitle}</p>
                  <div class={featuresStyles.remainingFeatureInfo}>
                    <p class={featuresStyles.remainingFeatureAuthor}>By: {edge.node.author.englishName}</p>
                    <p class={featuresStyles.remainingFeatureDate}>{edge.node.publishedDate}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default FeaturesPage
