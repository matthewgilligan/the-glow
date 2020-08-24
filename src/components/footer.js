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
            <a className={footerStyles.socialItem} href="https://www.spotify.com/" target="_blank"><FaSpotify /></a>
          </li>
          <li>
            <a className={footerStyles.socialItem} href="https://www.apple.com/" target="_blank"><FaApple /></a>
          </li>
        </ul>
        <img src={logo} className={footerStyles.logo} alt="Logo" />
        <ul className={footerStyles.socialList}>
          <li>
            <a className={footerStyles.socialItem} href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>
          </li>
          <li>
            <a className={footerStyles.socialItem} href="https://www.twitter.com/" target="_blank"><FaFacebookF /></a>
          </li>
          <li>
            <a className={footerStyles.socialItem} href="https://www.facebook.com/" target="_blank"><FaTwitter /></a>
          </li>
        </ul>
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default Footer
