import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import rehypeReact from 'rehype-react'

import Bio from '../components/Bio/Bio'
import Meta from '../components/Meta/Meta'
import ShareBtn from '../components/ShareBtn/ShareBtn'
import {siteUrl} from '../../data/site-config'

import LinkCard from '../components/LinkCard/LinkCard'

import './b16-tomorrow-dark.css'
import './starterList.css'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "link-card": LinkCard },
}).Compiler

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    //const category = post.frontmatter.category

    //<section className="a_b" dangerouslySetInnerHTML={{ __html: post.html }} />
    return (
      <article className="a">
        <Meta postNode={post} postPath={post.fields.slug} />
        <div className="a_h">
          <h1>{post.frontmatter.title}</h1>
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
        </div>
        <section className="a_b">
        {renderAst(post.htmlAst)}
        </section>
        <ShareBtn title={post.frontmatter.title} link={`${siteUrl}/${post.fields.slug}`} />
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
      htmlAst
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        path
      }
      fields {
        slug
      }
    }
  }
`
