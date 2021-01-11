import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';

import './styles.scss';
import searchStyles from './../search/search.module.scss';
import SearchComp from './../search/searchComp';

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          twitterUsername
          facebookUsername
          instagramUsername
        }
      }
    }
  `)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  let mobileNav

  if(mobileNavOpen) {
    mobileNav =
      <div className="overlay">
        <div className="mobileNav">
          <GrClose className="close" onClick={ () => setMobileNavOpen(!mobileNavOpen) } />
          <ul className="mobileNavList">
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
          <ul className="mobileSocialList">
            <li>
              <a href={`https://www.instagram.com/${data.site.siteMetadata.facebookUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
            </li>
            <li>
              <a href={`https://www.facebook.com/${data.site.siteMetadata.facebookUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
            </li>
            <li>
              <a href={`https://twitter.com/${data.site.siteMetadata.twitterUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
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
    <header className="header">
      { search }
      <div className="navTop">
        <div className="search">
          <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
        </div>
        <Link to="/" className="mobileTitle">{data.site.siteMetadata.siteTitle}</Link>
        <div className="mobileIcons">
          <div className="mobileSearch">
            <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
          </div>
          <div className="checkButton">
            <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
          </div>
        </div>
        <ul className="socialList">
          <li>
            <a href={`https://www.instagram.com/${data.site.siteMetadata.facebookUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
          </li>
          <li>
            <a href={`https://www.facebook.com/${data.site.siteMetadata.facebookUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
          </li>
          <li>
            <a href={`https://twitter.com/${data.site.siteMetadata.twitterUsername}/`} target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
          </li>
        </ul>
        <Link to="/" className="title">{data.site.siteMetadata.siteTitle}</Link>
      </div>
      <div>
        <ul className="navList">
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
      </div>
      { mobileNav }
    </header>
  )
}

export default Header
