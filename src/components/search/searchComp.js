import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox
} from 'react-instantsearch-dom'

import searchStyles from '../header/search.module.scss'
import hit from './hit'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export default function() {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="THE_GLOW">
        <header className={searchStyles.sectionHeadline}>
          <SearchBox
            className={searchStyles.searchBox}
            translations={{
              placeholder: 'Search an artist...',
            }}
          />
        </header>
        <div className={searchStyles.hitList}>
          <Hits hitComponent={hit} />
        </div>
      </InstantSearch>
    </div>
  )
}
