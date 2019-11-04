const HauteCouture = require('haute-couture');
const Package = require('../../../package.json');
const Article = require('../models/article');
const Tag = require('../models/tag');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {
        // Custom plugin code can go here

        await HauteCouture.using()(server, options);

        server.app.Database = { // eslint-disable-line no-param-reassign
            Article,
            Tag,
        };
    },
};
