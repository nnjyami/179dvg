import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio/Bio'
import Meta from '../components/Meta/Meta'
import ShareBtn from '../components/ShareBtn/ShareBtn'
import {siteUrl} from '../../data/site-config'

import './b16-tomorrow-dark.css'
import './starterList.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const category = post.frontmatter.category

    return (
      <article>
        <Meta postNode={post} postPath={post.fields.slug} />
        <h1>{post.frontmatter.title}</h1>
        <p>{category}</p>
        <time datetime={post.frontmatter.date}>{post.frontmatter.date}</time>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
      </article>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        path
        category
      }
      fields {
        slug
      }
    }
  }
`
