// module.exports = {
//   // 去掉文件名中的 hash
//   filenameHashing: false,
//   configureWebpack: {
//     resolve: {
//       extensions: ['.js', '.vue', '.json', '.css'],
//       alias: {
//         vue$: 'vue/ dist / vue.esm.js',
//       '@': resolve('src'),
//       }
//     }
//   }
// }

// var modeEnv = process.argv[3].split("=")[1];


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  pages: {
    newtab: {
      entry: 'src/newtab/main.js',
      template: 'public/index.html',
      filename: 'newtab.html'
    },
    popup: {
      entry: 'src/popup/main.js',
      template: 'public/index.html',
      filename: 'popup.html'
    }
  },
};
