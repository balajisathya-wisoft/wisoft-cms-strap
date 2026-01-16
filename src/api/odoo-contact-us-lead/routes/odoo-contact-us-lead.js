"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/odoo-contact-us-lead",
      handler: "odoo-contact-us-lead.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
