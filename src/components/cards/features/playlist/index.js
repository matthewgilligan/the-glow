import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import playlistCardStyles from "./playlist-card.module.scss"

const Content = ({ data }) => {
  return (
    <div className={playlistCardStyles.playlist}>
      <Link to={`features/${data.slug}`}>
        <Img
          fluid={data.coverImage.fluid}
          key={data.coverImage.fluid.src}
          alt={data.coverImage.title}
          className={playlistCardStyles.image}>
        </Img>
      </Link>
      <div className={playlistCardStyles.details}>
        <Link to={`features/${data.slug}`}>
          <h2 className={playlistCardStyles.artist}>{data.artist[0].englishName}</h2>
        </Link>
        <p className={playlistCardStyles.subtitle}>{documentToReactComponents(data.subtitle.json)}</p>
        <p className={playlistCardStyles.date}>{data.publishedDate}</p>
      </div>
    </div>
  )
}

export default Content



