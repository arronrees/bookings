/**
 * booking router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::booking.booking", {
  config: {
    find: {
      middlewares: ["api::booking.is-owner"],
    },
    findOne: {
      middlewares: ["api::booking.is-owner"],
    },
  },
});
