import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"

export const query = graphql`
  query($slug: String!){
    markdownRemark (fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`

const SitePage = (props) => {
  return (
    <Layout>
      <div>
        <h1>{props.data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
      </div>
    </Layout>
  )
}

export default SitePage
