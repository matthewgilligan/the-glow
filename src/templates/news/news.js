import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../../components/layout/layout"
import featureStyles from "../feature/feature.module.scss"
import newsStyles from "./news.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulNews (slug: { eq: $slug }) {
      title
      slug
      author {
        englishName
        twitter
        bio
      }
      publishedDate(formatString:"MMMM D YYYY")
      category {
        title
      }
      subtitle
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

const News = (props) => {
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
      <div className={newsStyles.header}>
        <h1 className={newsStyles.title}>{props.data.contentfulNews.title}</h1>
        <img src={props.data.contentfulNews.coverImage.file.url} alt={props.data.contentfulNews.coverImage.title} className={newsStyles.coverImage} />
      </div>
      <div className={featureStyles.featureContent}>
        <div className={featureStyles.authorDetails}>
          <p>By: {props.data.contentfulNews.author.englishName}</p>
          <p className={featureStyles.date}>{props.data.contentfulNews.publishedDate}</p>
          <p className={featureStyles.genre}>{props.data.contentfulNews.category.title}</p>
        </div>
        <div className={featureStyles.body}>
          <p className={featureStyles.subtitle}>{props.data.contentfulNews.subtitle}</p>
          {documentToReactComponents(props.data.contentfulNews.body.json, options)}
        </div>
      </div>
    </Layout>
  )
}

export default News
