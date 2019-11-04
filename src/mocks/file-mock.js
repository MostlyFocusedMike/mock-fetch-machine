// we need to tell enzyme and jest what to do when we hit .jpg and other file imports in components
// this effectlively tells it to just load the string name of the file, which should be enough for testing

const path = require('path');

module.exports = {
    process(src, filename, config, options) {
        return `module.exports = ${JSON.stringify(path.basename(filename))};`;
    },
};
