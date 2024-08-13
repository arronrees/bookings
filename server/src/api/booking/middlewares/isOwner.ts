/**
 * `isOwner` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params?.id ? ctx.params.id : undefined;
    let entry: any = {};

    // skip if accessing via api token, used for checkout
    if (
      ctx.state?.isAuthenticated &&
      ctx.state?.auth?.strategy?.name === "api-token"
    ) {
      await next();
      return;
    }

    if (!user) {
      return ctx.unauthorized("This action is unauthorized.");
    }

    /**
     * Gets all information about a given entry,
     * populating every relations to ensure
     * the response includes author-related information
     */
    if (entryId) {
      entry = await strapi.entityService.findOne(
        "api::booking.booking",
        entryId,
        {
          populate: "*",
        }
      );
    }

    /**
     * Compares user id and entry author id
     * to decide whether the request can be fulfilled
     * by going forward in the Strapi backend server
     */
    if (user.id !== entry.user?.id) {
      return ctx.unauthorized("This action is unauthorized.");
    } else {
      await next();
    }
  };
};
