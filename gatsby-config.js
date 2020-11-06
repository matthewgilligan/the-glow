module.exports = {
  siteMetadata: {
    title: 'The Glow',
  },
  plugins: [
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: process.env.MAILCHIMP_ENDPOINT
        },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`,],
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    }
  ]
}
