import React from "react"

import '../../styles/index.scss'
import layoutStyles from './layout.module.scss'
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"

const Layout = (props) => {
  return (
    <div>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <Header />
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
