import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

import Head from "../../components/head/head"
import Layout from "../../components/layout/layout"
import articleDetailsStyles from "../../components/article-details/article-details.module.scss"
import featureStyles from "../feature/feature.module.scss"
import newsStyles from "./news.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulNews (slug: { eq: $slug }) {
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
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
  }

  const shareBlockProps = {
    url: `https://xenodochial-dubinsky-db8110.netlify.app/news/${props.data.contentfulNews.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: `${props.data.contentfulNews.title}`,
  };

  return (
    <Layout>
      <Head title={`${props.data.contentfulNews.title} | The Glow`}/>
      <div className={newsStyles.header}>
        <h1 className={newsStyles.title}>{props.data.contentfulNews.title}</h1>
        <img src={props.data.contentfulNews.coverImage.file.url} alt={props.data.contentfulNews.coverImage.title} className={newsStyles.coverImage} />
      </div>
      <div className={featureStyles.featureContent}>
        <div className={articleDetailsStyles.metaDetails}>
          <p>By: <Link to={`../../author/${props.data.contentfulNews.author.slug}`}>{props.data.contentfulNews.author.englishName}</Link></p>
          <p className={articleDetailsStyles.date}>{props.data.contentfulNews.publishedDate}</p>
          <div className={articleDetailsStyles.genreAndSocials}>
            <p className={articleDetailsStyles.genre}>{props.data.contentfulNews.category.title}</p>
            <ShareBlockStandard {...shareBlockProps} />
          </div>
        </div>
        <div className={articleDetailsStyles.mobileMetaDetails}>
          <div className={articleDetailsStyles.genreAndSocials}>
            <p>By: <Link to={`../../author/${props.data.contentfulNews.author.slug}`}>{props.data.contentfulNews.author.englishName}</Link></p>
            <p className={articleDetailsStyles.genre}>{props.data.contentfulNews.category.title}</p>
          </div>
          <p className={articleDetailsStyles.date}>{props.data.contentfulNews.publishedDate}</p>
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
