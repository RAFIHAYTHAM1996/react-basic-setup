const path = require("path");
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");
// const withOptimizedImages = require("next-optimized-images");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
// const { staticRoutes } = require('./routes');
const withReactSvg = require('next-react-svg')
const withFonts = require('nextjs-fonts');

const nextConfig = {
  webpack: function (config) {
  config.module.rules.push({
    test: /\.(ttf|otf|woff2|webp|svg|png|jpg|gif)$/,
    use: {
    loader: 'url-loader',
      options: {
        // limit: 100000,
        name: '[name].[ext]'
      }
    }
  })
  return config
  }
}

module.exports = withPlugins([
  [
    withSass,
    {
      webpack: (config) => {
        config.module.rules.forEach(rule => {
          if (rule.use instanceof Array && rule.use.find(e => e.loader === 'css-loader')) {
            rule.use.push('import-glob-loader')
          }
        })
        return config;
      }
    }
  ],
  withFonts,
  // {
  //     webpack: (config) => {
  //       console.log(config);
  //       return config;
  //     }
  // },
  withSourceMaps,
  [
    withReactSvg,
    {
      include: path.resolve(__dirname, 'public/assets/svg')
    }
  ],
  [
    withBundleAnalyzer,
    {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../server-analyze.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "client-analyze.html"
        }
      }
    }
  ],
], nextConfig)