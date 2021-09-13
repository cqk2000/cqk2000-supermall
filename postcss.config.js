module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视口宽度  对应设计稿
      viewportHeight: 667, // 视口高度 对应设计稿（也可以不配置）
      unitPrecision: 5, // 指定‘px’转换为视窗单位值的最小小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于1px不转换为视窗单位
      MediaQuery: false, // 允许媒体查询分钟转换px
      exclude: [/TabBar/]  //忽略文件 使用正则表达式表示
    }
  }
}
// 1.在js中使用正则: /正则相关规则/
// 2.exclude中存放的元素必须是正则表达式 
// 3.按照排除的文件写对应的正则  
// 正则的规则 
// 1> ^abc: 表示匹配的内容,必须以什么内容开头(以abc开头)
// 2> abc$: 表示匹配的内容,必须以什么内容结尾(以abc结尾)