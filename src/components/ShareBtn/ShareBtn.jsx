import React from 'react'
import Helmet from 'react-helmet'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  EmailShareButton,
} from 'react-share'

import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  EmailIcon,
} from 'react-share'

import './ShareBtn.scss'

export default function SNSShare({title, link}) {
  return (
    <ul className="snsShare">
      <Helmet>
        <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async" />
      </Helmet>

      <li className="snsShare_unit">
        <a
          href="http://b.hatena.ne.jp/entry/"
          className="hatena-bookmark-button"
          data-hatena-bookmark-layout="vertical-normal"
          data-hatena-bookmark-lang="ja"
          title="このエントリーをはてなブックマークに追加"
        >
          <img
            src="//b.st-hatena.com/images/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20"
            height="20"
            style={{border: 'none'}}
          />
        </a>
      </li>

      <li className="snsShare_unit">
        <TwitterShareButton title={title} via="nnjyami" url={link}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </li>
      <li className="snsShare_unit">
        <FacebookShareButton url={link}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </li>
    </ul>
  )
}