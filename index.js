const express = require('express');
const fs = require('fs')
const {downloadUrl, checkIfUrlValid} = require('./crawler');
const {extractHrefs} = require('./parser');
const {getFilePath} = require('./utils');

const server = express();

const doStuff = (cb) => {
  const data = [];
  downloadUrl(url, (err, response) => {
    if (err) data.push({url, status:'error'})
    else {
      const hrefs = extractHrefs(response, url);
      hrefs.forEach(href => {
        checkIfUrlValid(url, (err, res) => {
          if (err) results.push({url, status:'error'})
          else{
            if (res.statusCode === 404 || res.statusCode === 500){
              data.push({url, status:'error'});
            }else{
              data.push({url, status:'success'});
            }
          }
          if (data.length === hrefs.length){
            cb(null, data)
          }
        })
      })
    }
  });  
}

server.get('/crawl', (req, res) => {
  const { url } = req.query
  let data = [];
  if (fs.existsSync(getFilePath(url))){
    data = JSON.parse(fs.readFileSync(getFilePath(url)));
  }else{
  }

  res.status(200).send(data);

  //Do something to load a cached version
//  if (fs.existsSync())

  // downloadUrl(url, (err, response) => {
  //   if (err) console.log({url, status:'error'})
  //   else {
  //     const hrefs = extractHrefs(response, url);
  //     const results = [];
  //     hrefs.forEach(href => {
  //       checkIfUrlValid(url, (err, res) => {
  //         if (err) results.push({url, status:'error'})
  //         else{
  //           if (res.statusCode === 404 || res.statusCode === 500){
  //             results.push({url, status:'error'});
  //           }else{
  //             results.push({url, status:'success'});
  //           }
  //         }
  //         if (results.length === hrefs.length){
  //           console.log(results);
  //         }
  //       })
  //     })
  //   }
  //   res.status(200).send(url)
  // });
})

server.get('/*', (req, res) => {
  res.status(404).send({
    err: 404
  })
})

server.listen(9000, () => {
  console.log('listening')
})