import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contribute">Contribute</Link>
        </li>
        <li>
          <Link to="/advertise">Advertise</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/terms-of-service">Terms of Service</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
