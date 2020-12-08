import React from "react"
import { ShareButtonIconOnly } from "react-custom-share";
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES } from "@contentful/rich-text-types"

import guideStyles from "./guide.module.scss"
import indexStyles from "../../pages/index.module.scss"
import logo from "../../images/white-glow-ray.png"
import Footer from "../../components/footer/footer"
import Head from "../../components/head/head"
import Header from "../../components/header/header"
import SEO from "../../components/seo/seo"

export const query = graphql`
  query($slug: String!){
    site {
      siteMetadata {
        siteTitle
        siteUrl
      }
    }
    contentfulGuide (slug: { eq: $slug }) {
      title
      subject
      slug
      author {
        englishName
        slug
      }
      publishedDate(formatString:"MMMM D YYYY")
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
      reference1 {
        albumTitle
        slug
        artist
        albumCover {
          title
          file {
            url
          }
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      reference2 {
        albumTitle
        slug
        artist
        albumCover {
          title
          file {
            url
          }
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      reference3 {
        albumTitle
        slug
        artist
        albumCover {
          title
          file {
            url
          }
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      reference4 {
        albumTitle
        slug
        artist
        albumCover {
          title
          file {
            url
          }
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      reference5 {
        albumTitle
        slug
        artist
        albumCover {
          title
          file {
            url
          }
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      spotify
      appleMusic
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
      },
      [INLINES.HYPERLINK]: (node) => {
        if(node.data.uri.indexOf('youtube.comyoutube.com/embed') !== -1){
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
    url: `${props.data.site.siteMetadata.siteUrl}/guides/${props.data.contentfulGuide.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: `${props.data.contentfulGuide.title}`,
  };

  const reccomendations = [props.data.contentfulGuide.reference1, props.data.contentfulGuide.reference2, props.data.contentfulGuide.reference3, props.data.contentfulGuide.reference4, props.data.contentfulGuide.reference5]

  return (
    <div className={indexStyles.indexContainter}>
      <Head title={`${props.data.contentfulGuide.title} | The Glow`}/>
      <SEO
        title={props.data.contentfulGuide.title}
        description={props.data.contentfulGuide.description}
        cover={props.data.contentfulGuide.coverImage.file.url}
        imageShare={props.data.contentfulGuide.coverImage.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`/guides/${props.data.contentfulGuide.slug}`}
        isBlogPost
      />
      <div className={indexStyles.headerContainer}>
        <Header />
      </div>

      <div className={guideStyles.container}>
        <div className={guideStyles.banner} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0)), url(${props.data.contentfulGuide.coverImage.file.url})`}}>
            <div className={guideStyles.bannerTitle}>
              <h3>A Brief Guide to</h3>
              <h1>{props.data.contentfulGuide.subject}</h1>
              <h3>by The Glow</h3>
            </div>
        </div>
        <p className={guideStyles.credit}>{props.data.contentfulGuide.coverImage.description}</p>
      </div>

      <div className={guideStyles.container}>
        <div className={guideStyles.body}>
          {documentToReactComponents(props.data.contentfulGuide.body.json, options)}
        </div>
      </div>

      <div className={guideStyles.reccomendations}>
        <h2 className={guideStyles.reccomendationsHeader}>Top 5 {props.data.contentfulGuide.subject} Albums</h2>
        <div className={guideStyles.albums}>
          {reccomendations.map((reccomendation) => {
            return (
              <div className={guideStyles.album}>
                <Img
                  fluid={reccomendation.albumCover.fluid}
                  key={reccomendation.albumCover.fluid.src}
                  alt={reccomendation.albumCover.title}
                  className={guideStyles.albumCover}>
                </Img>
                <h2 className={guideStyles.artistName}>{reccomendation.artist}</h2>
                <h2 className={guideStyles.albumTitle}>{reccomendation.albumTitle}</h2>
              </div>
            )
          })}
        </div>
        <div className={guideStyles.streaming}>
          <img src={logo} alt="Logo" className={guideStyles.logo}/>
          <p className={guideStyles.checkout}>Check out our {props.data.contentfulGuide.subject} playlist!</p>
          <div className={guideStyles.embed}>
            <iframe src={props.data.contentfulGuide.spotify} title="spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe src={props.data.contentfulGuide.appleMusic} title="apple" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Guides
