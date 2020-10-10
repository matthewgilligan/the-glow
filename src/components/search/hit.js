import React from 'react'
import { Link } from 'gatsby'

import hitStyles from './hit.module.scss'
import reviewsStyles from '../../pages/reviews.module.scss'

export default ({ hit }) => (
  <div className={hitStyles.album}>
    <Link to={`/reviews/${hit.slug}`}>
      <img src={hit.albumCover.fields.file.url} alt={hit.albumCover.fields.title} className={hitStyles.heroImage} />
      <h2 className={hitStyles.artist}>{hit.artist.fields.englishName}</h2>
      <h2 className={reviewsStyles.albumTitle}>{hit.albumTitle}</h2>
    </Link>
  </div>
)
