import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import FeatureIndex from "../../components/indeces/features/features"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Lists" } } } ) {
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

  const li1 = <Link to="/features">All Features</Link>
  const li2 = <Link to="/features/interviews">Interviews</Link>
  const li4 = <Link to="/features/columns">Columns</Link>

  return (
    <FeatureIndex
      data={ data }
      li1={ li1 }
      li2={ li2 }
      li3="Lists"
      li4={ li4 }
      dd1="Lists"
      dd2={ li1 }
      dd3={ li2 }
      dd4={ li4 }
    />
  )
}

export default FeaturesPage
