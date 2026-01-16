'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-category.blog-category', ({ strapi }) => ({
  async find(ctx) {
    const { filters } = ctx.query;
    const slug = filters?.slug?.$eq;

    if (slug) {
      // If slug is passed, fetch only one category
      const result = await strapi.entityService.findMany('api::blog-category.blog-category', {
        filters: { Slug: slug },
        populate: 'deep',
        limit: 1,
      });

      if (!result || !result.length) {
        return ctx.notFound('Category not found');
      }

      return { data: result[0] }; // Return only the matched object
    }

    // Fallback: return default list of categories
    return await super.find(ctx);
  }
}));
