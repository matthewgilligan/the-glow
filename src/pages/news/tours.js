import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import Layout from "../../components/layout/layout"
import newsStyles from "../news.module.scss"
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNews ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Tours" } } } ) {
        edges {
          node {
            title
            subtitle {
              json
            }
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
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `)

  {/*
    const firstPost = data.allContentfulNews.edges[0];
    const remainingPosts = data.allContentfulNews.edges.slice(1);
  */}

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      },
      [INLINES.HYPERLINK]: (node) => {
        if(node.data.uri.indexOf('youtube.com/embed') !== -1){
          return(
            <iframe width="100%" height="321" title="YouTube" src={node.data.uri} frameborder="0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          )
        } else {
          return <a href={node.data.uri} target={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '' : 'noopener noreferrer'}`}>{node.content[0].value}</a>;
        }
      }
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
  }

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
              Tours
            </li>
            <li>
              <Link to="../releases">Releases</Link>
            </li>
          </ul>
          <div className={stickyNavStyles.mobileNav}>
            <div class={stickyNavStyles.navDropdown}>
              <button className={stickyNavStyles.navDropdownButton}>Tours ▾</button>
              <div className={stickyNavStyles.navDropdownContent}>
                <Link to="../">All News</Link>
                <Link to="../releases">Releases</Link>
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
      {/*
      <Link to={`../${firstPost.node.slug}`} className={newsStyles.firstPostWide}>
        <div class={newsStyles.firstPost}>
          <Img
            fluid={firstPost.node.coverImage.fluid}
            key={firstPost.node.coverImage.fluid.src}
            alt={firstPost.node.coverImage.title}
            className={newsStyles.firstImg}>
          </Img>
          <div class={newsStyles.firstDetails}>
            <h2 class={newsStyles.firstTitle}>{firstPost.node.title}</h2>
            <p className={newsStyles.firstSubtitle}>{documentToReactComponents(firstPost.node.subtitle.json, options)}</p>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: {firstPost.node.author.englishName}</p>
                <p class={newsStyles.remainingDate}>{firstPost.node.publishedDate}</p>
              </div>
              <Link to={firstPost.node.category.slug}  className={newsStyles.remainingCategory}>
                <p>{firstPost.node.category.name}</p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <Link to={`../${firstPost.node.slug}`} className={newsStyles.firstPostSmall}>
        <div className={newsStyles.remainingPost}>
          <Img
            fluid={firstPost.node.coverImage.fluid}
            key={firstPost.node.coverImage.fluid.src}
            alt={firstPost.node.coverImage.title}
            className={newsStyles.remainingImg}>
          </Img>
          <div class={newsStyles.remainingDetails}>
            <h3 class={newsStyles.remainingTitle}>{firstPost.node.title}</h3>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: {firstPost.node.author.englishName}</p>
                <p class={newsStyles.remainingDate}>{firstPost.node.publishedDate}</p>
              </div>
              <p className={newsStyles.remainingCategory}>{firstPost.node.category.name}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className={newsStyles.remainingPosts}>
        {remainingPosts.map((edge) => {
          return (
            <Link to={`../${edge.node.slug}`}>
              <div className={newsStyles.remainingPost}>
                <Img
                  fluid={edge.node.coverImage.fluid}
                  key={edge.node.coverImage.fluid.src}
                  alt={edge.node.coverImage.title}
                  className={newsStyles.remainingImg}>
                </Img>
                <div class={newsStyles.remainingDetails}>
                  <h3 class={newsStyles.remainingTitle}>{edge.node.title}</h3>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <p className={newsStyles.remainingCategory}>{edge.node.category.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      */}
    </Layout>
  )
}

export default FeaturesPage
