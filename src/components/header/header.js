import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaBars, FaSearch } from 'react-icons/fa'

import headerStyles from './header.module.scss'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  let mobileNav

  if(mobileNavOpen) {
    mobileNav = <div className={headerStyles.mobileNav}>
      <ul className={headerStyles.mobileNavList}>
        <li>
          <Link className={headerStyles.mobileNavItem} to="/news">News</Link>
        </li>
        <li>
          <Link className={headerStyles.mobileNavItem} to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link className={headerStyles.mobileNavItem} to="/features">Features</Link>
        </li>
        <li>
          <Link className={headerStyles.mobileNavItem} to="/guides">Guides</Link>
        </li>
      </ul>
      <ul className={headerStyles.mobileSocialList}>
        <li>
          <a className={headerStyles.mobileSocialItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
        </li>
        <li>
          <a className={headerStyles.mobileSocialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
        </li>
        <li>
          <a className={headerStyles.mobileSocialItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
        </li>
      </ul>
    </div>
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.navTop}>
        <p className={headerStyles.search}><FaSearch /></p>
        <Link to="/" className={headerStyles.title}>{data.site.siteMetadata.title}</Link>
        <div className={headerStyles.checkButton}>
          <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
        </div>
        <ul className={headerStyles.socialList}>
          <li>
            <a className={headerStyles.mobileSocialItem} href="https://www.instagram.com/theglow.jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
          </li>
          <li>
            <a className={headerStyles.mobileSocialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
          </li>
          <li>
            <a className={headerStyles.mobileSocialItem} href="https://twitter.com/theglow_jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
          </li>
        </ul>
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
