import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa'
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import Head from "../../components/head/head"
import SEO from "../../components/seo/seo"
import RichTextRenderer from "../../components/rich-text-renderer/rich-text-renderer"
import Footer from "../../components/footer/footer"
import articleDetailsStyles from "../../components/article-details/article-details.module.scss"
import featureStyles from "./feature.module.scss"
import SearchComp from '../../components/search/searchComp'
import headerStyles from "../../components/header/header.module.scss"
import searchStyles from "../../components/header/search.module.scss"

const Feature = (props) => {
  const featureContent = props.data.contentfulFeature

  const artists = featureContent.artist;
  let artistTags = []
  for (let i = 0; i < artists.length; i++) {
    if(i === artists.length -1){
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}</Link>)
    } else {
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}, </Link>)
    }
  }

  const authors = featureContent.author;
  let authorTags = []
  for (let i = 0; i < authors.length; i++) {
    if(i === authors.length -1){
      authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
    } else {
      authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
    }
  }

  const coverImage = featureContent.coverImage.file.url
  const coverImageMobile = featureContent.coverImageMobile ? featureContent.coverImageMobile.file.url : ""

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  let mobileNav

  if(mobileNavOpen) {
    mobileNav =
      <div className={headerStyles.overlay}>
        <div className={headerStyles.mobileNav}>
          <GrClose className={headerStyles.close} onClick={ () => setMobileNavOpen(!mobileNavOpen) } />
          <ul className={headerStyles.mobileNavList}>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>
              <Link to="/guides">Guides</Link>
            </li>
          </ul>
          <ul className={headerStyles.mobileSocialList}>
            <li>
              <a className={headerStyles.mobileSocialItem} href="https://www.instagram.com/theglow.jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
            </li>
            <li>
              <a className={headerStyles.mobileSocialItem} href="https://www.facebook.com/theglow.jp" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
            </li>
            <li>
              <a className={headerStyles.mobileSocialItem} href="https://twitter.com/theglow_jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
            </li>
          </ul>
        </div>
      </div>
  }

  const shareBlockProps = {
    url: `${props.data.site.siteMetadata.siteUrl}/features/${featureContent.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: `${featureContent.title}`,
  };

  const [searchOpen, setSearchOpen] = useState(false)
  let search

  if(searchOpen) {
    search = <div className={searchStyles.overlay}>
      <div className={searchStyles.modal}>
        <GrClose className={searchStyles.close} onClick={ () => setSearchOpen(!searchOpen) } />
        <div className={searchStyles.content}>
          <div className={searchStyles.algolia}>
            <div>
              <SearchComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <Head title={`${featureContent.title} | The Glow`}/>
      { search }
      <SEO
        title={featureContent.title}
        description={featureContent.description}
        cover={featureContent.coverImage.file.url}
        imageShare={featureContent.coverImage.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`features/${featureContent.slug}`}
        isBlogPost
      />
      <div
      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${featureContent.coverImage.file.url})`} }
      className={featureStyles.banner}>
        <div className={featureStyles.container}>
          <div className={featureStyles.content}>
            <div  className={featureStyles.titleDiv}>
              <h1 className={featureStyles.title} id="demo">
                <Link to="/" style={{color: featureContent.navColor}}>The Glow</Link>
              </h1>
            </div>
            <div className={featureStyles.navIcons}>
              <div className={featureStyles.search} style={{color: featureContent.navColor}}>
                <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
              </div>
              <div className={featureStyles.largeCheckButton} style={{color: featureContent.navColor}}>
                <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
              </div>
            </div>
            <div className={featureStyles.featureTitle}>
              <h1>{featureContent.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div
      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${featureContent.coverImageMobile ? coverImageMobile : coverImage})`} }
      className={featureStyles.mobileBanner}>
        <div className={featureStyles.container}>
          <div className={featureStyles.content}>
            <div  className={featureStyles.titleDiv}>
              <h1 className={featureStyles.title} id="demo">
                <Link to="/" style={{color: featureContent.navColor}}>The Glow</Link>
              </h1>
            </div>
            <div className={featureStyles.mobileNav}>
              <Link to="/" className={featureStyles.mobileTitle}>The Glow</Link>
              <div className={featureStyles.mobileIcons}>
                <div className={featureStyles.mobileSearch}>
                  <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
                </div>
                <div className={featureStyles.checkButton}>
                  <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
                </div>
              </div>
            </div>
            <div className={featureStyles.featureTitle}>
              <h1>{featureContent.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={featureStyles.container}>
        <p className={featureStyles.credit}>{featureContent.coverImage.description}</p>
        <div className={featureStyles.content}>
          <div className={featureStyles.featureContent}>
            <div className={articleDetailsStyles.metaDetails}>
              <p>By: { authorTags }</p>
              <p className={articleDetailsStyles.date}>{featureContent.publishedDate}</p>
              <div className={articleDetailsStyles.genreAndSocials}>
                <p className={articleDetailsStyles.genre}>{featureContent.subcategory.name}</p>
                <ShareBlockStandard {...shareBlockProps} />
              </div>
            </div>
            <div className={articleDetailsStyles.mobileMetaDetails}>
              <div className={articleDetailsStyles.genreAndSocials}>
                <p className={articleDetailsStyles.mobileAuthor}>By: { authorTags }</p>
                <p className={articleDetailsStyles.genre}>{featureContent.subcategory.name}</p>
              </div>
              <p className={articleDetailsStyles.date}>{featureContent.publishedDate}</p>
            </div>
            <div className={featureStyles.body}>
              <RichTextRenderer subtitle={featureContent.subtitle.json} body={featureContent.body.json}/>
              <p className={featureStyles.artistTags}>Tags: { artistTags }</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      { mobileNav }
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
    contentfulFeature (slug: { eq: $slug }) {
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
      description
      subcategory {
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
        description
      }
      coverImageMobile {
        file {
          url
        }
      }
      navColor
    }
  }
`

export default Feature
