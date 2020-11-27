import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa'
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import headerStyles from './header.module.scss'
import searchStyles from './search.module.scss'
import SearchComp from '../search/searchComp'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
        }
      }
    }
  `)

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
    <header className={headerStyles.header}>
      { search }
      <div className={headerStyles.navTop}>
        <div className={headerStyles.search}>
          <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
        </div>
        <Link to="/" className={headerStyles.mobileTitle}>{data.site.siteMetadata.title}</Link>
        <div className={headerStyles.mobileIcons}>
          <div className={headerStyles.mobileSearch}>
            <FiSearch onClick={ () => setSearchOpen(!searchOpen) } role="button" href="#" />
          </div>
          <div className={headerStyles.checkButton}>
            <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
          </div>
        </div>
        <ul className={headerStyles.socialList}>
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
        <Link to="/" className={headerStyles.title}>{data.site.siteMetadata.title}</Link>
      </div>
      <div>
        <ul className={headerStyles.navList}>
          <li>
            <Link className={headerStyles.navItem} to="/news">News</Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/features">Features</Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/guides">Guides</Link>
          </li>
        </ul>
      </div>
      { mobileNav }
    </header>
  )
}

export default Header
