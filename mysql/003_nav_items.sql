SET NAMES utf8mb4;

-- Navigation items table for configurable site navigation
CREATE TABLE IF NOT EXISTS nav_items (
  id CHAR(36) NOT NULL PRIMARY KEY,
  label VARCHAR(100) NOT NULL COMMENT 'Navigation text',
  href VARCHAR(500) NOT NULL COMMENT 'Link URL',
  sort_order INT NOT NULL DEFAULT 0 COMMENT 'Display order',
  is_visible TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Whether to show',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nav_items_sort_order (sort_order),
  INDEX idx_nav_items_is_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default navigation items
INSERT INTO nav_items (id, label, href, sort_order, is_visible)
VALUES
  ('70000000-0000-0000-0000-000000000001', 'Home', '/', 1, 1),
  ('70000000-0000-0000-0000-000000000002', 'Products', '/products', 2, 1),
  ('70000000-0000-0000-0000-000000000003', 'News', '/news', 3, 1),
  ('70000000-0000-0000-0000-000000000004', 'About', '/about', 4, 1),
  ('70000000-0000-0000-0000-000000000005', 'Contact', '/contact', 5, 1)
ON DUPLICATE KEY UPDATE
  label = VALUES(label),
  href = VALUES(href),
  sort_order = VALUES(sort_order),
  is_visible = VALUES(is_visible);
