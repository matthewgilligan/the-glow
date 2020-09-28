import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../../components/layout/layout"
import featureStyles from "../feature/feature.module.scss"

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
    <div>
      <div
      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${props.data.contentfulNews.coverImage.file.url})`} }
      className={featureStyles.banner}>
        <div className={featureStyles.container}>
          <div className={featureStyles.content}>
            <div  className={featureStyles.titleDiv}>
              <h1 className={featureStyles.title}>
                <Link to="/">The Glow</Link>
              </h1>
            </div>
            <div className={featureStyles.details}>
              <h1 className={featureStyles.featureTitle}>{props.data.contentfulNews.title}</h1>
              <p className={featureStyles.featureAuthor}>By: {props.data.contentfulNews.author.englishName}</p>
              <p>{props.data.contentfulNews.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={featureStyles.container}>
        <div className={featureStyles.content}>
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
        </div>
      </div>
    </div>
  )
}

export default News
