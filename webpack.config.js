const webpack = require("webpack")
const path = require("path")

const fromAppPath = (...filePaths) =>
    path.resolve.apply(null, [__dirname, "app"].concat(filePaths))

module.exports = {
    entry: fromAppPath("Index.jsx"),
    output: {
        path: path.resolve(__dirname, "public", "build/"),
        filename: "bundle.js",
        publicPath: "/build/"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        port: 8001,
        host: "0.0.0.0",
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|svg|jpeg)$/,
                use: ["file-loader?name=assets/[name].[ext]"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            styles: fromAppPath("styles"),
            pages: fromAppPath("pages"),
            services: fromAppPath("services"),
            assets: fromAppPath("assets"),
            components: fromAppPath("components"),
            utils: fromAppPath("utils")
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            API_SERVER: "http://localhost:8000"
        })
    ]
}