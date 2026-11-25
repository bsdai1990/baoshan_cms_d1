import data from "@/data/public-data.json";
import type { Article, Banner, NavItem, Product, ProductCategory, SiteSetting } from "@/types";

type ProductSnapshotRow = Omit<Product, "category" | "specifications" | "is_featured" | "is_published"> & {
  specifications: unknown;
  is_featured: number | boolean;
  is_published: number | boolean;
  category_ref_id: string | null;
  category_ref_name: string | null;
  category_ref_slug: string | null;
  category_ref_description: string | null;
  category_ref_sort_order: number | null;
  category_ref_created_at: string | null;
};

type ArticleSnapshotRow = Omit<Article, "is_featured" | "is_published"> & {
  is_featured: number | boolean;
  is_published: number | boolean;
};

type BannerSnapshotRow = Omit<Banner, "is_active"> & {
  is_active: number | boolean;
};

type NavSnapshotRow = Omit<NavItem, "is_visible"> & {
  is_visible: number | boolean;
};

type PublicDataSnapshot = {
  generatedAt: string;
  settings: SiteSetting[];
  navItems: NavSnapshotRow[];
  banners: BannerSnapshotRow[];
  productCategories: ProductCategory[];
  products: ProductSnapshotRow[];
  articles: ArticleSnapshotRow[];
};

const snapshot = data as PublicDataSnapshot;

function asBoolean(value: unknown) {
  return value === true || value === 1 || value === "1";
}

function asStringRecord(value: unknown): Record<string, string> | null {
  if (!value) return null;

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (!parsed || typeof parsed !== "object") return null;
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([key, item]) => [
        key,
        String(item ?? ""),
      ])
    );
  } catch {
    return null;
  }
}

function mapProduct(row: ProductSnapshotRow): Product {
  const category = row.category_ref_id
    ? {
        id: row.category_ref_id,
        name: row.category_ref_name ?? "",
        slug: row.category_ref_slug ?? "",
        description: row.category_ref_description,
        sort_order: Number(row.category_ref_sort_order ?? 0),
        created_at: row.category_ref_created_at ?? row.created_at,
      }
    : null;

  return {
    id: row.id,
    category_id: row.category_id,
    name: row.name,
    slug: row.slug,
    summary: row.summary,
    description: row.description,
    specifications: asStringRecord(row.specifications),
    image_url: row.image_url,
    is_featured: asBoolean(row.is_featured),
    is_published: asBoolean(row.is_published),
    sort_order: Number(row.sort_order ?? 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
    category,
  };
}

function mapArticle(row: ArticleSnapshotRow): Article {
  return {
    ...row,
    is_featured: asBoolean(row.is_featured),
    is_published: asBoolean(row.is_published),
  };
}

function mapBanner(row: BannerSnapshotRow): Banner {
  return {
    ...row,
    is_active: asBoolean(row.is_active),
  };
}

function mapNavItem(row: NavSnapshotRow): NavItem {
  return {
    ...row,
    is_visible: asBoolean(row.is_visible),
  };
}

export const publicDataGeneratedAt = snapshot.generatedAt;

export function getPublicSiteSettings() {
  return snapshot.settings;
}

export function getPublicSettingsMap() {
  return getPublicSiteSettings().reduce(
    (acc, setting) => ({ ...acc, [setting.key]: setting.value }),
    {} as Record<string, string | null>
  );
}

export function getPublicNavItems(options?: { visibleOnly?: boolean }) {
  const items = snapshot.navItems.map(mapNavItem);
  return options?.visibleOnly ? items.filter((item) => item.is_visible) : items;
}

export function getPublicBanners(options?: { activeOnly?: boolean }) {
  const banners = snapshot.banners.map(mapBanner);
  return options?.activeOnly ? banners.filter((banner) => banner.is_active) : banners;
}

export function getPublicProductCategories() {
  return snapshot.productCategories;
}

export function getPublicProducts(options?: {
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  categoryId?: string | null;
  excludeId?: string;
  limit?: number;
  slug?: string;
  id?: string;
}) {
  let products = snapshot.products.map(mapProduct);

  if (options?.publishedOnly) {
    products = products.filter((product) => product.is_published);
  }
  if (options?.featuredOnly) {
    products = products.filter((product) => product.is_featured);
  }
  if (options?.categoryId) {
    products = products.filter((product) => product.category_id === options.categoryId);
  }
  if (options?.excludeId) {
    products = products.filter((product) => product.id !== options.excludeId);
  }
  if (options?.slug) {
    products = products.filter((product) => product.slug === options.slug);
  }
  if (options?.id) {
    products = products.filter((product) => product.id === options.id);
  }
  if (options?.limit) {
    products = products.slice(0, Math.max(1, Math.min(options.limit, 50)));
  }

  return products;
}

export function getPublicProductBySlug(slug: string, publishedOnly = true) {
  return getPublicProducts({ slug, publishedOnly, limit: 1 })[0] ?? null;
}

export function getPublicArticles(options?: {
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  excludeId?: string;
  limit?: number;
  slug?: string;
  id?: string;
}) {
  let articles = snapshot.articles.map(mapArticle);

  if (options?.publishedOnly) {
    articles = articles.filter((article) => article.is_published);
  }
  if (options?.featuredOnly) {
    articles = articles.filter((article) => article.is_featured);
  }
  if (options?.excludeId) {
    articles = articles.filter((article) => article.id !== options.excludeId);
  }
  if (options?.slug) {
    articles = articles.filter((article) => article.slug === options.slug);
  }
  if (options?.id) {
    articles = articles.filter((article) => article.id === options.id);
  }
  if (options?.limit) {
    articles = articles.slice(0, Math.max(1, Math.min(options.limit, 50)));
  }

  return articles;
}

export function getPublicArticleBySlug(slug: string, publishedOnly = true) {
  return getPublicArticles({ slug, publishedOnly, limit: 1 })[0] ?? null;
}
