/**
 * `isOwner` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry: any = null;
    let entries: any = null;

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
    } else {
      entries = await strapi.entityService.findMany("api::booking.booking", {
        filters: {
          user: user,
        },
        populate: "*",
      });
    }

    /**
     * Compares user id and entry author id
     * to decide whether the request can be fulfilled
     * by going forward in the Strapi backend server
     */

    if (entry) {
      if (user.id !== entry.user.id) {
        return ctx.unauthorized("This action is unauthorized.");
      } else {
        return next();
      }
    }

    if (entries) {
      return next();
    }

    return ctx.unauthorized("This action is unauthorized.");
  };
};
