-- Seed data for Baoshan CMS on Cloudflare D1

INSERT INTO admin_users (id, email, password_salt, password_hash, display_name)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@example.com',
  'baoshan-admin-salt',
  '5c24ec811d45c257b4ee78f783619eb30d4d4af326118e8628103c1aad5f1dea',
  'System Administrator'
)
ON CONFLICT(id) DO UPDATE SET
  email = excluded.email,
  password_salt = excluded.password_salt,
  password_hash = excluded.password_hash,
  display_name = excluded.display_name;

INSERT INTO product_categories (id, name, slug, description, sort_order)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'Optical Fiber Cables', 'optical-fiber-cables', 'Various optical fiber cable products for communication network construction', 1),
  ('20000000-0000-0000-0000-000000000002', 'Optical Modules', 'optical-modules', 'High-speed optical transceiver modules supporting multiple rates and interfaces', 2),
  ('20000000-0000-0000-0000-000000000003', 'Passive Optical Components', 'passive-optical-components', 'Splitters, connectors, adapters and other passive components', 3),
  ('20000000-0000-0000-0000-000000000004', 'Active Equipment', 'active-equipment', 'OLT, ONU and other active optical network equipment', 4),
  ('20000000-0000-0000-0000-000000000005', 'Test Instruments', 'test-instruments', 'Fiber testing, OTDR and network test instruments', 5)
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  sort_order = excluded.sort_order;

INSERT INTO site_settings (id, "key", label, value)
VALUES
  ('30000000-0000-0000-0000-000000000001', 'site_name', 'Site Name', 'Baoshan Optical'),
  ('30000000-0000-0000-0000-000000000002', 'site_tagline', 'Site Tagline', 'Professional Optical Communication Products and Solutions'),
  ('30000000-0000-0000-0000-000000000003', 'company_name', 'Company Name', 'Baoshan Optical Communication Technology Co., Ltd.'),
  ('30000000-0000-0000-0000-000000000004', 'company_address', 'Company Address', 'Baoshan District, Shanghai'),
  ('30000000-0000-0000-0000-000000000005', 'company_phone', 'Contact Phone', '021-XXXXXXXX'),
  ('30000000-0000-0000-0000-000000000006', 'company_email', 'Email Address', 'info@baoshan-optic.com'),
  ('30000000-0000-0000-0000-000000000007', 'icp_number', 'ICP Filing Number', 'ICP XXXXXXXXXXX'),
  ('30000000-0000-0000-0000-000000000008', 'about_content', 'About Us Content', 'Baoshan Optical Communication Technology Co., Ltd. specializes in the R&D, production and sales of optical communication products, committed to providing customers with high-quality optical fibers, cables, optical modules and system solutions.'),
  ('30000000-0000-0000-0000-000000000009', 'wechat_qrcode', 'WeChat QR Code URL', NULL),
  ('30000000-0000-0000-0000-000000000010', 'footer_description', 'Footer Description', 'Professional Optical Communication Products and Solutions')
ON CONFLICT(id) DO UPDATE SET
  "key" = excluded."key",
  label = excluded.label,
  value = excluded.value;

INSERT INTO banners (id, title, subtitle, image_url, link_url, link_text, sort_order, is_active)
VALUES
  ('40000000-0000-0000-0000-000000000001', 'Leading Optical Communication Solutions', 'Specializing in optical fibers, cables, optical modules and system integration, serving global customers', '/images/banner-1.jpg', '/products', 'View Products', 1, 1),
  ('40000000-0000-0000-0000-000000000002', 'New Generation 400G Optical Modules', 'Meeting high-speed interconnect needs for data centers, supporting single-mode and multi-mode fiber', '/images/banner-2.jpg', '/products/400g-optical-module', 'Learn More', 2, 1),
  ('40000000-0000-0000-0000-000000000003', 'FTTH All-Optical Network Solutions', 'End-to-end fiber-to-home solutions, helping operators upgrade their networks', '/images/banner-3.jpg', '/products', 'Learn More', 3, 1)
ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  subtitle = excluded.subtitle,
  image_url = excluded.image_url,
  link_url = excluded.link_url,
  link_text = excluded.link_text,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

