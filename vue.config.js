module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  // publicPath: "http://design.talkingdata.com/td-design-dist/"
  publicPath: process.env.NODE_ENV === 'production' ?
    'http://design.talkingdata.com/td-design-dist/' : '/'
};