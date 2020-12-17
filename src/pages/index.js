import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import patreon from "../images/patreon_ad.png"
import SEO from "../components/seo/seo"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import '../styles/index.scss'
import indexStyles from "./index.module.scss"
import reviewsStyles from "./reviews.module.scss"
import newsStyles from "./news.module.scss"
import guidesStyles from "./guides.module.scss"

const IndexPage = (props) => {
  return (
    <div className={indexStyles.indexContainter}>
      <SEO
        title=""
        description="Japanese music in the spotlight."
        cover={props.data.allContentfulSiteMetadata.edges[0].node.image.file.url}
        imageShare={props.data.allContentfulSiteMetadata.edges[0].node.image.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={props.data.site.siteMetadata.siteUrl}
      />

      <div className={indexStyles.headerContainer}>
        <Header />
      </div>


      <section className={indexStyles.topFeature}>
        <div className={indexStyles.container}>
          <div className={indexStyles.topFeatureContent}>
            <h1 className={indexStyles.topFeatureResponsiveTitle}>The Best Japanese Albums of 2020</h1>
            <Link to={`features/${props.data.allContentfulFeature.edges[0].node.slug}`} className={indexStyles.topFeatureImageLink}>
              <Img
                fluid={props.data.allContentfulFeature.edges[0].node.coverImage.fluid}
                key={props.data.allContentfulFeature.edges[0].node.coverImage.fluid.src}
                alt={props.data.allContentfulFeature.edges[0].node.coverImage.title}
                className={indexStyles.topFeatureImage}>
              </Img>
            </Link>
            <Link to={`features/${props.data.allContentfulFeature.edges[0].node.slug}`} className={indexStyles.topFeatureTitleLink}>
              {/*
                {props.data.allContentfulFeature.edges[0].node.artist[0].englishName.length > 11 ? topFeatureTitleLong : topFeatureTitleShort}
              */}
              <h1 className={indexStyles.topFeatureTitleLong}>Best Albums of 2020</h1>
            </Link>
            <div className={indexStyles.topFeatureText}>
              <div className={indexStyles.topFeatureDetails}>
                <p className={indexStyles.topFeatureSubtitle}>{documentToReactComponents(props.data.allContentfulFeature.edges[0].node.subtitle.json)}</p>
                <div class={indexStyles.topFeatureInfo}>
                  <div class={indexStyles.topFeatureMeta}>
                    <p class={indexStyles.topFeatureAuthor}>By: <Link to={`/author/${props.data.allContentfulFeature.edges[0].node.author[0].slug}`}>{props.data.allContentfulFeature.edges[0].node.author[0].englishName}</Link></p>
                    <p class={indexStyles.topFeatureDate}>{props.data.allContentfulFeature.edges[0].node.publishedDate}</p>
                  </div>
                  <Link to={`features/${props.data.allContentfulFeature.edges[0].node.category.name.toLowerCase()}`}  className={indexStyles.topFeatureCategory}>
                    <p>{props.data.allContentfulFeature.edges[0].node.category.name}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={indexStyles.responsiveTopFeature}>
            <div class={indexStyles.responsiveTopFeature}>
              <Link to={`features/${props.data.allContentfulFeature.edges[0].node.slug}`}>
                <div class={indexStyles.responsiveTopFeatureImg}
                  style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.0), 65%, rgba(0,0,0,0.9)), url(${props.data.allContentfulFeature.edges[0].node.coverImage.file.url})`} }>
                  <div class={indexStyles.responsiveTopFeatureDetails}>
                    <h2 class={indexStyles.responsiveTopFeatureTitle}>{props.data.allContentfulFeature.edges[0].node.title}</h2>
                    <p className={indexStyles.responsiveTopFeatureSubtitle}>{documentToReactComponents(props.data.allContentfulFeature.edges[0].node.subtitle.json)}</p>
                    <p class={indexStyles.responsiveTopFeatureAuthor}>By: {props.data.allContentfulFeature.edges[0].node.author[0].englishName}</p>
                    <p class={indexStyles.responsiveTopFeatureDate}>{props.data.allContentfulFeature.edges[0].node.publishedDate}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.guidesSection}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Guides</h2>
          </div>
          <div className={guidesStyles.guides}>
            {props.data.allContentfulGuide.edges.map((edge) => {
              return (
                <div className={guidesStyles.guide}>
              <Link to={`guides/${edge.node.slug}`}>
                <div className={guidesStyles.image} style={{backgroundImage: `radial-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0)), url(${edge.node.coverImage.file.url})`}}>
                  <div className={guidesStyles.title}>
                    <h1>{edge.node.subject}</h1>
                  </div>
                </div>
              </Link>
            </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/guides">View All Guides</Link>
          </div>
        </div>
      </section>

      <section className={indexStyles.patreonAndLatestNews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.patreonAndLatestNewsContent}>
            <a href="https://www.patreon.com/theglowjp" className={indexStyles.patreon} target="_blank" rel="noreferrer">
              <img src={patreon} className={indexStyles.patreonImage} alt="Support us on Patreon!" />
            </a>

            <div className={indexStyles.latestNews}>
              <div className={indexStyles.sectionTitle}>
                <h2>Latest News</h2>
              </div>
              <div className={indexStyles.newsList}>
                {props.data.allContentfulNews.edges.map((edge) => {
                  return (
                    <Link to={`news/${edge.node.slug}`}>
                      <div className={indexStyles.newsItem}>
                        <img src={edge.node.coverImage.file.url} alt={edge.node.coverImage.title} className={indexStyles.albumCover} />
                        <div className={indexStyles.newsDetails}>
                          <h2>{edge.node.title}</h2>
                          <p>{edge.node.publishedDate}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className={indexStyles.sectionLink}>
                <Link to="/news">View All News</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.featuresSection}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Features</h2>
          </div>
          <div className={indexStyles.features}>
            {props.data.allContentfulFeature.edges.slice(1,4).map((edge) => {
              const authors = edge.node.author;
              let authorTags = []
              for (let i = 0; i < authors.length; i++) {
                if(i === authors.length -1){
                  authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
                } else {
                  authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
                }
              }

              return (
                <div className={indexStyles.feature}>
                  <Link to={`features/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.coverImage.fluid}
                      key={edge.node.coverImage.fluid.src}
                      alt={edge.node.coverImage.title}
                      className={indexStyles.featureImage}>
                    </Img>
                  </Link>
                  <div class={indexStyles.featureDetails}>
                    <Link to={`features/${edge.node.slug}`}>
                      <h3 class={indexStyles.featureTitle}>{edge.node.title}</h3>
                    </Link>
                    <div class={newsStyles.remainingInfo}>
                      <div class={newsStyles.remainingMeta}>
                        <p class={newsStyles.remainingAuthor}>By: { authorTags }</p>
                        <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                      </div>
                      <Link to={`features/${edge.node.category.name.toLowerCase()}`} className={newsStyles.remainingCategory}>
                        <p>{edge.node.category.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.lessFeatures}>
            {props.data.allContentfulFeature.edges.slice(1, 4).map((edge) => {
              const authors = edge.node.author;
              let authorTags = []
              for (let i = 0; i < authors.length; i++) {
                if(i === authors.length -1){
                  authorTags.push(<span>{authors[i].englishName}</span>)
                } else {
                  authorTags.push(<span>{authors[i].englishName} & </span>)
                }
              }

              return (
                <div className={indexStyles.feature}>
                  <Link to={`features/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.coverImage.fluid}
                      key={edge.node.coverImage.fluid.src}
                      alt={edge.node.coverImage.title}
                      className={indexStyles.featureImage}>
                    </Img>
                  </Link>
                  <div class={indexStyles.featureDetails}>
                    <Link to={`features/${edge.node.slug}`}>
                      <h3 class={indexStyles.featureTitle}>{edge.node.title}</h3>
                    </Link>
                    <div class={newsStyles.remainingInfo}>
                      <div class={newsStyles.remainingMeta}>
                        <p class={newsStyles.remainingAuthor}>By: { authorTags }</p>
                        <p class={newsStyles.remainingDate}>{edge.node.publishedDate}</p>
                      </div>
                      <Link to={`features/${edge.node.category.name.toLowerCase()}`} className={newsStyles.remainingCategory}>
                        <p>{edge.node.category.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/features">View All Features</Link>
          </div>
        </div>
      </section>

      <section className={indexStyles.thePlaylistSection}>
        <div className={indexStyles.playlistContainer}>
          <div className={indexStyles.thePlaylistTitle}>
            <h2>The Playlist</h2>
            {/*<p>swipe →</p>*/}
          </div>
          <div className={indexStyles.playlistsScroll}>
            <div className={indexStyles.playlists}>
              {props.data.thePlaylist.edges.map((edge) => {
                return (
                  <div className={indexStyles.playlist}>
                    <Link to={`features/${edge.node.slug}`}>
                      <Img
                        fluid={edge.node.coverImage.fluid}
                        key={edge.node.coverImage.fluid.src}
                        alt={edge.node.coverImage.title}
                        className={indexStyles.playlistImage}>
                      </Img>
                    </Link>
                    <div className={indexStyles.playlistDetails}>
                      <Link to={`features/${edge.node.slug}`}>
                        <h2 className={indexStyles.playlistArtist}>{edge.node.artist[0].englishName}</h2>
                      </Link>
                      <p className={indexStyles.playlistSubtitle}>{documentToReactComponents(edge.node.subtitle.json)}</p>
                      <p className={indexStyles.playlistDate}>{edge.node.publishedDate}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={indexStyles.reviews}>
        <div className={indexStyles.container}>
          <div className={indexStyles.sectionTitle}>
            <h2>Reviews</h2>
          </div>
          <div className={indexStyles.albums}>
            {props.data.allContentfulReview.edges.map((edge) => {
              return (
                <div className={reviewsStyles.album}>
                  <Link to={`reviews/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.albumCover.fluid}
                      key={edge.node.albumCover.fluid.src}
                      alt={edge.node.albumCover.title}
                      className={reviewsStyles.albumCover}>
                    </Img>
                    <h2 className={reviewsStyles.artistName}>{edge.node.artist[0].englishName}</h2>
                    <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                    <p class={reviewsStyles.publishedDate}>{edge.node.publishedDate}</p>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.lessAlbums}>
            {props.data.allContentfulReview.edges.slice(0,6).map((edge) => {
              return (
                <div className={reviewsStyles.album}>
                  <Link to={`reviews/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.albumCover.fluid}
                      key={edge.node.albumCover.fluid.src}
                      alt={edge.node.albumCover.title}
                      className={reviewsStyles.albumCover}>
                    </Img>
                    <h2 className={reviewsStyles.artistName}>{edge.node.artist[0].englishName}</h2>
                    <h2 className={reviewsStyles.albumTitle}>{edge.node.albumTitle}</h2>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className={indexStyles.sectionLink}>
            <Link to="/reviews">View All Reviews</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
        siteUrl
      }
    }
    allContentfulSiteMetadata (limit: 1) {
      edges {
        node {
          image {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulReview ( sort: { fields:publishedDate, order:DESC }, filter:{ albumTitle:{ ne: "Meshi Kuuna!" } } limit: 12 ) {
      edges {
        node {
          albumTitle
          slug
          artist {
            englishName
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
          publishedDate (formatString:"MMMM Do YYYY")
        }
      }
    }
    allContentfulNews ( sort: { fields:publishedDate, order:DESC }, limit: 5 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          publishedDate (formatString:"MMMM Do YYYY")
          coverImage {
            title
            file {
              url
            }
          }
        }
      }
    }
    allContentfulFeature ( sort: { fields: publishedDate, order:DESC }, filter: { subcategory:{ name: { ne: "The Playlist" } } } limit: 6 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          category {
            name
          }
          publishedDate (formatString:"MMMM Do YYYY")
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          artist {
            englishName
          }
          author {
            englishName
            slug
          }
        }
      }
    }
    allContentfulGuide ( sort: { fields:publishedDate, order:DESC }, limit: 3 ) {
      edges {
        node {
          title
          subject
          slug
          publishedDate(formatString:"MMMM Do YYYY")
          coverImage {
            file {
              url
            }
            title
          }
          author {
            englishName
          }
        }
      }
    }
    firstInterview : allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { category:{ name: { eq: "Interviews" } } }, limit: 1 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          slug
          category {
            name
          }
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          artist {
            englishName
            japaneseName
          }
          author {
            englishName
            slug
          }
          publishedDate(formatString:"MMMM Do YYYY")
        }
      }
    }
    thePlaylist: allContentfulFeature ( sort: { fields:publishedDate, order:DESC }, filter: { subcategory:{ name: { eq: "The Playlist" } } }, limit: 4 ) {
      edges {
        node {
          title
          subtitle {
            json
          }
          artist {
            englishName
            japaneseName
          }
          slug
          category {
            name
          }
          coverImage {
            title
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          publishedDate (formatString:"MMMM Do YYYY")
        }
      }
    }
  }
`

export default IndexPage
