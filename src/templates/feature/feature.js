import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa'
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import Head from "../../components/head/head"
import Footer from "../../components/footer/footer"
import featureStyles from "./feature.module.scss"
import SearchComp from '../../components/search/searchComp'
import headerStyles from "../../components/header/header.module.scss"
import searchStyles from "../../components/header/search.module.scss"

export const query = graphql`
  query($slug: String!){
    contentfulFeature (slug: { eq: $slug }) {
      title
      slug
      author {
        englishName
        twitter
        bio
        slug
      }
      publishedDate(formatString:"MMMM D YYYY")
      category {
        name
      }
      subcategory {
        name
      }
      subtitle
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
      }
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
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
            <div className={featureStyles.details}>
              <h1 className={featureStyles.featureTitle}>{props.data.contentfulFeature.title}</h1>
              <p className={featureStyles.featureAuthor}>By: {props.data.contentfulFeature.author.englishName}</p>
              <p>{props.data.contentfulFeature.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={featureStyles.container}>
        <div className={featureStyles.content}>
          <div className={featureStyles.featureContent}>
            <div className={featureStyles.authorDetails}>
              <Link to={`../../author/${props.data.contentfulFeature.author.slug}`}>
                <p>By: {props.data.contentfulFeature.author.englishName}</p>
              </Link>
              <p className={featureStyles.date}>{props.data.contentfulFeature.publishedDate}</p>
              <p className={featureStyles.genre}>{props.data.contentfulFeature.subcategory.name}</p>
            </div>
            <div className={featureStyles.body}>
              <p className={featureStyles.subtitle}>{props.data.contentfulFeature.subtitle}</p>
              {documentToReactComponents(props.data.contentfulFeature.body.json, options)}
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
