import React from "react"
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout/layout'
import SearchComp from '../components/search/searchComp'
import 'instantsearch.css/themes/algolia.css'

class Search extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className="hero">Blog</div>
          <div className="wrapper">
            <SearchComp />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Search
