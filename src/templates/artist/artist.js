import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout/layout"
import artistStyles from "./artist.module.scss"

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

const Artist = (props) => {
  return (
    <Layout>
      <div>
        <h1 className={artistStyles.title}>Hello</h1>
        <div>Hello</div>
      </div>
    </Layout>
  )
}

export default Artist
