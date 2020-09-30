import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout/layout"
{/*import artistStyles from "./artist.module.scss"*/}

export const query = graphql`
  query($slug: String!){
    contentfulArtist (slug: { eq: $slug }) {
      englishName
      japaneseName
    }
    allContentfulReview (
      filter: {
        artist:{
          slug: {
            eq: $slug
          }
        }
      }
    ) {
      edges {
        node {
          albumTitle
          slug
        }
      }
    }
    allContentfulNews (
      filter: {
        artist:{
          elemMatch:{
            slug: {
              eq: $slug
            }
          }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }
    allContentfulFeature (
      filter: {
        artist:{
          elemMatch:{
            slug: {
              eq: $slug
            }
          }
        }
      }
    ) {
      edges {
        node {
          title
        }
      }
    }
  }
`

const Artist = (props) => {
  return (
    <Layout>
      <div>
        <h1>{props.data.contentfulArtist.englishName}</h1>
        <div>{props.data.contentfulArtist.japaneseName}</div>
        <ul>
          {props.data.allContentfulReview.edges.map((edge) => {
            return (
              <li>
                <h2>{edge.node.albumTitle}</h2>
              </li>
            )
          })}
        </ul>
        <ul>
          {props.data.allContentfulFeature.edges.map((edge) => {
            return (
              <li>
                <h2>{edge.node.title}</h2>
              </li>
            )
          })}
        </ul>
        <ul>
          {props.data.allContentfulNews.edges.map((edge) => {
            return (
              <li>
                <h2>{edge.node.title}</h2>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Artist
