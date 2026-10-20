import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://winnlimo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/fleet", priority: 0.8 },
    { path: "/booking", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];
  return pages.map((p) => ({ url: `${base}${p.path}`, lastModified: new Date(), priority: p.priority }));
}
