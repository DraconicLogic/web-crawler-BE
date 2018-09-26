const http = require('https');
const url = require('url');

function checkIfUrlValid (address, cb) {
    const urlToValidate = url.parse(address);
    const options = {method:'HEAD', host: urlToValidate.hostname, port: urlToValidate.port, path: urlToValidate.path }
    const req = http.request(options, (res) => {
        cb(null, res)
    }).on('error', (err) => {
        cb({msg:'Error', address}, null)
    });
    req.end();
};

function downloadUrl(address, cb){
    http.get(address, (res) => {
        if (res.statusCode === 200){
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                cb(null, rawData);
            });
        }else{
            cb({msg: 'Not found', status: res.statusCode, address}, null);
        }
    }).on('error', function(err) {
        cb({msg:'Error', address}, null);
    });
}

module.exports = {checkIfUrlValid, downloadUrl};