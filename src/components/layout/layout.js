import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import '../../styles/index.scss';
import layoutStyles from './layout.module.scss';

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
