const express = require('express')
const fs = require('fs')
const server = express()

server.get('/crawl', (req, res) => {
  const { url } = req.query

  res.status(200).send(req.query.url)
})



server.get('/*', (req, res) => {
  res.status(404).send({
    err: 404
  })
})


server.listen(9000, () => {
  console.log('listening')
})