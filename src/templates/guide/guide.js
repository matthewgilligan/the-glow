import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import logo from "../../images/white-glow-ray.png"
import SEO from "../../components/seo/seo"
import RichTextRenderer from "../../components/rich-text-renderer/rich-text-renderer"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import indexStyles from "../../pages/index.module.scss"
import guideStyles from "./guide.module.scss"

const Guides = (props) => {
  const reccomendations = [props.data.contentfulGuide.reference1, props.data.contentfulGuide.reference2, props.data.contentfulGuide.reference3, props.data.contentfulGuide.reference4, props.data.contentfulGuide.reference5]

  return (
    <div className={indexStyles.indexContainter}>
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
          <RichTextRenderer subtitle={null} body={props.data.contentfulGuide.body.json}/>
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

export default Guides
