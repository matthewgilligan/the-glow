import React from 'react';
import { Link } from 'gatsby';

import ArticleDetails from '../article-details/article-details';
import RichTextRenderer from '../rich-text-renderer/rich-text-renderer';
import contentStyles from './content.module.scss';

const Content = ({ data, category, type }) => {
  let artistTags = []

  for (let i = 0; i < data.artist.length; i++) {
    if(i === data.artist.length -1){
      artistTags.push(<Link to={`/artist/${data.artist[i].slug}`}>{data.artist[i].englishName}</Link>)
    } else {
      artistTags.push(<span><Link to={`/artist/${data.artist[i].slug}`}>{data.artist[i].englishName}</Link>, </span>)
    }
  }

  return (
    <div className={contentStyles.content}>
      <ArticleDetails
        data={data}
        category={category}
        type={type}
      />
      <div className={contentStyles.body}>
        <RichTextRenderer
          subtitle={data.subtitle.json}
          body={data.body.json}
        />
        <p className={contentStyles.artistTags}>Tags: { artistTags }</p>
      </div>
    </div>
  )
}

export default Content
