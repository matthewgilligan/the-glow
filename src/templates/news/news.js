import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { INLINES } from "@contentful/rich-text-types"
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
      artist {
          englishName
          slug
      }
      publishedDate(formatString:"MMMM D YYYY")
      category {
        name
      }
      subtitle {
        json
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
        fluid {
          ...GatsbyContentfulFluid
        }
        title
        description
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
      },
      [INLINES.HYPERLINK]: (node) => {
        if(node.data.uri.indexOf('youtube.com/embed') !== -1){
          return(
            <iframe width="100%" height="321" title="YouTube" src={node.data.uri} frameborder="0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          )
        } else {
          return <a href={node.data.uri} target={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '' : 'noopener noreferrer'}`}>{node.content[0].value}</a>;
        }
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

  const artists = props.data.contentfulNews.artist;
  let artistTags = []
  for (let i = 0; i < artists.length; i++) {
    if(i === artists.length -1){
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}</Link>)
    } else {
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}, </Link>)
    }
  }

  return (
    <Layout>
      <Head title={`${props.data.contentfulNews.title} | The Glow`}/>
      <div className={newsStyles.header}>
        <h1 className={newsStyles.title}>{props.data.contentfulNews.title}</h1>
        <Img
          fluid={props.data.contentfulNews.coverImage.fluid}
          key={props.data.contentfulNews.coverImage.fluid.src}
          alt={props.data.contentfulNews.coverImage.title}
          className={newsStyles.coverImage}>
        </Img>
        <p className={newsStyles.credit}>{props.data.contentfulNews.coverImage.description}</p>
      </div>
      <div className={featureStyles.featureContent}>
        <div className={articleDetailsStyles.metaDetails}>
          <p>By: <Link to={`../../author/${props.data.contentfulNews.author.slug}`}>{props.data.contentfulNews.author.englishName}</Link></p>
          <p className={articleDetailsStyles.date}>{props.data.contentfulNews.publishedDate}</p>
          <div className={articleDetailsStyles.genreAndSocials}>
            <p className={articleDetailsStyles.genre}>{props.data.contentfulNews.category.name}</p>
            <ShareBlockStandard {...shareBlockProps} />
          </div>
        </div>
        <div className={articleDetailsStyles.mobileMetaDetails}>
          <div className={articleDetailsStyles.genreAndSocials}>
            <p>By: <Link to={`../../author/${props.data.contentfulNews.author.slug}`}>{props.data.contentfulNews.author.englishName}</Link></p>
            <p className={articleDetailsStyles.genre}>{props.data.contentfulNews.category.name}</p>
          </div>
          <p className={articleDetailsStyles.date}>{props.data.contentfulNews.publishedDate}</p>
        </div>
        <div className={featureStyles.body}>
          <p className={featureStyles.subtitle}>{props.data.contentfulNews.subtitle}</p>
          {documentToReactComponents(props.data.contentfulNews.body.json, options)}
          <p className={featureStyles.artistTags}>Tags: { artistTags }</p>
        </div>
      </div>
    </Layout>
  )
}

export default News
