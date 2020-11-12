module.exports = {
    pages: {
        index: {
            entry: "examples/main.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    //扩展webpack配置，使packages加入编译
    chainWebpack: config => {
        config.module
        .rule('js')
        .include.add('/packages/').end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
            return options
        })
    },
    lintOnSave: false,
    devServer: {
        port: 9001   // 端口号
    }
}