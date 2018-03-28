import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio/Bio'
import Meta from '../components/Meta/Meta'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <article>
        <Meta />
        <Bio />
        {posts.map(post => {
          if (post.node.path !== '/404/') {
            const title = get(post, 'node.frontmatter.title') || post.node.path
            return (
              <section className="al" key={post.node.frontmatter.path}>
                <h3 className="al_t">
                  <Link to={post.node.frontmatter.path} >
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small className="al_d">{post.node.frontmatter.date}</small>
                <p className="al_e" dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </section>
            )
          }
        })}
      </article>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "YYYY-MM-DD")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
