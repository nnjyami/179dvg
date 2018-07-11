import React from 'react'
import parser from 'ogp-parser'

import './LinkCard.scss'

class LinkCard extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      title: null,
      image: null,
      description: null,
    }
  }
  getOGP(url){
    parser(url, true).then((data) => {
      this.setState({
        title: data.title,
        image: data.ogp['og:image'],
        description: data.seo.description,
      })
    }).catch((error) => {
        console.error(error);
    })
  }
  componentDidMount(){
    if(this.props.url) this.getOGP(this.props.url)
  }
  render(){
    const url = this.props.url
    if(!url) return null
    const ogp = this.state
    if(ogp){
      return (
        <blockquote className="linkCard">
          <a href={url} target="_blank">
            <img src={ogp.image} className="linkCard_img" />
            <span className="linkCard_text">
              <span className="linkCard_title">{ogp.title}</span>
              <span className="linkCard_dec">{ogp.description}</span>
              <span className="linkCard_url">{url}</span>
            </span>
          </a>
        </blockquote>
      )
    } else {
      return null
    }
  }
}

export default LinkCard