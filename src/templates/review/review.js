import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { VscStarFull, VscStarHalf, VscStarEmpty } from "react-icons/vsc";

import Content from "../../components/content/content"
import Layout from "../../components/layout/layout"
import SEO from "../../components/seo/seo"
import reviewStyles from "./review.module.scss"

const Review = (props) => {
  const reviewContent = props.data.contentfulReview

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

  const starsInt = multiplyInt(reviewContent.rating)
  const starsDec = multiplyDec(reviewContent.rating)

  return (
    <Layout>
      <SEO
        title={`${reviewContent.artist[0].englishName}: ${reviewContent.albumTitle}`}
        description={reviewContent.description}
        cover={reviewContent.albumCover.file.url}
        imageShare={reviewContent.albumCover.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`/reviews/${reviewContent.slug}`}
        isBlogPost
      />
      <div className={reviewStyles.albumBanner}>
        <Img
          fluid={reviewContent.albumCover.fluid}
          key={reviewContent.albumCover.fluid.src}
          alt={reviewContent.albumCover.title}
          className={reviewStyles.albumCover}>
        </Img>
        <div className={reviewStyles.albumDetails}>
          <Link to={`../../artist/${reviewContent.artist[0].slug}`}>
            <h1 className={reviewStyles.artistName}>{reviewContent.artist[0].englishName}</h1>
          </Link>
          <h1 className={reviewStyles.albumTitle}>{reviewContent.albumTitle}</h1>
          <h3 className={reviewStyles.stars}>{reviewContent.rating % 1 !== 0 ? starsDec : starsInt }</h3>
          <p className={reviewStyles.label}>{reviewContent.label} &nbsp;&nbsp;• &nbsp;&nbsp;{reviewContent.initialReleaseDate}</p>
        </div>
      </div>
      <Content
        authors={reviewContent.author}
        publishedDate={reviewContent.publishedDate}
        category={reviewContent.genre.name}
        type="reviews"
        slug={reviewContent.slug}
        title={reviewContent.title}
        subtitle={reviewContent.subtitle.json}
        body={reviewContent.body.json}
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
    contentfulReview (slug: { eq: $slug }) {
      albumTitle
      description
      slug
      artist {
        englishName
        slug
      }
      author {
        englishName
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
  }
`

export default Review
