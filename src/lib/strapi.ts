export const STRAPI_URL =
  import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchFromStrapi(query: string, variables = {}) {
  const res = await fetch(`${STRAPI_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors));
  return data;
}

export function getStrapiMedia(path?: string | null) {
  if (!path) return "";
  if (typeof path === "string" && path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}
