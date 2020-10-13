import React from 'react'
import { Link } from 'gatsby'

import hitStyles from './hit.module.scss'

export default ({ hit }) => (
  <div className={hitStyles.item}>
    <Link to={`/artist/${hit.slug}`}>
      <h2 className={hitStyles.artist}>{hit.englishName}</h2>
    </Link>
  </div>
)
