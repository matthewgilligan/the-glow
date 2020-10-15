import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaSpotify, FaApple } from 'react-icons/fa';

import footerStyles from './footer.module.scss'
import logo from "../../images/red_logo_text_medium.png"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.top}>
        <div className={footerStyles.copyright}>
          <p>© 2020 The Glow JP Ltd.</p>
          <p>All rights reserved. <Link className={footerStyles.copyrightLinks} to="/privacy-policy">Privacy Policy</Link> | <Link className={footerStyles.copyrightLinks} to="/terms-of-service">Terms of Service</Link></p>
        </div>
        <img src={logo} className={footerStyles.logo} alt="Logo" />
        <ul className={footerStyles.socialList}>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
          </li>
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
          </li>
          <li>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
          </li>
        </ul>
      </div>
        <ul className={footerStyles.socialMobileList}>
          <li>
            <a className={footerStyles.mobileSocialItem} href="https://www.instagram.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
          </li>
          <li>
            <a className={footerStyles.mobileSocialItem} href="https://www.facebook.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
          </li>
          <li>
            <a className={footerStyles.mobileSocialItem} href="https://www.twitter.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
          </li>
        </ul>
        <ul className={footerStyles.socialMobileList}>
          <li>
            <a className={footerStyles.socialMobileItem} href="https://www.spotify.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>
          </li>
          <li>
            <a className={footerStyles.socialMobileItem} href="https://www.apple.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaApple/></a>
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
            <Link className={footerStyles.footerItem} to="/ad">Advertise</Link>
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
