import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../../components/seo/seo"
import Layout from "../../components/layout/layout"
import Content from "../../components/content/content"
import newsStyles from "./news.module.scss"

const News = (props) => {
  const newsContent = props.data.contentfulNews

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
      <Content
        data={newsContent}
        category={newsContent.category.name}
        type="news"
      />
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
