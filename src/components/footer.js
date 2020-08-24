import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

import footerStyles from './footer.module.scss'

const Footer = () => {
  return (
    <div>
      <div className={footerStyles.logos}>
        <div className={footerStyles.logo}></div>
        <div className={footerStyles.logo}></div>
        <ul className={footerStyles.socialList}>
          <li>
            <a className={footerStyles.socialItem} href="https://www.instagram.com/"><FaInstagram /></a>
          </li>
          <li>
            <a className={footerStyles.socialItem} href="https://www.twitter.com/"><FaFacebookF /></a>
          </li>
          <li>
            <a className={footerStyles.socialItem} href="https://www.facebook.com/"><FaTwitter /></a>
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
