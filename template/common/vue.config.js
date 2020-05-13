// Use Path
const path = require("path");

// Get Name From Package
const { name } = require("./package.json");

// Globally Rem
const cssPx2rem = require("postcss-plugin-px2rem");

// Use Rem
const px2rem = cssPx2rem({
  // remUnit: 32 //基准大小 baseSize，需要和rem.js中相同

  // - Transfer Pixel
  rootValue: 10,
  // - Decimal 10
  // unitPrecision: 5,
  // - White List
  // propWhiteList: [],
  // - Black List
  // propBlackList: [],
  // - Exclude File
  exclude: /node_module/,
  // - Retain Class
  selectorBlackList: [":root", "html", "body"],
  // - Ignore Class
  ignoreIdentifier: false,
  // - Replace Rules
  // replace: true,
  // - Transfer in Media Screen
  mediaQuery: false,
  // - Mix Pixel to Transfer
  minPixelValue: 0
});

// Resolve Path
const resolve = dir => path.join(__dirname, dir);

// Exports
module.exports = {
	// publicPath is be set in `injection`
  publicPath: process.injection.publicPath,
  productionSourceMap: false,
  lintOnSave: true,
	// Lan Access
  devServer: {
    host: "0.0.0.0"
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [px2rem]
      },
      sass: {
        prependData: `
          @import "@/sheet/variables.scss";
        `
      }
    }
  },
  transpileDependencies: [],
  configureWebpack: {
    name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
};
