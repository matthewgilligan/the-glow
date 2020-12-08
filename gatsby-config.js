module.exports = {
  siteMetadata: {
    siteTitle: 'The Glow',
    siteUrl: 'https://www.theglow.jp/',
    siteCover: 'src/images/site_cover.jpg',
    siteDescription: 'Putting Japanese music in the spotlight.',
    siteLang:'en-US',
    twitterUsername: 'theglow_jp',
    facebookUsername: 'theglow.jp',
    instagramUsername: 'theglow.jp'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID
      }
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GA_ID,
          // Setting this parameter is optional
          anonymize: true
        },
      },
    },
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'babel-plugin-styled-components',
    {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: process.env.MAILCHIMP_ENDPOINT
        },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.png`
      }
    },
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/*`,],
    //   }
    // },
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
