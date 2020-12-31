import React from "react"
import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share";
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { Link } from "gatsby"

import articleDetailsStyles from "./article-details.module.scss"

const ArticleDetails = ({ data, type, category }) => {
  const shareBlockProps = {
    url: `https://www.theglow.jp/${type}/${data.slug}`,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebookF },
    ],
    text: data.title,
  };

  let authorTags = []
  for (let i = 0; i < data.author.length; i++) {
    if(i === data.author.length -1){
      authorTags.push(<Link to={`/author/${data.author[i].slug}`}>{data.author[i].englishName}</Link>)
    } else {
      authorTags.push(<span><Link to={`/author/${data.author[i].slug}`}>{data.author[i].englishName}</Link> & </span>)
    }
  }

  return (
    <div>
      <div className={articleDetailsStyles.metaDetails}>
        <p>By: { authorTags }</p>
        <p className={articleDetailsStyles.date}>{data.publishedDate}</p>
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
        <p className={articleDetailsStyles.date}>{data.publishedDate}</p>
      </div>
    </div>
  )
}

export default ArticleDetails
