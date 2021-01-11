import React from 'react';
import { Link } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import { FaFacebookF, FaInstagram, FaTwitter, FaSpotify, FaApple } from 'react-icons/fa';

import logo from '../../images/white-glow.png';
import './styles.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <CookieConsent
          location="bottom"
          buttonText="Accept"
          declineButtonText="Decline"
          style={{
            background: "#E7334D",
          }}
          buttonStyle={{
            background: "black",
            color: "white",
          }}
          cookieName="gatsby-gdpr-google-analytics">
        This website uses cookies to ensure you get the best experience on our website. <Link className="copyrightLinks" to="/privacy-policy">Learn More</Link>
      </CookieConsent>

      <div className="container">
        <div className="content">
          <div className="copyright">
            <Link to="/" >
              <img src={logo} alt="Logo" className="logo"/>
            </Link>
            <p>© 2020 The Glow JP Ltd.</p>
            <p>All rights reserved. <Link className="copyrightLinks" to="/privacy-policy">Privacy Policy</Link></p>
          </div>
          <div className="pageLinks">
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
          <div className="pageLinks">
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/ad">Advertise</Link>
              </li>
              <li>
                <a href="https://www.patreon.com/theglowjp" target="_blank" rel="noreferrer">Support Us</a>
              </li>
            </ul>
          </div>
          <div className="socialLinks">
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
                <a className="socialMobileItem" href="https://open.spotify.com/user/ji21784pk94jfyv4u9w01xkhe?si=ZOykmTClStyjbTpG9XmPGg" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaSpotify/></a>
              </li>
              <li>
                <a className="socialMobileItem" href="https://itunes.apple.com/profile/theglow_jp" target="_blank" rel="noreferrer" role="button" aria-label="Mute volume"><FaApple/></a>
              </li>
            </ul>
          </div>
          <div className="mobileCopyright">
            <Link to="/" >
              <img src={logo} alt="Logo" className="logo"/>
            </Link>
            <p>© 2020 The Glow JP Ltd.</p>
            <p>All rights reserved.</p>
            <p><Link className="copyrightLinks" to="/privacy-policy">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
