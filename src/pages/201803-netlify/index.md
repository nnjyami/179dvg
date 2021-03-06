---
title: Netlifyへブログを移行した
date: 2018-03-30T21:02:32.169Z
path: /201803-netlify/
---

先週末の KyotoJS で教えてもらった Netlify を試している。  
「Netlify 使ってみた」→ 記事になるな！と思ったんだけど、Netlify 簡単に出来すぎてヤバい。  
記事にならないくらいの簡単さだったけど、Gatsby 側のバグを踏んでしまいしばらく苦しんだ。

Gatsby は Netlify プラグインとかあったので、なんか追加が必要なのかと思いきや、Github に Push しちゃえば、Netlify 側で Build してくれる…

先日の登壇では張り切って「さくらの VPS で Nginx」とか言ったけど、VPS…いらない。  
特に僕のようなインフラ弱い人間には優しすぎる。  
ホストしてくれるサービスはあると思ってたけど、Build までサービス側でしてくれるとかスゴ過ぎる。

Netlify 公式の チュートリアルに Gatsby のビルドの仕方は全て載ってた。  
<a href="https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/" target="_blank">A Step-by-Step Guide: Gatsby on Netlify</a>


## JAMStack
Netlify ホストにすることでより JAMStack な構成に近づいたと思われる。  

<a href="https://jamstack.org/" target="_blank">JAMStack</a> はJavaScript、API、Markupの略。  
**JavaScript** のみで記述され、サーバーサイドや複雑な処理は **API** を利用。コンテンツ部分の **Markup** は静的ジェネレーターなどによって予めビルドしておくようなサイト構成・Web開発アーキテクチャを指すものらしい。  
高いパフォーマンス（表示速度）とセキュリティ、低コストで短い期間での開発を実現するためのアーキテクチャーのようだ

Gatsby はこの JAMStack の文脈もあり人気があると、KyotoJS で sotayamasita さんが教えてくれた。  
来年以降、日本でも流行るバズワードになるかもしれない...らしい。

確かにパフォーマンスを重視するなら、静的な書き出しに勝るものはないと思う。  
またファイルを CDN に載せる場合も静的なファイルにしないと上手く配信出来ないケースがほとんど。

JS はコンパイルするのが当たり前になっているけど、Web サイト・アプリも Gatsby のように丸ごとコンパイルして JAMStack なアーキテクチャーにするのが当たり前になるかもしれない。

そんな JAMStack を提唱し始めたのが Netlify らしい。Web の進化って本当に早い！
最近名前はよく目にしていたけど、使ったことなかったので使ってみた。


## Netlify にデプロイするまで
通常の Gatsby と違うのは package.json に Gatsby 含めるかどうかだけ。
ローカルなどにある Gatsby のファイルに以下をするだけで準備が整う。

```shell
$ npm install gatsby-cli --save
```

あとは、Github の方にリポジトリ作って Netlify の管理画面からリポジトリの紐付けを行うと設定完了🎉
リポジトリ側に push があると、Netlify 側が自動で検知して build コマンドを走らせてくれる。


## Netlify の凄み
- デフォルト SSL な `***.netlify.com` ドメインが割り振られる
- 独自ドメインも割当可能
- Github push で build までしてくれる
- 簡単
- 速い（http/2）

***.netlify.com ってドメイン的にも割とクールな気がスル。何年も続けるものでないのなら、ホントにこれでいいかも。
テスト用に `179.netlify.com` が使えたんだけど、正直ドメインこれでもイイかもと思った。

UX の話にも通じるけど、これまでの予想を超えて速く・簡単になれば、今までの価値観、優先順位って変わっていきそう。
ガチガチのカスタマイズサーバーというのは生き続けると思うけど、簡単・手軽にパフォーマンスのいいサーバーが作れるのなら、サーバーの世界もだいぶ変わっていきそう。 Game Changer 的な変化は大好きなのでワクワクする。

と偉そうに語りながら、この間まで Netlify 知らなかったので、もっと情報感度高めないと。


## Gatsby でハマったところ
Netlify移行に合わせて、少し前から準備していたスタイルの変更も合わせて行った。  
Sass（Scss）でしか書きたくなかったので、`gatsby-plugin-sass` を使ったんだけど、そこに大きな罠が！

`gatsby-plugin-sass` には `develop` の時は問題なけど、`build` には Sass で書いたスタイルが反映されないというバグがあるらしく、Gatsby の Issue でもいくつも上がっている。僕も見事にそこにハマってしまい、解決策を見つけるのに手間取ってしまった。  
結局、<a href="https://github.com/gatsbyjs/gatsby/issues/4457" target="_blank">このIssue</a>に書かれている通り、`gatsby-plugin-sass` のバージョンを `1.0.19` にすることで無事解消された。  
しかし、現行が `1.0.25` で `1.0.19` にしなきゃいけないとかモヤモヤする。


## まとめ
このブログを開始して、早くも 2ヶ月。  
そしてサーバーを Netlify に移行。世の中にキャッチアップするためにも、モダンな技術をもっと試さないと。

勉強のための VPS & Nginx だったんだけど、さらに新しい Netlify はとてつもなく簡単だった。
もっと使いこなせるように周辺技術とか調べていこうと思う。