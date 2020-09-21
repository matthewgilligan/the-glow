import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../../components/layout/layout"
import reviewStyles from "./review.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      subtitle
      body {
        json
      }
    }
  }
`

const Review = (props) => {
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
      <h1>{props.data.contentfulReview.albumTitle}</h1>
      <p>{props.data.contentfulReview.subtitle}</p>
      {documentToReactComponents(props.data.contentfulReview.body.json, options)}
    </Layout>
  )
}

export default Review
