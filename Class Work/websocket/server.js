const express = require("express")
const http = require("http")
const WebSocket = require("ws")

const port = 6000
const server = http.createServer(express)
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws) => {
  console.log("client connecting")

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})

server.listen(port, () => {
  console.log("server started on port", port)
})
