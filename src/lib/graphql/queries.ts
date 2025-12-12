import { gql } from "graphql-request";

export const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      documentId
      Title
      Slug
      Content
      Author
      SEOMetaTitle
      SEOMetaDescription
      CoverImage {
        url
      }
      publishedAt
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    articles(filters: { Slug: { eq: $slug } }) {
      documentId
      Title
      Slug
      Content
      Author
      SEOMetaTitle
      SEOMetaDescription
      CoverImage {
        url
      }
      categories {
        Name
      }
      publishedAt
    }
  }
`;

export const GET_ALL_SLUGS = gql`
  query GetAllSlugs {
    articles {
      Slug
    }
  }
`;

export const GET_CATEGORY_SLUGS = gql`
  query GetCategorySlugs {
    categories {
      documentId
      Slug
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categories(filters: { Slug: { eq: $slug } }) {
      documentId
      Name
      Slug
      articles {
        documentId
        Title
        Slug
        SEOMetaTitle
        SEOMetaDescription
        CoverImage {
          url
        }
        publishedAt
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      documentId
      Name
      Slug
    }
  }
`;
