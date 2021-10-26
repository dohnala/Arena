const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  name: 'client',
  entry: {
    client: path.resolve(__dirname, 'client/Client.ts'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  externals: {
		phaser: 'Phaser'
	},
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.client.json',
        },
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", 'sass-loader'],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), 
    new WebpackManifestPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './node_modules/phaser/dist/phaser.min.js', to: 'lib'}, 
        { from: './client/assets', to: 'assets' }
      ],
    }),
  ],
}
