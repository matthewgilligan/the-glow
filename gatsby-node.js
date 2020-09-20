const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve('./src/templates/site-page/site-page.js')
  const reviewTemplate = path.resolve('./src/templates/review/review.js')

  const blogRes = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const reviewRes = await graphql(`
    query {
      allContentfulReview {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  blogRes.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })

  reviewRes.data.allContentfulReview.edges.forEach((edge) => {
    createPage({
      component: reviewTemplate,
      path: `/reviews/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}
