import React from 'react'
import Link from 'gatsby-link'

import {siteTitle} from '../../data/site-config'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    if (location.pathname === '/') {
      header = (
        <h1>
          <Link to={'/'} >
            {siteTitle}
          </Link>
        </h1>
      )
    } else {
      header = (
        <header>
          <p>
            <Link to={'/'}>
              {siteTitle}
            </Link>
          </p>
        </header>
      )
    }
    return (
      <div className="wrapper">
        {header}
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
