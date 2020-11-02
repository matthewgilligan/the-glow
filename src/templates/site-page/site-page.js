import React from "react"
import { graphql } from "gatsby"

import Head from "../../components/head/head"
import Layout from "../../components/layout/layout"
import sitePageStyles from "./site-page.module.scss"

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
      <Head title={`${props.data.markdownRemark.frontmatter.title} | The Glow`}/>
      <div>
        <h1 className={sitePageStyles.title}>{props.data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} className={sitePageStyles.content}></div>
      </div>
    </Layout>
  )
}

export default SitePage
