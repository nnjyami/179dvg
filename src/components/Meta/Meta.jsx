import React from 'react'
import Helmet from 'react-helmet'

import {siteTitle, siteTitleAlt, siteLogo, siteUrl, siteDescription } from '../../../data/site-config'
import { withPrefix } from 'gatsby-link'

export default function Meta({postNode, postPath}) {
  let title = siteTitle,
      description = siteDescription,
      url = siteUrl,
      blogPost = false
  
  const blogURL = url + '/'

  const twitter = 'https://twitter.com/'
  const userTwitter = 'nnjyami'
  const twitterShareCard = 'summary' //summary or summary_large_image

  const image = blogURL + "favicons/dvg179.png"

  if(postNode && postNode.frontmatter){
    blogPost = true
    const postMeta = postNode.frontmatter
    title = `${postMeta.title} | ${title}`
    description = postMeta.description ? postMeta.description : postNode.excerpt
    url += postNode.fields.slug
  }

  // schemaOrg
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: blogURL,
      name: title,
      alternateName: siteTitleAlt ? siteTitleAlt : ""
    }
  ];
  if (blogPost) {
    schemaOrgJSONLD.push([
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": url,
              name: title,
              image
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: title,
        alternateName: siteTitleAlt ? siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image
        },
        description
      }
    ]);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
      <link rel="shortcut icon" href={siteLogo} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {blogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {
      /*
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      />
      */
      }

      {/* Twitter Card tags */}
      <meta name="twitter:card" content={twitterShareCard} />
      <meta
        name="twitter:creator"
        content={userTwitter}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}