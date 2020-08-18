import React from "react"
import { Link } from "gatsby"
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const IndexPage = () => {
  return (
    <div>
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
      <ul>
        <li>
          <a href="https://www.twitter.com/"><FaFacebookF /></a>
        </li>
        <li>
          <a href="https://www.instagram.com/"><FaInstagram /></a>
        </li>
        <li>
          <a href="https://www.facebook.com/"><FaTwitter /></a>
        </li>
      </ul>
    </div>
  )
}

export default IndexPage
