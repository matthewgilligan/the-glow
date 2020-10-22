import React from "react"
import { Link, graphql } from "gatsby"
import { FaSpotify, FaApple } from 'react-icons/fa';

import Layout from "../../components/layout/layout"
import Head from "../../components/head/head"
import artistStyles from "./artist.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulArtist (slug: { eq: $slug }) {
      englishName
      japaneseName
      bio
      spotify
      appleMusic
    }
    allContentfulReview (sort: { fields:publishedDate, order:DESC }, filter: { artist:{ slug: { eq: $slug } } }) {
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
          }
        }
      }
    }
    allContentfulNews (sort: { fields:publishedDate, order:DESC }, filter: { artist:{ elemMatch:{ slug: { eq: $slug } } } }) {
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
    allContentfulFeature (sort: { fields:publishedDate, order:DESC } ,filter: { artist:{ elemMatch:{ slug: { eq: $slug } } } }) {
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
          }
        }
      }
    }
  }
`

const Artist = (props) => {
  const head = props.data.contentfulArtist.englishName + " - Reviews, News and Features";

  const spotify =
    <a href={props.data.contentfulArtist.spotify} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>;

  const appleMusic =
    <a href="https://www.apple.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume" className={artistStyles.apple}><FaApple/></a>;

  const reviewSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>Reviews ({props.data.allContentfulReview.edges.length})</h2>
      <div className={artistStyles.albums}>
        {props.data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={artistStyles.album}>
              <Link to={`../../reviews/${edge.node.slug}`}>
                <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={artistStyles.albumCover} />
                <h2 className={artistStyles.reviewArtistName}>{edge.node.artist.englishName}</h2>
                <h2 className={artistStyles.albumTitle}>{edge.node.albumTitle}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </div>;

  const featureSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>Features ({props.data.allContentfulFeature.edges.length})</h2>
      <div className={artistStyles.features}>
        {props.data.allContentfulFeature.edges.map((edge) => {
          return (
            <div className={artistStyles.feature}>
              <Link to={`../../features/${edge.node.slug}`}>
                <div class={artistStyles.featureImage} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
              </Link>
              <div class={artistStyles.featureDetails}>
                <Link to={`../../features/${edge.node.slug}`}>
                  <h3 class={artistStyles.featureTitle}>{edge.node.title}</h3>
                </Link>
                <div class={artistStyles.newsInfo}>
                  <div class={artistStyles.newsMeta}>
                    <p class={artistStyles.newsAuthor}>By: {edge.node.author.englishName}</p>
                    <p class={artistStyles.newsDate}>{edge.node.publishedDate}</p>
                  </div>
                  <Link to={`/news/${edge.node.category.name.toLowerCase()}`}  className={artistStyles.newsCategory}>
                    <p>{edge.node.subcategory.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>

  const newsSection =
    <div className={artistStyles.contentSection}>
      <h2 className={artistStyles.sectionTitle}>News ({props.data.allContentfulNews.edges.length})</h2>
      <div className={artistStyles.newsItems}>
        {props.data.allContentfulNews.edges.map((edge) => {
          return (
            <Link to={`${edge.node.slug}`}>
              <div className={artistStyles.newsItem}>
                <div class={artistStyles.newsImg} style={{backgroundImage: `url(${edge.node.coverImage.file.url})`} }></div>
                <div class={artistStyles.newsDetails}>
                  <h3 class={artistStyles.newsTitle}>{edge.node.title}</h3>
                  <div class={artistStyles.newsInfo}>
                    <div class={artistStyles.newsMeta}>
                      <p class={artistStyles.newsAuthor}>By: {edge.node.author.englishName}</p>
                      <p class={artistStyles.newsDate}>{edge.node.publishedDate}</p>
                    </div>
                    <Link to={`/news/${edge.node.category.title.toLowerCase()}`}  className={artistStyles.newsCategory}>
                      <p>{edge.node.category.title}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>;

  return (
    <Layout>
      <Head title={head}/>
      <div className={artistStyles.artistDetails}>
        <div className={artistStyles.artistName}>
          <div className={artistStyles.nameEnglish}>
            <p>{props.data.contentfulArtist.englishName}</p>
          </div>
          <div className={artistStyles.nameJapanese}>
            <p>{props.data.contentfulArtist.japaneseName}</p>
          </div>
        </div>
        <p className={artistStyles.bio}>{props.data.contentfulArtist.bio}</p>
        <p className={artistStyles.streaming}>
          {props.data.contentfulArtist.spotify ? spotify: null } {props.data.contentfulArtist.appleMusic ? appleMusic: null }
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

export default Artist
