import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout/layout"

const ReviewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview ( sort: { fields:publishedDate, order:DESC } ) {
        edges {
          node {
            albumTitle
            slug
            artist {
              englishName
              japaneseName
            }
            author {
              englishName
              twitter
              bio
            }
            publishedDate(formatString:"MMMM Do YYYY")
            rating
            reviewCategory {
              name
            }
            albumCover {
              title
              file {
                url
              }
            }
            subtitle
            genre {
              name
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <h1>Reviews</h1>
      <ul>
        {data.allContentfulReview.edges.map((edge) => {
          return (
            <li>
              <Link to={`${edge.node.slug}`}>
                <h2>{edge.node.albumTitle}</h2>
                <h3>{edge.node.artist.englishName}</h3>
                <p>{edge.node.genre.name}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default ReviewsPage
