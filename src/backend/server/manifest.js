const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');
const path = require('path');
// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: '0.0.0.0',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 8000,
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error'],
            },
            production: {
                request: ['implementation'],
            },
        },
        routes: {
            files: { // configures Inert's starting directory for files
                relativeTo: path.join(__dirname, '..', '..', '..', 'build'),
            },
        },
    },
    register: {
        plugins: [
            {
                plugin: '@hapi/inert',
                options: {},
            },
            {
                plugin: '../lib', // Main plugin
                options: {},
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop,
                },
            },
        ],
    },
});
