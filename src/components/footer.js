import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaSpotify, FaApple } from 'react-icons/fa';

import footerStyles from './footer.module.scss'
import logo from "../images/red_logo_text_medium.png"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.logos}>
        <div className={footerStyles.copyright}>
          <p>© 2020 The Glow JP Ltd. All rights reserved.</p>
          <Link className={footerStyles.copyrightLinks} to="/privacy-policy">Privacy Policy</Link> | <Link className={footerStyles.copyrightLinks} to="/terms-of-service">Terms of Service</Link>
        </div>
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
        <ul className={footerStyles.socialMobileList}>
          <li>
            <FaInstagram className={footerStyles.socialMobileItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaFacebookF className={footerStyles.socialMobileItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaTwitter className={footerStyles.socialMobileItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer"/>
          </li>
        </ul>
        <ul className={footerStyles.socialMobileList}>
          <li>
            <FaSpotify className={footerStyles.socialMobileItem} href="https://www.spotify.com/" target="_blank" rel="noreferrer"/>
          </li>
          <li>
            <FaApple className={footerStyles.socialMobileItem} href="https://www.apple.com/" target="_blank" rel="noreferrer"/>
          </li>
        </ul>
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
            <Link className={footerStyles.footerItem} to="#">Support Us</Link>
          </li>
          <li>
            <Link className={footerStyles.footerItem} to="/contact">Contact</Link>
          </li>
        </ul>
        <div className={footerStyles.copyrightMobile}>
          <p>© 2020 The Glow JP Ltd. All rights reserved.</p>
          <Link className={footerStyles.copyrightMobileLinks} to="/privacy-policy">Privacy Policy</Link> | <Link className={footerStyles.copyrightMobileLinks} to="/terms-of-service">Terms of Service</Link>
        </div>
    </footer>
  )
}

export default Footer
