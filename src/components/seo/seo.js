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
          siteDescription
          twitterUsername
        }
      }
    }
  `)

  const { isBlogPost, path = '', lang = 'en' } = props
  const siteTitle = data.site.siteMetadata.siteTitle;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const siteDescription = data.site.siteMetadata.siteDescription;
  const twitterUsername = data.site.siteMetadata.twitterUsername;

  const title = props.title === ""
    ? "The Glow | Japanese music in the spotlight"
    : `${props.title} | ${siteTitle}`
  const formatedSiteUrl = siteUrl.endsWith('/')
    ? siteUrl.substring(0, siteUrl.length - 1)
    : siteUrl
  const imageUrl = props.cover.substring(2)
  const description = props.description || siteDescription

  return (
      <Helmet title={title}>
      {/* General tags */}
      <html lang={lang} />
      <meta name="description" content={description} />
      <link rel="canonical" href={formatedSiteUrl + withPrefix(path)} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={`${siteUrl}${props.path}`} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://${imageUrl}`} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://${imageUrl}`} />
    </Helmet>
  )
}

export default SEO
