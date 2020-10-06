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
  const featureTemplate = path.resolve('./src/templates/feature/feature.js')
  const newsTemplate = path.resolve('./src/templates/news/news.js')
  const guidesTemplate = path.resolve('./src/templates/guides/guides.js')
  const artistTemplate = path.resolve('./src/templates/artist/artist.js')
  const authorTemplate = path.resolve('./src/templates/author/author.js')

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

  const featureRes = await graphql(`
    query {
      allContentfulFeature {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const newsRes = await graphql(`
    query {
      allContentfulNews {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const guidesRes = await graphql(`
    query {
      allContentfulGuide {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const artistRes = await graphql(`
    query {
      allContentfulArtist {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const authorRes = await graphql(`
    query {
      allContentfulAuthor {
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

  featureRes.data.allContentfulFeature.edges.forEach((edge) => {
    createPage({
      component: featureTemplate,
      path: `/features/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })

  newsRes.data.allContentfulNews.edges.forEach((edge) => {
    createPage({
      component: newsTemplate,
      path: `/news/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })

  guidesRes.data.allContentfulGuide.edges.forEach((edge) => {
    createPage({
      component: guidesTemplate,
      path: `/guides/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })

  artistRes.data.allContentfulArtist.edges.forEach((edge) => {
    createPage({
      component: artistTemplate,
      path: `/artist/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })

  authorRes.data.allContentfulAuthor.edges.forEach((edge) => {
    createPage({
      component: authorTemplate,
      path: `/author/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}
