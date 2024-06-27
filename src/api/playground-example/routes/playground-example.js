'use strict';

/**
 * playground-example router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::playground-example.playground-example');
