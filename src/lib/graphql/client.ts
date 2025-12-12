import { GraphQLClient } from "graphql-request";
import { STRAPI_URL } from "../strapi";

export const client = new GraphQLClient(`${STRAPI_URL}/graphql`, {
  headers: {
    "Content-Type": "application/json",
  },
});
