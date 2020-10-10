import React from 'react'
import { Link } from 'gatsby'

import hitStyles from './hit.module.scss'

export default ({ hit }) => (
  <div className={hitStyles.preview}>
    <img src={hit.albumCover.fields.file.url} className={hitStyles.heroImage}></img>
    <h3 className={hitStyles.previewTitle}>
      <Link to={`/reviews/${hit.slug}`}>{hit.albumTitle}</Link>
    </h3>
    <small>{hit.artist.fields.englishName}</small>
    {hit.tags &&
      hit.tags.map(tag => (
        <p className={hitStyles.tag} key={tag}>
          {tag}
        </p>
      ))}
  </div>
)
