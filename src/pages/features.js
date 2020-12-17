import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import FeatureIndex from "../components/indeces/features/features"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC } ) {
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

  const li2 = <Link to="/features/interviews">Interviews</Link>
  const li3 = <Link to="/features/lists">Lists</Link>
  const li4 = <Link to="/features/columns">Columns</Link>

  return (
    <FeatureIndex
      data={ data }
      li1="All Features"
      li2={ li2 }
      li3={ li3 }
      li4={ li4 }
      dd1="All Features"
      dd2={ li2 }
      dd3={ li3 }
      dd4={ li4 }
    />
  )
}

export default FeaturesPage
