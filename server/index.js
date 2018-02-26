const express = require("express")
const http = require("http")
const path = require("path")

const DEFAULT_HTTP_PORT = 8001

const port = process.env["HTTP_PORT"] | DEFAULT_HTTP_PORT
const app = express()

app.use(express.static(path.resolve(__dirname, "../public")))

app.use((request, response) => {
    response.sendFile(path.resolve(__dirname, "../public/index.html"))
})

http.createServer(app)
    .listen(port, () => {
        console.log(`The server is listening on port ${port}...`)
    })