INSERT INTO products (id, category_id, name, slug, summary, description, specifications, image_url, is_featured, is_published, sort_order)
VALUES
  (
    '50000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Single-Mode Fiber Patch Cord LC-LC',
    'sm-fiber-patch-cord-lc-lc',
    'Low insertion loss, high return loss single-mode fiber patch cord, suitable for inter-equipment and intra-rack connections',
    'This product uses high-quality single-mode fiber and precision ceramic ferrules, featuring low insertion loss, high return loss, and good interchangeability.',
    '{"Fiber Type":"G.652D Single-Mode","Connector Type":"LC/UPC-LC/UPC","Insertion Loss":"<=0.3dB","Return Loss":">=50dB","Wavelength":"1310/1550nm","Jacket Color":"Yellow"}',
    NULL,
    1,
    1,
    1
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000002',
    'SFP+ 10G Optical Module',
    'sfp-plus-10g-optical-module',
    '10Gbps optical transceiver module compliant with SFP+ MSA standard, supporting 10GBase-LR',
    'This module uses DFB laser and PIN photodetector, featuring low power consumption and stable transmission.',
    '{"Rate":"10.3125 Gbps","Interface Type":"SFP+","Transmission Distance":"10km","Transmit Wavelength":"1310nm","Fiber Type":"Single-Mode (SMF)","Connector":"LC Duplex"}',
    NULL,
    1,
    1,
    2
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000003',
    '1x8 PLC Splitter',
    'plc-splitter-1x8',
    '1x8 optical splitter manufactured with planar waveguide technology, uniform insertion loss, compact size',
    'Manufactured using PLC technology, offering good uniformity and a wide operating wavelength range for FTTH/GPON/EPON networks.',
    '{"Splitting Ratio":"1x8","Wavelength Range":"1260~1650nm","Insertion Loss":"<=10.8dB","Uniformity":"<=0.8dB","Return Loss":">=55dB"}',
    NULL,
    1,
    1,
    3
  )
ON CONFLICT(id) DO UPDATE SET
  category_id = excluded.category_id,
  name = excluded.name,
  slug = excluded.slug,
  summary = excluded.summary,
  description = excluded.description,
  specifications = excluded.specifications,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order;

INSERT INTO articles (id, title, slug, summary, content, cover_image_url, is_featured, is_published, published_at)
VALUES
  (
    '60000000-0000-0000-0000-000000000001',
    '400G Optical Module Market Analysis: Data Centers Drive Continued Growth',
    '400g-optical-module-market-analysis',
    'Data center demand for high-speed interconnects continues to rise, and the 400G optical module market is entering rapid growth.',
    'With the rapid development of cloud computing, big data, and artificial intelligence, global data center traffic continues to grow. 400G optical modules are becoming mainstream high-speed interconnect products for data centers.\n\n## Technology Trends\n\n- DR4 for short-distance data center interconnects\n- FR4 for 2km WDM connections\n- LR4 for longer-distance scenarios',
    NULL,
    1,
    1,
    datetime('now', '-3 days')
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'FTTH Construction Accelerates, Optical Fiber Access Network Coverage Continues to Expand',
    'ftth-construction-acceleration',
    'Gigabit fiber users continue to expand, and FTTH construction has entered a new stage.',
    'Fiber-to-the-home construction continues to expand, driving demand for optical fiber cables, splitters, connectors, OLT and ONU equipment.',
    NULL,
    1,
    1,
    datetime('now', '-7 days')
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    'Optical Fiber Communication Technology Development History and Future Trends',
    'optical-fiber-communication-history-and-future',
    'Fiber optic communication technology has developed for decades and is moving towards higher speed and greater capacity.',
    'From early multimode systems to coherent detection and dense wavelength division multiplexing, fiber optic communication continues to evolve.',
    NULL,
    0,
    1,
    datetime('now', '-14 days')
  )
ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  slug = excluded.slug,
  summary = excluded.summary,
  content = excluded.content,
  cover_image_url = excluded.cover_image_url,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  published_at = excluded.published_at;

INSERT INTO nav_items (id, label, href, sort_order, is_visible)
VALUES
  ('70000000-0000-0000-0000-000000000001', 'Home', '/', 1, 1),
  ('70000000-0000-0000-0000-000000000002', 'Products', '/products', 2, 1),
  ('70000000-0000-0000-0000-000000000003', 'News', '/news', 3, 1),
  ('70000000-0000-0000-0000-000000000004', 'About', '/about', 4, 1),
  ('70000000-0000-0000-0000-000000000005', 'Contact', '/contact', 5, 1)
ON CONFLICT(id) DO UPDATE SET
  label = excluded.label,
  href = excluded.href,
  sort_order = excluded.sort_order,
  is_visible = excluded.is_visible;
