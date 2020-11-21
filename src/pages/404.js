import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import Head from "../components/head/head"
import fourOFourStyles from "./404.module.scss"

const NotFound = () => {
  return (
    <Layout>
      <Head title="Page Not Found"/>
      <div className={fourOFourStyles.banner}>
        <div className={fourOFourStyles.text}>
          <h1 className={fourOFourStyles.fourOFour}>404</h1>
          <h2 className={fourOFourStyles.notFound}>Unfortunately, The Glow does not shine here!</h2>
          <p>Head back to our <Link to="/">home page</Link>!</p>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
