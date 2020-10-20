import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"
import newsStyles from "./news.module.scss"
import stickyNavStyles from '../components/sticky-nav/sticky-nav.module.scss'
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

  const firstPost = data.allContentfulNews.edges[0];
  const secondaryPosts = data.allContentfulNews.edges.slice(1, 3);
  const remainingPosts = data.allContentfulNews.edges.slice(3);

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
      <Link to={`${firstPost.node.slug}`}>
        <div class={newsStyles.firstPost}>
          <div class={newsStyles.firstImg}
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstPost.node.coverImage.file.url})`} }>
          </div>
          <div class={newsStyles.firstDetails}>
            <h2 class={newsStyles.firstTitle}>{firstPost.node.title}</h2>
            <p class={newsStyles.firstSubtitle}>{firstPost.node.subtitle}</p>
            <p class={newsStyles.firstAuthor}>By: {firstPost.node.author.englishName}</p>
            <p class={newsStyles.firstDate}>{firstPost.publishedDate}</p>
          </div>
        </div>
      </Link>
      <ul className={newsStyles.scrollFeatures}>
        {secondaryPosts.map((edge) => {
          return (
            <li className={newsStyles.secondaryPosts}>
              <Link to={`${edge.node.slug}`}>
                <div class={newsStyles.scrollFeatureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                <div class={newsStyles.scrollFeatureDetails}>
                  <p class={newsStyles.scrollFeatureTitle}>{edge.node.title}</p>
                  <div class={newsStyles.scrollFeatureInfo}>
                    <p class={newsStyles.scrollFeatureAuthor}>By: {edge.node.author.englishName}</p>
                    <p class={newsStyles.scrollFeatureDate}>{edge.node.publishedDate}</p>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <ul className={newsStyles.remainingPosts}>
        {remainingPosts.map((edge) => {
          return (
            <li>
              <div className={newsStyles.remainingFeature}>
                <Link to={`${edge.node.slug}`} class={newsStyles.remainingFeatureImageLink}>
                  <div class={newsStyles.remainingFeatureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                </Link>
                <div class={newsStyles.remainingFeatureDetails}>
                  <Link to={`${edge.node.slug}`}>
                    <h3 class={newsStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p class={newsStyles.remainingFeatureSubtitle}>{edge.node.subtitle}</p>
                  <div class={newsStyles.remainingFeatureInfo}>
                    <p class={newsStyles.remainingFeatureAuthor}>By: {edge.node.author.englishName}</p>
                    <p class={newsStyles.remainingFeatureDate}>{edge.node.publishedDate}</p>
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
