import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import Layout from "../../components/layout/layout"
import featuresStyles from "../features.module.scss"
import newsStyles from "../news.module.scss"
import stickyNavStyles from '../../components/sticky-nav/sticky-nav.module.scss'
import Head from "../../components/head/head"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Columns" } } } ) {
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

  const firstFeature = data.allContentfulFeature.edges[0];
  const scrollFeatures = data.allContentfulFeature.edges.slice(1, 5);
  const remainingFeatures = data.allContentfulFeature.edges.slice(5);

  const narrowRemainingFeatures = data.allContentfulFeature.edges.slice(1);

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

  {/*
  const wideScreen =
    <div class={featuresStyles.wideScreen}>
      <div class={featuresStyles.topFeatures}>
        <div class={featuresStyles.firstFeature}>
          <Link to={`../${firstFeature.node.slug}`}>
            <div class={featuresStyles.firstFeatureImg}
              style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstFeature.node.coverImage.file.url})`} }>
              <div class={featuresStyles.firstFeatureDetails}>
                <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
                <p className={featuresStyles.firstFeatureSubtitle}>{documentToReactComponents(firstFeature.node.subtitle.json, options)}</p>
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
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.scrollFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.scrollFeatureDetails}>
                  <Link to={`../${edge.node.slug}`}>
                    <p class={featuresStyles.scrollFeatureTitle}>{edge.node.title}</p>
                  </Link>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <p className={newsStyles.remainingCategory}>{edge.node.category.name}</p>
                  </div>
                </div>
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
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.remainingFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.remainingFeatureDetails}>
                  <Link to={`../${edge.node.slug}`}>
                    <h3 class={featuresStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p className={featuresStyles.remainingFeatureSubtitle}>{documentToReactComponents(edge.node.subtitle.json, options)}</p>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <p className={newsStyles.remainingCategory}>{edge.node.category.name}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>

  const narrowScreen =
    <div class={featuresStyles.narrowScreen}>
      <div class={featuresStyles.narrowTopFeature}>
        <Link to={`../${firstFeature.node.slug}`}>
          <div class={featuresStyles.narrowTopFeatureImg}
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstFeature.node.coverImage.file.url})`} }>
            <div class={featuresStyles.firstFeatureDetails}>
              <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
              <p className={featuresStyles.firstFeatureSubtitle}>{documentToReactComponents(firstFeature.node.subtitle.json, options)}</p>
              <p class={featuresStyles.firstFeatureAuthor}>By: {firstFeature.node.author.englishName}</p>
              <p class={featuresStyles.firstFeatureDate}>{firstFeature.node.publishedDate}</p>
            </div>
          </div>
        </Link>
      </div>
      <ul className={featuresStyles.remainingFeatures}>
        {narrowRemainingFeatures.map((edge) => {
          return (
            <li>
              <div className={featuresStyles.remainingFeature}>
                <Link to={`../${edge.node.slug}`} class={featuresStyles.remainingFeatureImageLink}>
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.remainingFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.remainingFeatureDetails}>
                  <Link to={`../${edge.node.slug}`}>
                    <h3 class={featuresStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p className={featuresStyles.remainingFeatureSubtitle}>{documentToReactComponents(edge.node.subtitle.json, options)}</p>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <p className={newsStyles.remainingCategory}>{edge.node.category.name}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div className={featuresStyles.mobileTopFeature}>
        <div className={featuresStyles.mobileFeature}>
          <Link to={`../${firstFeature.node.slug}`}>
            <Img
              fluid={firstFeature.node.coverImage.fluid}
              key={firstFeature.node.coverImage.fluid.src}
              alt={firstFeature.node.coverImage.title}
              className={featuresStyles.mobileFeatureImage}>
            </Img>
          </Link>
          <div class={featuresStyles.mobileFeatureDetails}>
            <Link to={`../${firstFeature.node.slug}`}>
              <h3 class={featuresStyles.mobileFeatureTitle}>{firstFeature.node.title}</h3>
            </Link>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: {firstFeature.node.author.englishName}</p>
                <p class={newsStyles.remainingDate}>{firstFeature.node.publishedDate}</p>
              </div>
              <p className={newsStyles.remainingCategory}>{firstFeature.node.category.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={featuresStyles.mobileFeatures}>
        {narrowRemainingFeatures.map((edge) => {
          return (
            <div className={featuresStyles.mobileFeature}>
              <Link to={`../${edge.node.slug}`}>
                <Img
                  fluid={edge.node.coverImage.fluid}
                  key={edge.node.coverImage.fluid.src}
                  alt={edge.node.coverImage.title}
                  className={featuresStyles.mobileFeatureImage}>
                </Img>
              </Link>
              <div class={featuresStyles.mobileFeatureDetails}>
                <Link to={`../${edge.node.slug}`}>
                  <h3 class={featuresStyles.mobileFeatureTitle}>{edge.node.title}</h3>
                </Link>
                <div class={newsStyles.remainingInfo}>
                  <div class={newsStyles.remainingMeta}>
                    <p class={newsStyles.remainingAuthor}>By: {edge.node.author.englishName}</p>
                    <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                  </div>
                  <p className={newsStyles.remainingCategory}>{edge.node.category.name}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  */}

  return (
    <Layout>
      <Head title="Japanese Music Articles and Features | The Glow"/>
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
              <Link to="../">All Features</Link>
            </li>
            <li>
              <Link to="/features/interviews">Interviews</Link>
            </li>
            <li>
              <Link to="/features/lists">Lists</Link>
            </li>
            <li>
              Columns
            </li>
          </ul>
          <div className={stickyNavStyles.mobileNav}>
            <div class={stickyNavStyles.navDropdown}>
              <button className={stickyNavStyles.navDropdownButton}>Columns ▾</button>
              <div className={stickyNavStyles.navDropdownContent}>
                <Link to="../">All Features</Link>
                <Link to="/features/interviews">Interviews</Link>
                <Link to="/features/lists">Lists</Link>
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
      {wideScreen}
      {narrowScreen}
      */}
    </Layout>
  )
}

export default FeaturesPage
