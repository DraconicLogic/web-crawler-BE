const jsdom = require("jsdom");
const urlParser = require('url');
const { JSDOM } = jsdom;

function getProtocolAndHostName(url){
    const parsedUrl = urlParser.parse(url);
    return parsedUrl.protocol + '//' + parsedUrl.hostname;    
}

function extractHrefs(doc, url) {
    const dom = new JSDOM(doc);
    const elements = dom.window.document.querySelectorAll('a');
    const results = [];
    elements.forEach(el => {
        if (el.getAttribute('href').endsWith('.html')){
            results.push(getProtocolAndHostName(url) + el.getAttribute('href'));
        }
    })
    return results;
}

module.exports = {extractHrefs}