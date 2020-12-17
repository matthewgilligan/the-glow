import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import FeatureIndex from "../../components/indeces/features/features"

const InterviewsIndex = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Interviews" } } }) {
        edges {
          node {
            title
            subtitle {
              json
            }
            slug
            author {
              englishName
              slug
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

  const li1 = <Link to="/features">All Features</Link>
  const li3 = <Link to="/features/lists">Lists</Link>
  const li4 = <Link to="/features/columns">Columns</Link>

  return (
    <FeatureIndex
      data={ data }
      li1={ li1 }
      li2="Interviews"
      li3={ li3 }
      li4={ li4 }
      dd1="Interviews"
      dd2={ li1 }
      dd3={ li3 }
      dd4={ li4 }
    />
  )
}

export default InterviewsIndex
