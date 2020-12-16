import React from "react"

import ArticleDetails from "../article-details/article-details"
import RichTextRenderer from "../rich-text-renderer/rich-text-renderer"
import contentStyles from "./content.module.scss"

const Content = ({ authors, publishedDate, category, type, slug, title, subtitle, body }) => {
  return (
    <div className={contentStyles.content}>
      <ArticleDetails
        authors={authors}
        publishedDate={publishedDate}
        category={category}
        type={type}
        slug={slug}
        title={title}
      />
      <div className={contentStyles.body}>
        <RichTextRenderer
          subtitle={subtitle}
          body={body}
        />
        {/* <p className={contentStyles.artistTags}>Tags: { artistTags }</p>*/}
      </div>
    </div>
  )
}

export default Content
