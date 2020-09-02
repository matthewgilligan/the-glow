import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaSpotify, FaApple } from 'react-icons/fa';

import footerStyles from './footer.module.scss'
import logo from "../images/red_logo_text_medium.png"

const Footer = () => {
  return (
    <div>
      <div className={footerStyles.logos}>
        <ul className={footerStyles.socialList}>
          <li>
            <FaSpotify className={footerStyles.socialItem} href="https://www.spotify.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaApple className={footerStyles.socialItem} href="https://www.apple.com/" target="_blank" rel="noreferrer"/>
          </li>
        </ul>
        <img src={logo} className={footerStyles.logo} alt="Logo" />
        <ul className={footerStyles.socialList}>
          <li>
            <FaInstagram className={footerStyles.socialItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaFacebookF className={footerStyles.socialItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaTwitter className={footerStyles.socialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer"/>
          </li>
        </ul>
      </div>
        <ul className={footerStyles.footerList}>
          <li>
            <Link className={footerStyles.footerItem} to="/about">About Us</Link>
          </li>
          <li>
            <Link className={footerStyles.footerItem} to="/contribute">Contribute</Link>
          </li>
          <li>
            <Link className={footerStyles.footerItem} to="/advertise">Advertise</Link>
          </li>
          <li>
            <Link className={footerStyles.footerItem} to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link className={footerStyles.footerItem} to="/terms-of-service">Terms of Service</Link>
          </li>
        </ul>
        <p className={footerStyles.copyright}>© 2020 The Glow JP Ltd. All rights reserved.</p>
    </div>
  )
}

export default Footer
