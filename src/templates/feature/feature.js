import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa'
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import Head from "../../components/head/head"
import SEO from "../../components/seo/seo"
import Footer from "../../components/footer/footer"
import articleDetailsStyles from "../../components/article-details/article-details.module.scss"
import featureStyles from "./feature.module.scss"
import SearchComp from '../../components/search/searchComp'
import headerStyles from "../../components/header/header.module.scss"
import searchStyles from "../../components/header/search.module.scss"

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
        twitter
        bio
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
        description
      }
    }
  }
`

const Feature = (props) => {
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
            <iframe classname={featureStyles.youtube} width="100%" height="321" src={node.data.uri} frameborder="0" title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          )
        } else {
          return <a href={node.data.uri} target={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '' : 'noopener noreferrer'}`}>{node.content[0].value}</a>;
        }
      }
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
  }

  const artists = props.data.contentfulFeature.artist;
  let artistTags = []
  for (let i = 0; i < artists.length; i++) {
    if(i === artists.length -1){
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}</Link>)
    } else {
      artistTags.push(<Link to={`/artist/${artists[i].slug}`}>{artists[i].englishName}, </Link>)
    }
  }

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
    url: `${props.data.site.siteMetadata.siteUrl}/features/${props.data.contentfulFeature.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: `${props.data.contentfulFeature.title}`,
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
      <Head title={`${props.data.contentfulFeature.title} | The Glow`}/>
      { search }
      <SEO
        title={props.data.contentfulFeature.title}
        description={props.data.contentfulFeature.description}
        cover={props.data.contentfulFeature.coverImage.file.url}
        imageShare={props.data.contentfulFeature.coverImage.file.url}
        lang={props.data.site.siteMetadata.siteLang}
        path={`features/${props.data.contentfulFeature.slug}`}
        isBlogPost
      />
      <div
      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${props.data.contentfulFeature.coverImage.file.url})`} }
      className={featureStyles.banner}>
        <div className={featureStyles.container}>
          <div className={featureStyles.content}>
            <div  className={featureStyles.titleDiv}>
              <h1 className={featureStyles.title} id="demo">
                <Link to="/">The Glow</Link>
              </h1>
            </div>
            <div className={featureStyles.navIcons}>
              <div className={featureStyles.search}>
                <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
              </div>
              <div className={featureStyles.largeCheckButton}>
                <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
              </div>
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
              <h1>{props.data.contentfulFeature.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={featureStyles.container}>
        <p className={featureStyles.credit}>{props.data.contentfulFeature.coverImage.description}</p>
        <div className={featureStyles.content}>
          <div className={featureStyles.featureContent}>
            <div className={articleDetailsStyles.metaDetails}>
              <p>By: <Link to={`../../author/${props.data.contentfulFeature.author[0].slug}`}>{props.data.contentfulFeature.author[0].englishName}</Link></p>
              <p className={articleDetailsStyles.date}>{props.data.contentfulFeature.publishedDate}</p>
              <div className={articleDetailsStyles.genreAndSocials}>
                <p className={articleDetailsStyles.genre}>{props.data.contentfulFeature.subcategory.name}</p>
                <ShareBlockStandard {...shareBlockProps} />
              </div>
            </div>
            <div className={articleDetailsStyles.mobileMetaDetails}>
              <div className={articleDetailsStyles.genreAndSocials}>
                <p>By: <Link to={`../../author/${props.data.contentfulFeature.author[0].slug}`}>{props.data.contentfulFeature.author[0].englishName}</Link></p>
                <p className={articleDetailsStyles.genre}>{props.data.contentfulFeature.subcategory.name}</p>
              </div>
              <p className={articleDetailsStyles.date}>{props.data.contentfulFeature.publishedDate}</p>
            </div>
            <div className={featureStyles.body}>
              <p className={featureStyles.subtitle}>{documentToReactComponents(props.data.contentfulFeature.subtitle.json, options)}</p>
              {documentToReactComponents(props.data.contentfulFeature.body.json, options)}
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

export default Feature
