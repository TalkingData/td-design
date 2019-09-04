module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ?
    'http://design.talkingdata.com/td-design-dist/' : '/'
};