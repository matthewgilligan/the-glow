import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { FaTwitter } from 'react-icons/fa'
import { HiLink } from "react-icons/hi";

import Layout from "../../components/layout/layout"
import Head from "../../components/head/head"
import artistStyles from "../artist/artist.module.scss"
import reviewsStyles from "../../pages/reviews.module.scss"
import featuresStyles from "../../pages/features.module.scss"
import newsStyles from "../../pages/news.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulAuthor (slug: { eq: $slug }) {
      englishName
      japaneseName
      bio
      role
      twitter
      externalLink
    }
    allContentfulReview (sort: { fields:publishedDate, order:DESC }, filter: { author:{ slug: { eq: $slug } } }) {
      edges {
        node {
          albumTitle
          slug
          artist {
            englishName
          }
          albumCover {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulNews (sort: { fields:publishedDate, order:DESC }, filter: { author:{ slug: { eq: $slug } } }) {
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
            slug
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
    allContentfulFeature (sort: { fields:publishedDate, order:DESC }, filter: { artist:{ elemMatch:{ slug: { eq: $slug } } } }) {
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
          subcategory {
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
`

const Author = (props) => {
  const head = props.data.contentfulAuthor.englishName + " - Reviews, News and Features | The Glow";

  const twitter =
    <a href={props.data.contentfulAuthor.twitter} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>;

  const externalLink =
    <a href={props.data.contentfulAuthor.externalLink} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume" className={artistStyles.apple}><HiLink/></a>;

  const reviewSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>Reviews ({props.data.allContentfulReview.edges.length})</h2>
      <div className={artistStyles.albums}>
        {props.data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={artistStyles.album}>
              <Link to={`/reviews/${edge.node.slug}`}>
                <Img
                  fluid={edge.node.albumCover.fluid}
                  key={edge.node.albumCover.fluid.src}
                  alt={edge.node.albumCover.title}
                  className={artistStyles.albumCover}>
                </Img>
                <h2 className={artistStyles.reviewArtistName}>{edge.node.artist.englishName}</h2>
                <h2 className={artistStyles.albumTitle}>{edge.node.albumTitle}</h2>
              </Link>
            </div>
          )
        })}
      </div>
      <div className={artistStyles.responsiveAlbums}>
        <div className={reviewsStyles.albums}>
          {props.data.allContentfulReview.edges.map((edge) => {
            return (
              <div className={reviewsStyles.album}>
                <Link to={`/reviews/${edge.node.slug}`}>
                  <Img
                    fluid={edge.node.albumCover.fluid}
                    key={edge.node.albumCover.fluid.src}
                    alt={edge.node.albumCover.title}
                    className={reviewsStyles.albumCover}>
                  </Img>
                  <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                  <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                  <p class={reviewsStyles.publishedDate}>{edge.node.publishedDate}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>;

  const featureSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>Features ({props.data.allContentfulFeature.edges.length})</h2>
      <div className={artistStyles.features}>
        {props.data.allContentfulFeature.edges.map((edge) => {
          return (
            <div className={artistStyles.feature}>
              <Link to={`/features/${edge.node.slug}`}>
                <Img
                  fluid={edge.node.coverImage.fluid}
                  key={edge.node.coverImage.fluid.src}
                  alt={edge.node.coverImage.title}
                  className={artistStyles.featureImage}>
                </Img>
              </Link>
              <div class={artistStyles.featureDetails}>
                <Link to={`/features/${edge.node.slug}`}>
                  <h3 class={artistStyles.featureTitle}>{edge.node.title}</h3>
                </Link>
                <div class={artistStyles.newsInfo}>
                  <div class={artistStyles.newsMeta}>
                    <p class={artistStyles.newsAuthor}>By: {edge.node.author[0].englishName}</p>
                    <p class={artistStyles.newsDate}>{edge.node.publishedDate}</p>
                  </div>
                  <Link to={`/features/${edge.node.category.name.toLowerCase()}`}  className={artistStyles.newsCategory}>
                    <p>{edge.node.subcategory.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={artistStyles.responsiveFeatures}>
        <div className={featuresStyles.mobileFeatures}>
          {props.data.allContentfulFeature.edges.map((edge) => {
            return (
              <div className={featuresStyles.mobileFeature}>
                <Link to={`/features/${edge.node.slug}`}>
                  <Img
                    fluid={edge.node.coverImage.fluid}
                    key={edge.node.coverImage.fluid.src}
                    alt={edge.node.coverImage.title}
                    className={featuresStyles.mobileFeatureImage}>
                  </Img>
                </Link>
                <div class={featuresStyles.mobileFeatureDetails}>
                  <Link to={`/features/${edge.node.slug}`}>
                    <h3 class={featuresStyles.mobileFeatureTitle}>{edge.node.title}</h3>
                  </Link>
                  <div class={newsStyles.remainingInfo}>
                    <div class={newsStyles.remainingMeta}>
                      <p class={newsStyles.remainingAuthor}>By: {edge.node.author[0].englishName}</p>
                      <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                    </div>
                    <Link to={`/features/${edge.node.category.name.toLowerCase()}`} className={newsStyles.remainingCategory}>
                      <p>{edge.node.category.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  const newsSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>News ({props.data.allContentfulNews.edges.length})</h2>
      <div className={artistStyles.newsItems}>
        {props.data.allContentfulNews.edges.map((edge) => {
          return (
            <Link to={`/news/${edge.node.slug}`}>
              <div className={artistStyles.newsItem}>
                <Img
                  fluid={edge.node.coverImage.fluid}
                  key={edge.node.coverImage.fluid.src}
                  alt={edge.node.coverImage.title}
                  className={artistStyles.newsImg}>
                </Img>
                <div class={artistStyles.newsDetails}>
                  <h3 class={artistStyles.newsTitle}>{edge.node.title}</h3>
                  <div class={artistStyles.newsInfo}>
                    <div class={artistStyles.newsMeta}>
                      <p class={artistStyles.newsAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={artistStyles.newsDate}>{edge.node.publishedDate}</p>
                    </div>
                    <Link to={edge.node.category.slug} className={artistStyles.newsCategory}>
                      <p>{edge.node.category.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className={artistStyles.responsiveNews}>
        <div className={newsStyles.remainingPosts}>
          {props.data.allContentfulNews.edges.map((edge) => {
            return (
              <Link to={`/news/${edge.node.slug}`}>
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
                      <Link to={edge.node.category.slug} className={newsStyles.remainingCategory}>
                        <p>{edge.node.category.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>;

  return (
    <Layout>
      <Head title={head}/>
      <div className={artistStyles.artistDetails}>
        <div className={artistStyles.artistName}>
          <div className={artistStyles.nameEnglish}>
            <p>{props.data.contentfulAuthor.englishName}</p>
          </div>
          <div className={artistStyles.nameJapanese}>
            <p>{props.data.contentfulAuthor.japaneseName}</p>
          </div>
        </div>
        <p className={artistStyles.role}>{props.data.contentfulAuthor.role}</p>
        <p className={artistStyles.bio}>{props.data.contentfulAuthor.bio}</p>
        <p className={artistStyles.streaming}>
          {props.data.contentfulAuthor.twitter ? twitter : null } {props.data.contentfulAuthor.externalLink ? externalLink : null }
        </p>
      </div>
        <div className={artistStyles.content}>
          {props.data.allContentfulReview.edges.length > 0 ? reviewSection: null }
          {props.data.allContentfulFeature.edges.length > 0 ? featureSection: null }
          {props.data.allContentfulNews.edges.length > 0 ? newsSection: null }
        </div>
    </Layout>
  )
}

export default Author
