import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import featuresStyles from "../features.module.scss"
import featureSmallStyles from "./feature-small.module.scss"
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Lists" } } } ) {
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

  return (
    <Layout>
      <Head title="Japanese Music Articles and Features"/>
      <div className={stickyNavStyles.nav}>
        <div className={stickyNavStyles.navTitle}>
          <div className={stickyNavStyles.titleEnglish}>
            <p>Features</p>
          </div>
          <div className={stickyNavStyles.titleJapanese}>
            <p>特徴</p>
          </div>
        </div>
        <div className={stickyNavStyles.navItems}>
          <ul>
            <li>
              <Link to="/features/">All Features</Link>
            </li>
            <li>
              <Link to="/features/interviews">Interviews</Link>
            </li>
            <li>
              Lists
            </li>
            <li>
              <Link to="/features/columns">Columns</Link>
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
      <ul className={featureSmallStyles.list}>
        {data.allContentfulFeature.edges.map((edge) => {
          return (
            <li className={featureSmallStyles.item}>
              <Link to={`../${edge.node.slug}`}>
                <div class={featureSmallStyles.image} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                <div class={featureSmallStyles.details}>
                  <p class={featureSmallStyles.title}>{edge.node.title}</p>
                  <div class={featureSmallStyles.info}>
                    <p class={featureSmallStyles.author}>By: {edge.node.author.englishName}</p>
                    <p class={featureSmallStyles.date}>{edge.node.publishedDate}</p>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default FeaturesPage
