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
  const { reference1, reference2, reference3, reference4, reference5, reference6, reference7, reference8, reference9, reference10, reference11,
    reference12, reference13, reference14, reference15 } = props.data.contentfulGuide;

  console.log(props);
  console.log(reference6);

  const reccomendations = [reference1, reference2, reference3, reference4, reference5];
  const reccomendations2 = (reference6 != null) ? [reference6, reference7, reference8, reference9, reference10] : null;
  const reccomendations3 = (reference11 != null) ? [reference11, reference12, reference13, reference14, reference15] : null;

  console.log(reccomendations);
  console.log(reccomendations2);
  console.log(reccomendations3);

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
        <h2 className={guideStyles.reccomendationsHeader}>Top 5 {props.data.contentfulGuide.subject2 ? props.data.contentfulGuide.subject2 : props.data.contentfulGuide.subject} Albums</h2>
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
          <p className={guideStyles.checkout}>Check out our {props.data.contentfulGuide.spotify2 ? props.data.contentfulGuide.subject2 : props.data.contentfulGuide.subject} playlist!</p>
          <div className={guideStyles.embed}>
            <iframe src={props.data.contentfulGuide.spotify} title="spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe src={props.data.contentfulGuide.appleMusic} title="apple" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </div>
      </div>
      {(reference6 != null) &&
        <div className={guideStyles.reccomendations}>
          <h2 className={guideStyles.reccomendationsHeader}>Top 5 {props.data.contentfulGuide.subject3} Albums</h2>
          <div className={guideStyles.albums}>
            {reccomendations2.map((reccomendation) => {
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
          {(props.data.contentfulGuide.spotify2) &&
            <div className={guideStyles.streaming}>
              <img src={logo} alt="Logo" className={guideStyles.logo}/>
              <p className={guideStyles.checkout}>Check out our {props.data.contentfulGuide.subject3} playlist!</p>
              <div className={guideStyles.embed}>
                <iframe src={props.data.contentfulGuide.spotify2} title="spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <iframe src={props.data.contentfulGuide.appleMusic2} title="apple" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              </div>
            </div>
          }
        </div>
      }
      {(reference11 != null) &&
        <div className={guideStyles.reccomendations}>
          <h2 className={guideStyles.reccomendationsHeader}>Top 5 {props.data.contentfulGuide.subject4} Albums</h2>
          <div className={guideStyles.albums}>
            {reccomendations3.map((reccomendation) => {
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
            <p className={guideStyles.checkout}>Check out our {props.data.contentfulGuide.subject4} playlist!</p>
            <div className={guideStyles.embed}>
              <iframe src={props.data.contentfulGuide.spotify3} title="spotify" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe src={props.data.contentfulGuide.appleMusic3} title="apple" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
          </div>
        </div>
      }
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
      subject2
      subject3
      subject4
      description
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
      reference6 {
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
      reference7 {
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
      reference8 {
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
      reference8 {
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
      reference9 {
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
      reference10 {
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
      reference11 {
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
      reference12 {
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
      reference13 {
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
      reference14 {
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
      reference15 {
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
      spotify2
      appleMusic2
      spotify3
      appleMusic3
    }
  }
`

export default Guides
