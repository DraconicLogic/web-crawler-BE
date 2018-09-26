function formatUrlAsPath(url){
    return url.replace(/[^A-Z]/ig, '');
}

function getFilename(url){
    return `${formatUrlAsPath(url)}.json`;
}

function getFilePath(url){
    return `cached/${getFilename(url)}`;
}

module.exports = {formatUrlAsPath, getFilename, getFilePath}