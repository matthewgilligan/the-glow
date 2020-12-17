import React from "react"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { Link } from "gatsby"

import articleDetailsStyles from "./article-details.module.scss"

const ArticleDetails = ({ authors, publishedDate, category, type, slug, title }) => {
  const shareBlockProps = {
    url: `https://www.theglow.jp/${type}/${slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: title,
  };

  let authorTags = []
  for (let i = 0; i < authors.length; i++) {
    if(i === authors.length -1){
      authorTags.push(<Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link>)
    } else {
      authorTags.push(<span><Link to={`/author/${authors[i].slug}`}>{authors[i].englishName}</Link> & </span>)
    }
  }

  return (
    <div>
      <div className={articleDetailsStyles.metaDetails}>
        <p>By: { authorTags }</p>
        <p className={articleDetailsStyles.date}>{publishedDate}</p>
        <div className={articleDetailsStyles.genreAndSocials}>
          <p className={articleDetailsStyles.genre}>{category}</p>
          <ShareBlockStandard {...shareBlockProps} />
        </div>
      </div>
      <div className={articleDetailsStyles.mobileMetaDetails}>
        <div className={articleDetailsStyles.genreAndSocials}>
          <p>By: { authorTags }</p>
          <p className={articleDetailsStyles.genre}>{category}</p>
        </div>
        <p className={articleDetailsStyles.date}>{publishedDate}</p>
      </div>
    </div>
  )
}

export default ArticleDetails
