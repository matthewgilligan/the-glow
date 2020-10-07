import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Head from "../../components/head/head"
import Layout from "../../components/layout/layout"
import guideStyles from "./guide.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulGuide (slug: { eq: $slug }) {
      title
      slug
      author {
        englishName
        slug
      }
      publishedDate(formatString:"MMMM D YYYY")
      category {
        title
      }
      genre {
        name
      }
      body {
        json
      }
      coverImage {
        file {
          url
        }
        title
      }
    }
  }
`

const Guides = (props) => {
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
      <Head title={props.data.contentfulGuide.title}/>
      <div className={guideStyles.banner} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0)), url(${props.data.contentfulGuide.coverImage.file.url})`}}>
        <div className={guideStyles.bannerImage}>
          <div className={guideStyles.bannerTitle}>
            <h3>A Brief Guide to</h3>
            <h1>{props.data.contentfulGuide.title}</h1>
            <h3>by The Glow</h3>
          </div>
        </div>
      </div>
      <div className={guideStyles.body}>
        {documentToReactComponents(props.data.contentfulGuide.body.json, options)}
      </div>
      <div className={guideStyles.reccomendations}>
        <h2>Top 5 {props.data.contentfulGuide.title} Albums</h2>
      </div>
    </Layout>
  )
}

export default Guides
