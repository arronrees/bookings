/**
 * booking router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::booking.booking", {
  config: {
    findOne: {
      middlewares: ["api::booking.is-owner"],
    },
  },
});
