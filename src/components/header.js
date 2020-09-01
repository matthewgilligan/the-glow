import React, { useState } from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaBars } from 'react-icons/fa';

import headerStyles from './header.module.scss'

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.navTop}>
        <h3>Search</h3>
        <h1>
          <Link className={headerStyles.title} to="/">The Glow</Link>
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
      <div className={ mobileNavOpen ? 'active' : '' }>
        <div className={headerStyles.mobileNav}>
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
       </div>
    </header>
  )
}

export default Header
