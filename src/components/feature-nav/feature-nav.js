import React from "react"

import featureNavStyles from '../feature-nav/feature-nav.module.scss'

const FeatureIndex = ({ featureEnglish, featureJapanese, navItems }) => {
  return (
    <div className={featureNavStyles.nav}>
      <div className={featureNavStyles.navTitle}>
        <div className={featureNavStyles.titleEnglish}>
          <p>{ featureEnglish }</p>
        </div>
        <div className={featureNavStyles.titleJapanese}>
          <p>{ featureJapanese }</p>
        </div>
      </div>
      <div className={featureNavStyles.navItems}>
        <ul>
          <li>
            { navItems[0] }
          </li>
          <li>
            { navItems[1] }
          </li>
          <li>
            { navItems[2] }
          </li>
          <li>
            { navItems[3] }
          </li>
        </ul>
        <div className={featureNavStyles.mobileNav}>
          <div class={featureNavStyles.navDropdown}>
            <button className={featureNavStyles.navDropdownButton}>{ navItems[4] } ▾</button>
            <div className={featureNavStyles.navDropdownContent}>
              { navItems[5] }
              { navItems[6] }
              { navItems[7] }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureIndex
