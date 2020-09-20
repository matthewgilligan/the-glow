import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout/layout"
import reviewStyles from "./review.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      subtitle
    }
  }
`

const SitePage = (props) => {
  return (
    <Layout>
      <h1>{props.data.contentfulReview.albumTitle}</h1>
    </Layout>
  )
}

export default SitePage
