import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix, graphql, useStaticQuery } from 'gatsby'

const SEO = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteUrl
          siteCover
          siteDescription
          twitterUsername
        }
      }
    }
  `)

  const { isBlogPost, path = '', lang = 'en' } = props
  const siteTitle = data.site.siteMetadata.siteTitle;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const siteCover = data.site.siteMetadata.siteCover;
  const siteDescription = data.site.siteMetadata.siteDescription;
  const twitterUsername = data.site.siteMetadata.twitterUsername;

  const title = props.title
    ? `${props.title} | ${siteTitle}`
    : `${siteTitle} - ${siteDescription}`
  const formatedSiteUrl = siteUrl.endsWith('/')
    ? siteUrl.substring(0, siteUrl.length - 1)
    : siteUrl
  const imagePath = props.imageShare || props.cover || withPrefix(siteCover)
  const image = `${formatedSiteUrl}${imagePath}`
  const description = props.description || siteDescription

  return (
    <Helmet title={title}>
      {/* General tags */}
      <html lang={lang} />
      <meta name="description" content={description} />
      <link rel="canonical" href={formatedSiteUrl + withPrefix(path)} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={formatedSiteUrl + withPrefix(path)} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
