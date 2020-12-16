import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

import Head from "../../components/head/head"
import SEO from "../../components/seo/seo"
import Layout from "../../components/layout/layout"
import RichTextRenderer from "../../components/rich-text-renderer/rich-text-renderer"
import articleDetailsStyles from "../../components/article-details/article-details.module.scss"
import featureStyles from "../feature/feature.module.scss"
import newsStyles from "./news.module.scss"

const News = (props) => {
  const shareBlockProps = {
    url: `${props.data.site.siteMetadata.siteUrl}/news/${props.data.contentfulNews.slug}`,
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
      <SEO
        title={props.data.contentfulNews.title}
        description={props.data.contentfulNews.description}
        cover={props.data.contentfulNews.coverImage.file.url}
        imageShare={props.data.contentfulNews.coverImage.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`news/${props.data.contentfulNews.slug}`}
        isBlogPost
      />
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
          <RichTextRenderer subtitle={props.data.contentfulNews.subtitle.json} body={props.data.contentfulNews.body.json}/>
          <p className={featureStyles.artistTags}>Tags: { artistTags }</p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!){
    site {
      siteMetadata {
        siteTitle
        siteUrl
      }
    }
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

export default News
