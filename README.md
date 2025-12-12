## Frontend Universitas Cakrawala

Frontend dibangun menggunakan Astro, memanfaatkan SSG (Static Site Generation) dan GraphQL untuk fetch data dari Strapi.

### 🚀 Tech Stack
- **Astro** v5
- **Tailwind CSS**
- **TypeScript**
- **graphql-request (GraphQL)**
- **Strapi Integration**

### 🛠️ Instalasi
```bash
cd frontend-universitas-cakrawala
npm install
```

### ▶️ Menjalankan Project
```bash
npm run dev
```
Akses melalui: `http://localhost:4321`

### 📁 Struktur Folder
```text
src/
 ├─ pages/
 │   ├─ index.astro                 → Homepage (daftar artikel + pagination)
 │   ├─ [slug].astro                → Article Page (detail artikel)
 │   └─ kategori/
 │       ├─ index.astro             → Categories Page (daftar semua kategori)
 │       └─ [slug].astro            → Category Page (artikel per kategori + pagination)
 ├─ components/
 │   ├─ ArticleCard.astro
 │   ├─ ArticleList.astro
 │   ├─ ArticleDetail.astro
 │   └─ Seo.astro
 ├─ layouts/
 │   └─ Layout.astro                → Layout utama (Navbar konsisten)
 └─ lib/
     ├─ graphql/
     │  ├─ client.ts                → GraphQL Client (graphql-request)
     │  └─ queries.ts               → Kumpulan query GraphQL
     ├─ richtext.ts                 → Renderer Rich Text sederhana
     └─ strapi.ts                   → STRAPI_URL + helper media URL
```

### 🔗 Contoh Strapi Client (fetcher)
```ts
// src/lib/strapi.ts
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
```

### 🔍 Pagination Query (contoh)
Berikut contoh query artikel dengan pagination dan sorting:
```graphql
query GetPaginatedArticles($page: Int!, $pageSize: Int!, $sort: [String!]) {
  articles(
    pagination: { page: $page, pageSize: $pageSize }
    sort: $sort
  ) {
    documentId
    Title
    Slug
    SEOMetaDescription
    publishedAt
  }
}
```

Jika API Anda menyediakan meta pagination, Anda dapat menambahkan bidang meta:
```graphql
query {
  articles(
    pagination: { page: 1, pageSize: 6 }
    sort: ["publishedAt:desc"]
  ) {
    documentId
    Title
    Slug
    meta {
      pagination {
        page
        total
        pageSize
        pageCount
      }
    }
  }
}
```

### 🔧 Dynamic Routes
- **Article Page**: menggunakan `getStaticPaths()` untuk generate semua slug artikel  
  File: `src/pages/[slug].astro`
- **Category Page**: menampilkan semua artikel dalam kategori tertentu  
  File: `src/pages/kategori/[slug].astro`
- **Categories Page**: daftar semua kategori  
  File: `src/pages/kategori/index.astro`

### 🌍 Environment Variable yang Dibutuhkan
```env
PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

### 🚀 Build for Production
```bash
npm run build
```
Hasil build ada di: `/dist`

### 📦 Deployment
- **Frontend**: Cocok untuk Vercel, Netlify, Cloudflare Pages
- **Backend Strapi**: Cocok untuk Render, Railway, VPS Ubuntu

### 📝 License
MIT License — Bebas digunakan untuk keperluan belajar maupun profesional.
