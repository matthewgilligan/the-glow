import React from "react"
import { Link } from "gatsby"

import footerStyles from './footer.module.scss'

const Footer = () => {
  return (
    <div>
      <div>
        <div className={footerStyles.logo}></div>
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
