import Document, { Head, Main, NextScript } from 'next/document'
import Menu from '../components/Menu/Menu'
// import styles from '../style/main.scss';

const title = "Rafi George",
      description = "A Toronto-based software engineer",
      url = "http://www.rafigeorge.com"

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* <link rel="stylesheet" href="/assets/css/bundle.css"/> */}
          { // <style jsx global>{styles}</style>
          }
          <noscript>
            <meta httpEquiv="refresh" content="0;url=unsupported.html" />
          </noscript>
          <title>{title}</title>
          <meta name="description" content={description} />
          { /* Favicon */ }
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/assets/images/favicon/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          { // Facebook metadata
            // Info: https://developers.facebook.com/docs/sharing/webmasters
            // Validator: https://developers.facebook.com/tools/debug/
          }
          <meta property="og:title" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={title} />
          <meta property="og:locale" content="en_US" />
          { // Twitter metadata
            // Info: https://dev.twitter.com/cards/overview
            // Validator: https://cards-dev.twitter.com/validator
          }
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={url} />
          <meta name="twitter:creator" content="" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="" />
          <meta charSet="utf-8" />
          <base href="/" />
          <meta name="viewport" content="width=device-width, minimum-scale=1.0, shrink-to-fit=no" />

          <link rel="preload" crossOrigin='anonymous' href="/assets/fonts/rajdhani/rajdhani-regular.ttf" as="font" />
          <link rel="preload" crossOrigin='anonymous' href="/assets/fonts/uni-sans/uni-sans-heavy.otf" as="font" />
          <link rel="preload" crossOrigin='anonymous' href="/assets/fonts/roboto/roboto-regular.ttf" as="font" />
          <link rel="preload" crossOrigin='anonymous' href="/assets/fonts/roboto/roboto-black.ttf" as="font" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
