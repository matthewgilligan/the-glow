import React from "react"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { VscStarFull, VscStarHalf, VscStarEmpty } from "react-icons/vsc";
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES } from "@contentful/rich-text-types"

import articleDetailsStyles from "../../components/article-details/article-details.module.scss"
import reviewStyles from "./review.module.scss"
import Layout from "../../components/layout/layout"
import SEO from "../../components/seo/seo"

export const query = graphql`
  query($slug: String!){
    site {
      siteMetadata {
        siteTitle
        siteUrl
      }
    }
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      slug
      artist {
        englishName
        japaneseName
        slug
      }
      author {
        englishName
        twitter
        bio
        slug
      }
      publishedDate(formatString:"MMMM D YYYY")
      rating
      label
      initialReleaseDate(formatString:"YYYY")
      category {
        name
      }
      albumCover {
        title
        file {
          url
        }
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      genre {
        name
      }
      body {
        json
      }
      subtitle {
        json
      }
    }
    allContentfulReview ( sort: { fields:publishedDate, order:DESC }, filter: { slug:{ ne: $slug } }, limit: 5 ) {
        edges {
          node {
            albumTitle
            slug
            artist {
              englishName
              japaneseName
            }
            publishedDate(formatString:"MMMM D YYYY")
            albumCover {
              title
              file {
                url
              }
            }
          }
        }
      }
  }
`

const Review = (props) => {
  const shareBlockProps = {
    url: `${props.data.site.siteMetadata.siteUrl}reviews/${props.data.contentfulReview.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: `${props.data.contentfulReview.artist.englishName}: ${props.data.contentfulReview.albumTitle}`,
  };

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

  const multiplyInt = (num) => {
    let stars = [];

    for(let i= 0; i < num; i++) {
      stars.push(<VscStarFull/>);
    }

    const empty = 5 - num;

    for(let i= 0; i < empty; i++) {
      stars.push(<VscStarEmpty/>);
    }

    return (
      <div>{stars}</div>
    );
  };

  const multiplyDec = (num) => {
    let stars = [];

    for(let i= 0; i < num - 1; i++) {
      stars.push(<VscStarFull/>);
    }

    stars.push(<VscStarHalf/>);

    const empty = 4.5 - num;

    for(let i= 0; i < empty; i++) {
      stars.push(<VscStarEmpty/>);
    }

    return (
      <div>{stars}</div>
    );
  };

  const starsInt = multiplyInt(props.data.contentfulReview.rating)
  const starsDec = multiplyDec(props.data.contentfulReview.rating)

  return (
    <Layout>
      <SEO
        title={`${props.data.contentfulReview.artist.englishName}: ${props.data.contentfulReview.albumTitle}`}
        description={props.data.contentfulReview.description}
        cover={props.data.contentfulReview.albumCover.file.url}
        imageShare={props.data.contentfulReview.albumCover.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`/reviews/${props.data.contentfulReview.slug}`}
        isBlogPost
      />
      <div className={reviewStyles.content}>
        <div className={reviewStyles.post}>
          <div className={reviewStyles.albumBanner}>
            <Img
              fluid={props.data.contentfulReview.albumCover.fluid}
              key={props.data.contentfulReview.albumCover.fluid.src}
              alt={props.data.contentfulReview.albumCover.title}
              className={reviewStyles.albumCover}>
            </Img>
            <div className={reviewStyles.albumDetails}>
              <Link to={`../../artist/${props.data.contentfulReview.artist.slug}`}>
                <h1 className={reviewStyles.artistName}>{props.data.contentfulReview.artist.englishName}</h1>
              </Link>
              <h1 className={reviewStyles.albumTitle}>{props.data.contentfulReview.albumTitle}</h1>
              <h3 className={reviewStyles.stars}>{props.data.contentfulReview.rating % 1 !== 0 ? starsDec : starsInt }</h3>
              <p className={reviewStyles.label}>{props.data.contentfulReview.label} &nbsp;&nbsp;• &nbsp;&nbsp;{props.data.contentfulReview.initialReleaseDate}</p>
            </div>
          </div>
          <div className={articleDetailsStyles.mobileMetaDetails}>
            <div className={articleDetailsStyles.genreAndSocials}>
              <p>By: <Link to={`../../author/${props.data.contentfulReview.author.slug}`}>{props.data.contentfulReview.author.englishName}</Link></p>
              <p className={articleDetailsStyles.genre}>{props.data.contentfulReview.genre.name}</p>
            </div>
            <p className={articleDetailsStyles.date}>{props.data.contentfulReview.publishedDate}</p>
          </div>
          <div className={reviewStyles.reviewContent}>
            <div className={articleDetailsStyles.metaDetails}>
              <p>By: <Link to={`../../author/${props.data.contentfulReview.author.slug}`}>{props.data.contentfulReview.author.englishName}</Link></p>
              <p className={articleDetailsStyles.date}>{props.data.contentfulReview.publishedDate}</p>
              <div className={articleDetailsStyles.genreAndSocials}>
                <p className={articleDetailsStyles.genre}>{props.data.contentfulReview.genre.name}</p>
                <ShareBlockStandard {...shareBlockProps} />
              </div>
            </div>
            <div className={reviewStyles.body}>
              <p className={reviewStyles.subtitle}>{documentToReactComponents(props.data.contentfulReview.subtitle.json, options)}</p>
              {documentToReactComponents(props.data.contentfulReview.body.json, options)}
            </div>
          </div>
        </div>
        {/*
          <div className={reviewStyles.latestReviews}>
            <h1 className={reviewStyles.title}>Latest Reviews</h1>
            <ul className={reviewStyles.latestAlbums}>
              {props.data.allContentfulReview.edges.map((edge) => {
                return (
                  <li>
                    <Link to={`../${edge.node.slug}`}>
                      <div className={reviewStyles.latestAlbum}>
                        <img src={edge.node.albumCover.file.url} alt={edge.node.albumCover.title} />
                        <div className={reviewStyles.latestDetails}>
                          <h1 className={reviewStyles.latestArtistName}>{edge.node.artist.englishName}</h1>
                          <h1 className={reviewStyles.latestAlbumTitle}>{edge.node.albumTitle}</h1>
                          <p className={reviewStyles.latestDate}>{edge.node.publishedDate}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        */}
      </div>
    </Layout>
  )
}

export default Review
