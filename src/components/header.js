import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

import headerStyles from './header.module.scss'

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.navTop}>
        <h3>Search</h3>
        <h1>
          <Link className={headerStyles.title} to="/">The Glow</Link>
        </h1>
        <ul className={headerStyles.socialList}>
          <li>
            <a className={headerStyles.socialItem} href="https://www.instagram.com/"><FaInstagram /></a>
          </li>
          <li>
            <a className={headerStyles.socialItem} href="https://www.twitter.com/"><FaFacebookF /></a>
          </li>
          <li>
            <a className={headerStyles.socialItem} href="https://www.facebook.com/"><FaTwitter /></a>
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
    </header>
  )
}

export default Header
