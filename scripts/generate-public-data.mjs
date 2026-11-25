import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function shellQuote(value) {
  return `"${String(value).replace(/\r?\n/g, " ").replace(/"/g, '\\"')}"`;
}

function query(sql) {
  const command = `npx wrangler d1 execute baoshan_cms --remote --command=${shellQuote(sql)}`;
  const stdout = execSync(command, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
  const jsonStart = stdout.indexOf("[\n");
  if (jsonStart < 0) {
    throw new Error(`Unable to parse wrangler output for query: ${sql}`);
  }
  const payload = JSON.parse(stdout.slice(jsonStart));
  return payload[0]?.results ?? [];
}

const data = {
  generatedAt: new Date().toISOString(),
  settings: query("SELECT id, `key`, value, label, updated_at FROM site_settings ORDER BY `key` ASC"),
  navItems: query("SELECT id, label, href, sort_order, is_visible, created_at, updated_at FROM nav_items ORDER BY sort_order ASC, created_at ASC"),
  banners: query("SELECT id, title, subtitle, image_url, link_url, link_text, sort_order, is_active, created_at, updated_at FROM banners ORDER BY sort_order ASC, created_at DESC"),
  productCategories: query("SELECT id, name, slug, description, sort_order, created_at FROM product_categories ORDER BY sort_order ASC, created_at ASC"),
  products: query(`SELECT
      p.id,
      p.category_id,
      p.name,
      p.slug,
      p.summary,
      p.description,
      p.specifications,
      p.image_url,
      p.is_featured,
      p.is_published,
      p.sort_order,
      p.created_at,
      p.updated_at,
      c.id AS category_ref_id,
      c.name AS category_ref_name,
      c.slug AS category_ref_slug,
      c.description AS category_ref_description,
      c.sort_order AS category_ref_sort_order,
      c.created_at AS category_ref_created_at
    FROM products p
    LEFT JOIN product_categories c ON c.id = p.category_id
    ORDER BY p.sort_order ASC, p.created_at DESC`),
  articles: query("SELECT id, title, slug, summary, content, cover_image_url, is_featured, is_published, published_at, created_at, updated_at FROM articles ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC"),
};

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data", "public-data.json"), `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Generated public data snapshot: ${data.products.length} products, ${data.productCategories.length} categories, ${data.articles.length} articles.`);
