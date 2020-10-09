import React from "react"
import { Link, graphql } from "gatsby"
import { FaSpotify, FaApple } from 'react-icons/fa';

import Layout from "../../components/layout/layout"
import Head from "../../components/head/head"
import artistStyles from "./artist.module.scss"
import reviewsStyles from "../../pages/reviews.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulArtist (slug: { eq: $slug }) {
      englishName
      japaneseName
      bio
      spotify
      appleMusic
    }
    allContentfulReview (filter: { artist:{ slug: { eq: $slug } } }) {
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
    allContentfulNews (filter: { artist:{ elemMatch:{ slug: { eq: $slug } } } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
    allContentfulFeature (filter: { artist:{ elemMatch:{ slug: { eq: $slug } } } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

const Artist = (props) => {
  const head = props.data.contentfulArtist.englishName + " - Reviews, News and Features"

  const spotify =
    <a href={props.data.contentfulArtist.spotify} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>;

  const appleMusic =
    <a href="https://www.apple.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume" className={artistStyles.apple}><FaApple/></a>

  const reviewSection =
    <div className={artistStyles.reviewsSection}>
      <div className={artistStyles.sectionTitle}>
        <h2>Reviews ({props.data.allContentfulReview.edges.length})</h2>
      </div>
      <div className={reviewsStyles.albums}>
        {props.data.allContentfulReview.edges.map((edge) => {
          return (
            <div className={reviewsStyles.album}>
              <Link to={`../../reviews/${edge.node.slug}`}>
                <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} className={reviewsStyles.albumCover} />
                <h2 className={reviewsStyles.artistName}>{edge.node.artist.englishName}</h2>
                <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </div>

  const featureSection =
    <div className={artistStyles.featuresSection}>
      <div className={artistStyles.sectionTitle}>
        <h2>Features</h2>
      </div>
      <ul>
        {props.data.allContentfulFeature.edges.map((edge) => {
          return (
            <li>
              <Link to={`../../features/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>

  const newsSection =
    <div className={artistStyles.newsSection}>
      <div className={artistStyles.sectionTitle}>
        <h2>News</h2>
      </div>
      <ul>
        {props.data.allContentfulNews.edges.map((edge) => {
          return (
            <li>
              <Link to={`../../news/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
              </Link>
            </li>
          )
        })}
      </ul>
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
      <div className={artistStyles.menuAndContent}>
        <div className={artistStyles.menu}>
          <p>Reviews ({props.data.allContentfulReview.edges.length})</p>
        </div>
        <div className={artistStyles.content}>
          {props.data.allContentfulReview.edges.length > 0 ? reviewSection: null }
          {props.data.allContentfulFeature.edges.length > 0 ? featureSection: null }
          {props.data.allContentfulNews.edges.length > 0 ? newsSection: null }
        </div>
      </div>
    </Layout>
  )
}

export default Artist
