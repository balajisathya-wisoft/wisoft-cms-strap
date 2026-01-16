"use strict";

/**
 * odoo-blog service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::odoo-blog.odoo-blog");
