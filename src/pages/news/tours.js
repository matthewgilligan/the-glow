import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import featuresStyles from "../features.module.scss"
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNews ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ title: { eq: "Tours" } } } ) {
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
      <div className={stickyNavStyles.nav}>
        <div className={stickyNavStyles.navTitle}>
          <div className={stickyNavStyles.titleEnglish}>
            <p>News</p>
          </div>
          <div className={stickyNavStyles.titleJapanese}>
            <p>ニュース</p>
          </div>
        </div>
        <div className={stickyNavStyles.navItems}>
          <ul>
            <li>
              <Link to="../">All News</Link>
            </li>
            <li>
              Tours
            </li>
            <li>
              <Link to="../releases">Releases</Link>
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
      <div class={featuresStyles.topFeatures}>
        <div class={featuresStyles.firstFeature}>
          <Link to={`../${firstFeature.node.slug}`}>
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
                <Link to={`../${edge.node.slug}`}>
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
                <Link to={`../${edge.node.slug}`} class={featuresStyles.remainingFeatureImageLink}>
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