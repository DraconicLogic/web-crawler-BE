const express = require('express')
const fs = require('fs')
const {downloadUrl} = require('./crawler');

const server = express();

server.get('/crawl', (req, res) => {
  const { url } = req.query
  downloadUrl(url, (err, response) => {
    if (err) console.log(err)
    else {
      console.log(response); 
    }
    res.status(200).send(url)
  });
})

server.get('/*', (req, res) => {
  res.status(404).send({
    err: 404
  })
})

server.listen(9000, () => {
  console.log('listening')
})