import React from "react"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import richTextStyles from "./rich-text-renderer.module.scss"

const RichTextRenderer = ({ subtitle, body }) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={richTextStyles.heading1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={richTextStyles.heading2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={richTextStyles.heading3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={richTextStyles.heading4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <div className={richTextStyles.divider}>
          <h5>{children}</h5>
        </div>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={richTextStyles.paragraph}>{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <div>
          <img src={`https:${node.data.target.fields.file["en-US"].url}`} alt=""/>
          <p className={richTextStyles.caption}>{node.data.target.fields.description["en-US"]}</p>
        </div>
      ),
      [INLINES.HYPERLINK]: (node) => {
        if(node.data.uri.indexOf('youtube.com/embed') !== -1){
          return(
            <iframe width="100%" height="321" src={node.data.uri} frameborder="0" title="YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          )
        } else {
          return <a href={node.data.uri} target={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith('https://xenodochial-dubinsky-db8110.netlify.app') ? '' : 'noopener noreferrer'}`}>{node.content[0].value}</a>;
        }
      }
    },
    renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
  }

  const subtitleFull =
    <div className={richTextStyles.subtitle}>
      {documentToReactComponents(subtitle, options)}
    </div>

  const subtitleEmpty = <div></div>

  return (
    <div className={richTextStyles.content}>
      {subtitle === null ? subtitleEmpty : subtitleFull}
      {documentToReactComponents(body, options)}
    </div>
  )
}

export default RichTextRenderer
