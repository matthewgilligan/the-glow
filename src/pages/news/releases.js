import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../../components/layout/layout"
import newsStyles from "../news.module.scss"
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNews ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ title: { eq: "Releases" } } } ) {
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
  const remainingPosts = data.allContentfulNews.edges.slice(1);

  return (
    <Layout>
      <Head title="Japanese Music News | The Glow"/>
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
              <Link to="../tours">Tours</Link>
            </li>
            <li>
              Releases
            </li>
          </ul>
          <div className={stickyNavStyles.mobileNav}>
            <div class={stickyNavStyles.navDropdown}>
              <button className={stickyNavStyles.navDropdownButton}>Releases ▾</button>
              <div className={stickyNavStyles.navDropdownContent}>
                <Link to="../">All News</Link>
                <Link to="../tours">Tours</Link>
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
      <Link to={`../${firstPost.node.slug}`} className={newsStyles.firstPostWide}>
        <div class={newsStyles.firstPost}>
          <div class={newsStyles.firstImg}
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstPost.node.coverImage.file.url})`} }>
          </div>
          <div class={newsStyles.firstDetails}>
            <h2 class={newsStyles.firstTitle}>{firstPost.node.title}</h2>
            <p class={newsStyles.firstSubtitle}>{firstPost.node.subtitle}</p>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: {firstPost.node.author.englishName}</p>
                <p class={newsStyles.remainingDate}>{firstPost.node.publishedDate}</p>
              </div>
              <Link to={`../${firstPost.node.category.title.toLowerCase()}`}  className={newsStyles.remainingCategory}>
                <p>{firstPost.node.category.title}</p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <Link to={`../${firstPost.node.slug}`} className={newsStyles.firstPostSmall}>
        <div className={newsStyles.remainingPost}>
          <div class={newsStyles.remainingImg} style={{backgroundImage: `url(${firstPost.node.coverImage.file.url})`} }></div>
          <div class={newsStyles.remainingDetails}>
            <h3 class={newsStyles.remainingTitle}>{firstPost.node.title}</h3>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: {firstPost.node.author.englishName}</p>
                <p class={newsStyles.remainingDate}>{firstPost.node.publishedDate}</p>
              </div>
              <Link to={`../${firstPost.node.category.title.toLowerCase()}`}  className={newsStyles.remainingCategory}>
                <p>{firstPost.node.category.title}</p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <div className={newsStyles.remainingPosts}>
        {remainingPosts.map((edge) => {
          return (
            <Link to={`../${edge.node.slug}`}>
              <div className={newsStyles.remainingPost}>
                <div class={newsStyles.remainingImg} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                <div class={newsStyles.remainingDetails}>
                  <h3 class={newsStyles.remainingTitle}>{edge.node.title}</h3>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <Link to={`../${edge.node.category.title.toLowerCase()}`}  className={newsStyles.remainingCategory}>
                      <p>{edge.node.category.title}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default FeaturesPage
