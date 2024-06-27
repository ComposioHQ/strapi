'use strict';

/**
 * playground-example controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::playground-example.playground-example');
