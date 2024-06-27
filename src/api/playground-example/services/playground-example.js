'use strict';

/**
 * playground-example service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::playground-example.playground-example');
