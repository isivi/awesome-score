var baseConfig = require('./base.babel');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');

// Passed from base configs baseDir
var baseDir = baseConfig.localConsts.baseDir;
// Specifying full host to load emulated static files from independent dev server
var host = 'http://localhost:3000';

baseConfig.entry.aeditor.push('webpack-hot-middleware/client?path=' + host + '/__webpack_hmr');

baseConfig.module.loaders.push(
  // CSS
  {
    test: /\.css$/,
    loader: 'style!css'
    // As for now importing also style of any external module, uncomment to change it
    //include: path.join(baseDir, 'ascore_js'),
  },

  // LESS
  {
    test: /\.less$/,
    loader: 'style!css!less'
    // As for now importing also style of any external module, uncomment to change it
    //include: path.join(baseDir, 'ascore_js'),
  }
);

baseConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

baseConfig.plugins.push(
  new BundleTracker({
    dirname: baseDir,
    filename: './var/webpack_stats/dev.json'
  })
);

baseConfig.output.publicPath = host + '/static/bundles/';

baseConfig.devtool = 'eval-source-map';

module.exports = baseConfig;
