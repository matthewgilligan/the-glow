import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter, FaSpotify, FaApple } from 'react-icons/fa';

import Mailchimp from "../../components/mailchimp/mailchimp"
import footerStyles from './footer.module.scss'
import logo from "../../images/white-glow.png"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        {/*
        <div className={footerStyles.mailchimp}>
          <div className={footerStyles.form}>
            <Mailchimp />
          </div>
        </div>
        */}
        <div className={footerStyles.content}>
          <div className={footerStyles.copyright}>
            <Link to="/" >
              <img src={logo} alt="Logo" className={footerStyles.logo}/>
            </Link>
            <p>© 2020 The Glow JP Ltd.</p>
            <p>All rights reserved. <Link className={footerStyles.copyrightLinks} to="/privacy-policy">Privacy Policy</Link></p>
          </div>
          <div className={footerStyles.pages}>
            <ul>
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
          </div>
          <div className={footerStyles.pages}>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/ad">Advertise</Link>
              </li>
              <li>
                <a href="https://www.patreon.com/theglowjp" target="_blank">Support Us</a>
              </li>
            </ul>
          </div>
          <div className={footerStyles.socials}>
            <ul>
              <li>
                <a href="https://www.instagram.com/theglow.jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
              </li>
              <li>
                <a href="https://www.facebook.com/theglow.jp" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
              </li>
              <li>
                <a href="https://twitter.com/theglow_jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
              </li>
              <li>
                <a className={footerStyles.socialMobileItem} href="https://open.spotify.com/user/ji21784pk94jfyv4u9w01xkhe?si=ZOykmTClStyjbTpG9XmPGg" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>
              </li>
              <li>
                <a className={footerStyles.socialMobileItem} href="https://itunes.apple.com/profile/theglow_jp" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaApple/></a>
              </li>
            </ul>
          </div>
          <div className={footerStyles.mobileCopyright}>
            <Link to="/" >
              <img src={logo} alt="Logo" className={footerStyles.logo}/>
            </Link>
            <p>© 2020 The Glow JP Ltd.</p>
            <p>All rights reserved.</p>
            <p><Link className={footerStyles.copyrightLinks} to="/privacy-policy">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


{/*<ul className={footerStyles.socialMobileList}>
            <li>
              <a className={footerStyles.mobileSocialItem} href="https://www.instagram.com/theglow.jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaInstagram/></a>
            </li>
            <li>
              <a className={footerStyles.mobileSocialItem} href="https://www.facebook.com/theglow.jp" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaFacebookF/></a>
            </li>
            <li>
              <a className={footerStyles.mobileSocialItem} href="https://twitter.com/theglow_jp/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaTwitter/></a>
            </li>
          </ul>
          <ul className={footerStyles.socialMobileList}>
            <li>
              <a className={footerStyles.socialMobileItem} href="https://www.spotify.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>
            </li>
            <li>
              <a className={footerStyles.socialMobileItem} href="https://www.apple.com/" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaApple/></a>
            </li>
          </ul>*/}
