import React from "react"
import { Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import Layout from "../../layout/layout"
import featuresStyles from "../../../pages/features.module.scss"
import newsStyles from "../../../pages/news.module.scss"
import stickyNavStyles from '../../sticky-nav/sticky-nav.module.scss'
import Head from "../../head/head"

const FeatureIndex = ({ data, li1, li2, li3, li4, dd1, dd2, dd3, dd4 }) => {
  const firstFeature = data.allContentfulFeature.edges[0];
  const scrollFeatures = data.allContentfulFeature.edges.slice(1, 5);
  const remainingFeatures = data.allContentfulFeature.edges.slice(5);

  const narrowRemainingFeatures = data.allContentfulFeature.edges.slice(1);

  const firstFeatureAuthors = firstFeature.node.author;
  let firstFeatureAuthorTags = []
  for (let i = 0; i < firstFeatureAuthors.length; i++) {
    if(i === firstFeatureAuthors.length -1){
      firstFeatureAuthorTags.push(<Link to={`/author/${firstFeatureAuthors[i].slug}`}>{firstFeatureAuthors[i].englishName}</Link>)
    } else {
      firstFeatureAuthorTags.push(<span><Link to={`/author/${firstFeatureAuthors[i].slug}`}>{firstFeatureAuthors[i].englishName}</Link> & </span>)
    }
  }

  const wideScreen =
    <div class={featuresStyles.wideScreen}>
      <div class={featuresStyles.topFeatures}>
        <div class={featuresStyles.firstFeature}>
          <Link to={`${firstFeature.node.slug}`}>
            <div class={featuresStyles.firstFeatureImg}
              style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstFeature.node.coverImage.file.url})`} }>
              <div class={featuresStyles.firstFeatureDetails}>
                <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
                <p className={featuresStyles.firstFeatureSubtitle}>{documentToReactComponents(firstFeature.node.subtitle.json)}</p>
                <p class={featuresStyles.firstFeatureAuthor}>By: { firstFeatureAuthorTags }</p>
                <p class={featuresStyles.firstFeatureDate}>{firstFeature.node.publishedDate}</p>
              </div>
            </div>
          </Link>
        </div>
        <ul className={featuresStyles.scrollFeatures}>
          {scrollFeatures.map((edge) => {
            const authors = edge.node.author;
            let authorTags = []
            for (let i = 0; i < authors.length; i++) {
              if(i === authors.length -1){
                authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
              } else {
                authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
              }
            }

            return (
              <li className={featuresStyles.scrollFeature}>
                <Link to={`${edge.node.slug}`}>
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.scrollFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.scrollFeatureDetails}>
                  <Link to={`${edge.node.slug}`}>
                    <p class={featuresStyles.scrollFeatureTitle}>{edge.node.title}</p>
                  </Link>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: { authorTags }</p>
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
          const authors = edge.node.author;
          let authorTags = []
          for (let i = 0; i < authors.length; i++) {
            if(i === authors.length -1){
              authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
            } else {
              authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
            }
          }

          return (
            <li>
              <div className={featuresStyles.remainingFeature}>
                <Link to={`${edge.node.slug}`} class={featuresStyles.remainingFeatureImageLink}>
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.remainingFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.remainingFeatureDetails}>
                  <Link to={`${edge.node.slug}`}>
                    <h3 class={featuresStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p className={featuresStyles.remainingFeatureSubtitle}>{documentToReactComponents(edge.node.subtitle.json)}</p>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: { firstFeatureAuthors }</p>
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
        <Link to={`${firstFeature.node.slug}`}>
          <div class={featuresStyles.narrowTopFeatureImg}
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${firstFeature.node.coverImage.file.url})`} }>
            <div class={featuresStyles.firstFeatureDetails}>
              <h2 class={featuresStyles.firstFeatureTitle}>{firstFeature.node.title}</h2>
              <p className={featuresStyles.firstFeatureSubtitle}>{documentToReactComponents(firstFeature.node.subtitle.json)}</p>
              <p class={featuresStyles.firstFeatureAuthor}>By: { firstFeatureAuthorTags }</p>
              <p class={featuresStyles.firstFeatureDate}>{firstFeature.node.publishedDate}</p>
            </div>
          </div>
        </Link>
      </div>
      <ul className={featuresStyles.remainingFeatures}>
        {narrowRemainingFeatures.map((edge) => {
          const authors = edge.node.author;
          let authorTags = []
          for (let i = 0; i < authors.length; i++) {
            if(i === authors.length -1){
              authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
            } else {
              authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
            }
          }

          return (
            <li>
              <div className={featuresStyles.remainingFeature}>
                <Link to={`${edge.node.slug}`} class={featuresStyles.remainingFeatureImageLink}>
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.remainingFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.remainingFeatureDetails}>
                  <Link to={`${edge.node.slug}`}>
                    <h3 class={featuresStyles.remainingFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <p className={featuresStyles.remainingFeatureSubtitle}>{documentToReactComponents(edge.node.subtitle.json)}</p>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: { authorTags }</p>
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
          <Link to={`${firstFeature.node.slug}`}>
            <Img
              fluid={firstFeature.node.coverImage.fluid}
              key={firstFeature.node.coverImage.fluid.src}
              alt={firstFeature.node.coverImage.title}
              className={featuresStyles.mobileFeatureImage}>
            </Img>
          </Link>
          <div class={featuresStyles.mobileFeatureDetails}>
            <Link to={`${firstFeature.node.slug}`}>
              <h3 class={featuresStyles.mobileFeatureTitle}>{firstFeature.node.title}</h3>
            </Link>
            <div class={newsStyles.remainingInfo}>
              <div class={newsStyles.remainingMeta}>
                <p class={newsStyles.remainingAuthor}>By: { firstFeatureAuthorTags }</p>
                <p class={newsStyles.remainingDate}>{firstFeature.node.publishedDate}</p>
              </div>
              <p className={newsStyles.remainingCategory}>{firstFeature.node.category.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={featuresStyles.mobileFeatures}>
        {narrowRemainingFeatures.map((edge) => {
          const authors = edge.node.author;
          let authorTags = []
          for (let i = 0; i < authors.length; i++) {
            if(i === authors.length -1){
              authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
            } else {
              authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
            }
          }

          return (
            <div className={featuresStyles.mobileFeature}>
              <Link to={`${edge.node.slug}`}>
                <Img
                  fluid={edge.node.coverImage.fluid}
                  key={edge.node.coverImage.fluid.src}
                  alt={edge.node.coverImage.title}
                  className={featuresStyles.mobileFeatureImage}>
                </Img>
              </Link>
              <div class={featuresStyles.mobileFeatureDetails}>
                <Link to={`${edge.node.slug}`}>
                  <h3 class={featuresStyles.mobileFeatureTitle}>{edge.node.title}</h3>
                </Link>
                <div class={newsStyles.remainingInfo}>
                  <div class={newsStyles.remainingMeta}>
                    <p class={newsStyles.remainingAuthor}>By: { authorTags }</p>
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
              { li1 }
            </li>
            <li>
              { li2 }
            </li>
            <li>
              { li3 }
            </li>
            <li>
              { li4 }
            </li>
          </ul>
          <div className={stickyNavStyles.mobileNav}>
            <div class={stickyNavStyles.navDropdown}>
              <button className={stickyNavStyles.navDropdownButton}>{ dd1 } ▾</button>
              <div className={stickyNavStyles.navDropdownContent}>
                { dd2 }
                { dd3 }
                { dd4 }
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
      {wideScreen}
      {narrowScreen}
    </Layout>
  )
}

export default FeatureIndex
