import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../../components/layout/layout"
import reviewStyles from "./feature.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulFeature (slug: { eq: $slug }) {
      title
      slug
      author {
        englishName
        twitter
        bio
      }
      publishedDate(formatString:"MMMM D YYYY")
      category {
        name
      }
      subcategory {
        name
      }
      subtitle
      genre {
        name
      }
      body {
        json
      }
    }
  }
`

const Feature = (props) => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }

  return (
    <Layout>
      <h1>{props.data.contentfulFeature.title}</h1>
      <p>{props.data.contentfulFeature.subcategory.name}</p>
    </Layout>
  )
}

export default Feature
