import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import FeatureIndex from "../../components/indeces/features/features"

const FeaturesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Columns" } } }, limit: 1 ) {
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
  const li2 = <Link to="/features/interviews">Interviews</Link>
  const li3 = <Link to="/features/lists">Lists</Link>

  return (
    <FeatureIndex
      data={ data }
      li1={ li1 }
      li2={ li2 }
      li3={ li3 }
      li4="Columns"
      dd1="Columns"
      dd2={ li1 }
      dd3={ li2 }
      dd4={ li3 }
    />
  )
}

export default FeaturesPage
