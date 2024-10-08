/**
 * booking controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }) => ({
    async find(ctx) {
      if (!ctx.state.user) {
        return ctx.unauthorized("You must be logged in to access this data.");
      }

      // Get the user ID from the request context
      const userId = ctx.state.user.id;

      // skip if accessing via api token, used for checkout
      if (
        ctx.state?.isAuthenticated &&
        ctx.state?.auth?.strategy?.name === "api-token"
      ) {
        const result = await super.find(ctx);

        result.meta.date = Date.now();

        return result;
      }

      ctx.query = {
        ...ctx.query,
        locale: "en",
        filters: {
          user: {
            id: { $eq: userId },
          },
        },
      };

      const result = await super.find(ctx);

      result.meta.date = Date.now();

      return result;
    },
  })
);
