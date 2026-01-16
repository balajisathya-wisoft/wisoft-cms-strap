'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::department.department', ({ strapi }) => ({
  async find(ctx) {
    const { filters } = ctx.query;
    const slug = filters?.slug?.$eq;

    if (slug) {
      const result = await strapi.entityService.findMany('api::department.department', {
        filters: { slug: slug },
        populate: 'deep',
        limit: 1,
      });

      if (!result || !result.length) {
        return ctx.notFound('Department not found');
      }

      return { data: result[0] }; 
    }

    return await super.find(ctx);
  }
}));
