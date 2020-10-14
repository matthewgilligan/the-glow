import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Head from "../../components/head/head"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import guideStyles from "./guide.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulGuide (slug: { eq: $slug }) {
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
        artist {
          englishName
          japaneseName
          slug
        }
        albumCover {
          title
          file {
            url
          }
        }
      }
      reference2 {
        albumTitle
        slug
        artist {
          englishName
          japaneseName
          slug
        }
        albumCover {
          title
          file {
            url
          }
        }
      }
      reference3 {
        albumTitle
        slug
        artist {
          englishName
          japaneseName
          slug
        }
        albumCover {
          title
          file {
            url
          }
        }
      }
      reference4 {
        albumTitle
        slug
        artist {
          englishName
          japaneseName
          slug
        }
        albumCover {
          title
          file {
            url
          }
        }
      }
      reference5 {
        albumTitle
        slug
        artist {
          englishName
          japaneseName
          slug
        }
        albumCover {
          title
          file {
            url
          }
        }
      }
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
      }
    }
  }

  const reccomendations = [props.data.contentfulGuide.reference1, props.data.contentfulGuide.reference2, props.data.contentfulGuide.reference3, props.data.contentfulGuide.reference4, props.data.contentfulGuide.reference5]

  return (
    <div>
      <Head title={props.data.contentfulGuide.title}/>
      <div className={guideStyles.container}>
        <Header />
      </div>

      <div className={guideStyles.container}>
        <div className={guideStyles.banner} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0)), url(${props.data.contentfulGuide.coverImage.file.url})`}}>
          <div className={guideStyles.bannerImage}>
            <div className={guideStyles.bannerTitle}>
              <h3>A Brief Guide to</h3>
              <h1>{props.data.contentfulGuide.title}</h1>
              <h3>by The Glow</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={guideStyles.container}>
        <div className={guideStyles.body}>
          {documentToReactComponents(props.data.contentfulGuide.body.json, options)}
        </div>
      </div>

      <div className={guideStyles.reccomendations}>
        <h2>Top 5 {props.data.contentfulGuide.title} Albums</h2>
        <div className={guideStyles.albums}>
          {reccomendations.map((reccomendation) => {
            return (
              <div className={guideStyles.album}>
                <Link to={`../../reviews/${reccomendation.slug}`}>
                  <img src={reccomendation.albumCover.file.url} alt={reccomendation.albumCover.title} className={guideStyles.albumCover} />
                  <h2 className={guideStyles.artistName}>{reccomendation.artist.englishName}</h2>
                  <h2 className={guideStyles.albumTitle}>{reccomendation.albumTitle}</h2>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className={guideStyles.container}>
        <Footer />
      </div>
    </div>
  )
}

export default Guides
