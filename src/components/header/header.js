import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa'

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
          <FaInstagram className={headerStyles.mobileSocialItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer"/>
        </li>
        <li>
          <FaFacebookF className={headerStyles.mobileSocialItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer"/>
        </li>
        <li>
          <FaTwitter className={headerStyles.mobileSocialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer"/>
        </li>
      </ul>
    </div>
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.navTop}>
        <h3 className={headerStyles.search}>Search</h3>
        <h1>
          <Link className={headerStyles.title} to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <div className={headerStyles.checkButton}>
          <FaBars onClick={ () => setMobileNavOpen(!mobileNavOpen) } role="button" href="#"/>
        </div>
        <ul className={headerStyles.socialList}>
          <li>
            <FaInstagram className={headerStyles.socialItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaFacebookF className={headerStyles.socialItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaTwitter className={headerStyles.socialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer"/>
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
