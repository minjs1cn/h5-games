const _ = require('lodash')
const fs = require('fs')
const { ENTRY_HTML, OUTPUT_HTML, EXTERNALS } = require('./config')
const { GlobalDataTag } = require('@tuia/config-simplify')

/**
 * 模版
 */
const compiled = _.template(`
<!DOCTYPE html>
<html lang="en" style="font-size:100px;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <script>
    ;(function(d,s){var tpct=d.createElement(s); tpct.src="//static.iqiyi.com/js/common/tpct.min.js"; var es=d.getElementsByTagName(s)[0];es.parentNode.insertBefore(tpct, es);})(document, "script")
  </script>
  <% if(config !== ''){ %>
    <script src="<%= config %>"></script>
  <% }; %>
  <% if(css !== ''){ %>
  <link rel="stylesheet" href="<%= css %>">
  <% }; %>
</head>
<body>
  <div id="app"></div>
  <script src="<%= vendor %>"></script>
</body>
</html>
`)

/**
 * 创建入口模版
 */
function createEntryHtml(data) {
  const html = compiled(createTemplateData(data))
  fs.writeFileSync(ENTRY_HTML, html, 'utf-8')
  return {
    html,
    entry: ENTRY_HTML
  }
}

/**
 * 创建输出模版
 */
function createOutputHtml(data) {
  const html = compiled(createTemplateData(data))
  fs.writeFileSync(OUTPUT_HTML, html, 'utf-8')
  return {
    html,
    entry: OUTPUT_HTML
  }
}

/**
 * 创建模版需要的数据
 * @param {} param0 
 */
function createTemplateData(options) {
  return {
    configTag: GlobalDataTag,
    ...EXTERNALS,
    ...options
  }
}

module.exports = {
  compiled,
  createEntryHtml,
  createOutputHtml
}