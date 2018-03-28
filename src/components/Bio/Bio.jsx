import React from 'react'

class Bio extends React.Component {
  render() {
    return (
      <div className="bio">
        <p>
          デザインとエンジニアの間で彷徨う開発ブログ。{' '}<br />
          by <a href="https://twitter.com/nnjyami">nnjyami（んじゃみ）</a>
        </p>
      </div>
    )
  }
}

export default Bio
