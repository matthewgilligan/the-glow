import React from "react"

import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import Mailchimp from "../../components/mailchimp/mailchimp"
import '../../styles/index.scss'
import layoutStyles from './layout.module.scss'

const Layout = (props) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        {props.children}
      </div>
      <Mailchimp />
      <Footer />
    </div>
  )
}

export default Layout
