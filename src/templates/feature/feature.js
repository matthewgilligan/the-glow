import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Footer from "../../components/footer/footer"
import featureStyles from "./feature.module.scss"

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
      coverImage {
        file {
          url
        }
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
    <div>
      <div
      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${props.data.contentfulFeature.coverImage.file.url})`} }
      className={featureStyles.banner}>
        <div className={featureStyles.container}>
          <div className={featureStyles.content}>
            <div  className={featureStyles.titleDiv}>
              <h1 className={featureStyles.title}>
                <Link to="/">The Glow</Link>
              </h1>
            </div>
            <div className={featureStyles.details}>
              <h1 className={featureStyles.featureTitle}>{props.data.contentfulFeature.title}</h1>
              <p className={featureStyles.featureAuthor}>By: {props.data.contentfulFeature.author.englishName}</p>
              <p>{props.data.contentfulFeature.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={featureStyles.container}>
        <div className={featureStyles.content}>
          <div className={featureStyles.featureContent}>
            <div className={featureStyles.authorDetails}>
              <p>By: {props.data.contentfulFeature.author.englishName}</p>
              <p className={featureStyles.date}>{props.data.contentfulFeature.publishedDate}</p>
              <p className={featureStyles.genre}>{props.data.contentfulFeature.subcategory.name}</p>
            </div>
            <div className={featureStyles.body}>
              <p className={featureStyles.subtitle}>{props.data.contentfulFeature.subtitle}</p>
              {documentToReactComponents(props.data.contentfulFeature.body.json, options)}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Feature
