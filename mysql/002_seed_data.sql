SET NAMES utf8mb4;

-- Default admin account for local demo only, change to your own email, salt and password hash in production.
INSERT INTO admin_users (id, email, password_salt, password_hash, display_name)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@example.com',
  'baoshan-admin-salt',
  '5c24ec811d45c257b4ee78f783619eb30d4d4af326118e8628103c1aad5f1dea',
  'System Administrator'
)
ON DUPLICATE KEY UPDATE
  password_salt = VALUES(password_salt),
  password_hash = VALUES(password_hash),
  display_name = VALUES(display_name);

INSERT INTO product_categories (id, name, slug, description, sort_order)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'Optical Fiber Cables', 'optical-fiber-cables', 'Various optical fiber cable products for communication network construction', 1),
  ('20000000-0000-0000-0000-000000000002', 'Optical Modules', 'optical-modules', 'High-speed optical transceiver modules supporting multiple rates and interfaces', 2),
  ('20000000-0000-0000-0000-000000000003', 'Passive Optical Components', 'passive-optical-components', 'Splitters, connectors, adapters and other passive components', 3),
  ('20000000-0000-0000-0000-000000000004', 'Active Equipment', 'active-equipment', 'OLT, ONU and other active optical network equipment', 4),
  ('20000000-0000-0000-0000-000000000005', 'Test Instruments', 'test-instruments', 'Fiber testing, OTDR and network test instruments', 5)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  sort_order = VALUES(sort_order);

INSERT INTO site_settings (id, `key`, label, value)
VALUES
  ('30000000-0000-0000-0000-000000000001', 'site_name', 'Site Name', 'Baoshan Optical'),
  ('30000000-0000-0000-0000-000000000002', 'site_tagline', 'Site Tagline', 'Professional Optical Communication Products and Solutions'),
  ('30000000-0000-0000-0000-000000000003', 'company_name', 'Company Name', 'Baoshan Optical Communication Technology Co., Ltd.'),
  ('30000000-0000-0000-0000-000000000004', 'company_address', 'Company Address', 'Baoshan District, Shanghai'),
  ('30000000-0000-0000-0000-000000000005', 'company_phone', 'Contact Phone', '021-XXXXXXXX'),
  ('30000000-0000-0000-0000-000000000006', 'company_email', 'Email Address', 'info@baoshan-optic.com'),
  ('30000000-0000-0000-0000-000000000007', 'icp_number', 'ICP Filing Number', 'ICP XXXXXXXXXXX号'),
  ('30000000-0000-0000-0000-000000000008', 'about_content', 'About Us Content', 'Baoshan Optical Communication Technology Co., Ltd. specializes in the R&D, production and sales of optical communication products, committed to providing customers with high-quality optical fibers, cables, optical modules and system solutions.'),
  ('30000000-0000-0000-0000-000000000009', 'wechat_qrcode', 'WeChat QR Code URL', NULL),
  ('30000000-0000-0000-0000-000000000010', 'footer_description', 'Footer Description', 'Professional Optical Communication Products and Solutions')
ON DUPLICATE KEY UPDATE
  label = VALUES(label),
  value = VALUES(value);

INSERT INTO banners (id, title, subtitle, image_url, link_url, link_text, sort_order, is_active)
VALUES
  ('40000000-0000-0000-0000-000000000001', 'Leading Optical Communication Solutions', 'Specializing in optical fibers, cables, optical modules and system integration, serving global customers', '/images/banner-1.jpg', '/products', 'View Products', 1, 1),
  ('40000000-0000-0000-0000-000000000002', 'New Generation 400G Optical Modules', 'Meeting high-speed interconnect needs for data centers, supporting single-mode/multi-mode fiber', '/images/banner-2.jpg', '/products/400g-optical-module', 'Learn More', 2, 1),
  ('40000000-0000-0000-0000-000000000003', 'FTTH All-Optical Network Solutions', 'End-to-end fiber-to-home solutions, helping operators upgrade their networks', '/images/banner-3.jpg', '/products', 'Learn More', 3, 1)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  subtitle = VALUES(subtitle),
  image_url = VALUES(image_url),
  link_url = VALUES(link_url),
  link_text = VALUES(link_text),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO products (
  id, category_id, name, slug, summary, description, specifications, image_url,
  is_featured, is_published, sort_order
)
VALUES
  (
    '50000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Single-Mode Fiber Patch Cord LC-LC',
    'sm-fiber-patch-cord-lc-lc',
    'Low insertion loss, high return loss single-mode fiber patch cord, suitable for inter-equipment and intra-rack connections',
    'This product uses high-quality single-mode fiber and precision ceramic ferrules, featuring low insertion loss, high return loss, and good interchangeability. Widely used in communication networks, data centers, cable TV and other fields.',
    JSON_OBJECT('Fiber Type', 'G.652D Single-Mode', 'Connector Type', 'LC/UPC-LC/UPC', 'Insertion Loss', '≤0.3dB', 'Return Loss', '≥50dB', 'Wavelength', '1310/1550nm', 'Jacket Color', 'Yellow', 'Jacket Material', 'PVC', 'Cable Diameter', '2.0mm or 3.0mm'),
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
    'This module uses DFB laser and PIN photodetector, featuring low power consumption and stable transmission. Widely used for 10G Ethernet and SDH applications in data centers, enterprise networks and carrier networks.',
    JSON_OBJECT('Rate', '10.3125 Gbps', 'Interface Type', 'SFP+', 'Transmission Distance', '10km', 'Transmit Wavelength', '1310nm', 'Fiber Type', 'Single-Mode (SMF)', 'Connector', 'LC Duplex', 'Operating Voltage', '3.3V', 'Power Consumption', '≤1.5W', 'Operating Temperature', '0~70°C'),
    NULL,
    1,
    1,
    2
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000003',
    '1×8 PLC Splitter',
    'plc-splitter-1x8',
    '1×8 optical splitter manufactured with planar waveguide technology, uniform insertion loss, compact size',
    'Manufactured using PLC (Planar Lightwave Circuit) technology, offering better uniformity and wider operating wavelength range compared to traditional FBT fused biconical taper splitters, suitable for FTTH/GPON/EPON network splitting.',
    JSON_OBJECT('Splitting Ratio', '1×8', 'Wavelength Range', '1260~1650nm', 'Insertion Loss', '≤10.8dB', 'Uniformity', '≤0.8dB', 'Return Loss', '≥55dB', 'Package Type', 'ABS Box', 'Connector', 'SC/APC or SC/UPC'),
    NULL,
    1,
    1,
    3
  )
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id),
  name = VALUES(name),
  summary = VALUES(summary),
  description = VALUES(description),
  specifications = VALUES(specifications),
  image_url = VALUES(image_url),
  is_featured = VALUES(is_featured),
  is_published = VALUES(is_published),
  sort_order = VALUES(sort_order);

INSERT INTO articles (
  id, title, slug, summary, content, cover_image_url, is_featured, is_published, published_at
)
VALUES
  (
    '60000000-0000-0000-0000-000000000001',
    '400G Optical Module Market Analysis: Data Centers Drive Continued Growth',
    '400g-optical-module-market-analysis',
    'With the rapid development of cloud computing and AI large models, data center demand for high-speed interconnects continues to rise, and the 400G optical module market is entering a period of rapid growth.',
    'With the rapid development of emerging technologies such as cloud computing, big data, and artificial intelligence, global data center traffic continues to explode, and the demand for high-speed optical interconnects is becoming increasingly urgent. 400G optical modules, as the current mainstream high-speed interconnect solutions for data centers, have strong market demand.

## Market Status

According to relevant institution forecasts, global 400G optical module shipments will exceed 20 million units in 2024, a year-on-year increase of more than 50%. Among them, North American hyperscale data center vendors are still the main purchasers, while domestic cloud computing vendors\" demand is also growing rapidly.

## Technology Trends

- **DR4**: Uses 4-channel ×100G PAM4 modulation, suitable for intra-data center interconnects within 500m
- **FR4**: Also 4-channel ×100G, but uses WDM multiplexing, suitable for 2km connections
- **LR4**: Long-distance solution, supporting 10km transmission

## Domestic Substitution Accelerates

Against the backdrop of international trade friction, domestic optical module manufacturers are increasing R&D investment, product performance is gradually improving, and some manufacturers have achieved large-scale shipments, accelerating the domestic substitution of optical modules.

## Outlook

In the next two years, 800G optical modules will gradually enter mass deployment, 1.6T optical module R&D is also actively advancing, and the optical communication industry will continue to maintain high prosperity.',
    NULL,
    1,
    1,
    DATE_SUB(NOW(), INTERVAL 3 DAY)
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'FTTH Construction Accelerates, Optical Fiber Access Network Coverage Continues to Expand',
    'ftth-construction-acceleration',
    'According to MIIT data, the number of optical fiber access ports continues to grow, gigabit fiber users continue to expand, and FTTH construction has entered a new stage.',
    'In recent years, China has accelerated the "dual gigabit" network construction, and fiber-to-the-home (FTTH) construction has achieved remarkable results.

## Construction Achievements

According to the latest data from the Ministry of Industry and Information Technology, fiber access users account for more than 95% of China\"s fixed broadband access users, and gigabit users have exceeded 150 million, ranking first globally.

## Technology Upgrades

- **GPON to XGS-PON**: Supports symmetrical 10Gbps rates, meeting the bandwidth needs of HD video, cloud gaming and other high-bandwidth applications
- **50G PON Standardization**: ITU-T has released relevant standards, domestic operators are actively promoting pilots
- **WDM PON**: Improves utilization of existing optical fiber infrastructure

## Industry Opportunities

The acceleration of FTTH construction has driven market demand for optical fiber cables, splitters, fiber connectors and other passive components, as well as OLT, ONU and other active equipment, providing good development opportunities for the optical communication industry chain.',
    NULL,
    1,
    1,
    DATE_SUB(NOW(), INTERVAL 7 DAY)
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    'Optical Fiber Communication Technology Development History and Future Trends',
    'optical-fiber-communication-history-and-future',
    'From the first commercial fiber line in the 1970s to today\"s ultra-high-speed backbone network, fiber optic communication technology has gone through fifty years of development and is moving towards higher speeds and greater capacity.',
    'Fiber optic communication technology has evolved over several generations since its birth in the 1970s, profoundly changing the global communication landscape.

## Development History

**First Generation (1980s)**: 850nm band, 45Mbps rate, multimode fiber

**Second Generation (late 1980s)**: 1310nm band, 140Mbps rate, single-mode fiber, chromatic dispersion minimized

**Third Generation (1990s)**: 1550nm band, 2.5Gbps rate, using EDFA optical amplifiers

**Fourth Generation (2000s)**: DWDM dense wavelength division multiplexing, single-fiber capacity Tbps-level

**Fifth Generation (current)**: Coherent detection + software-defined, single-wave 400G/800G

## Key Technology Breakthroughs

- **Coherent Detection**: Significantly improved spectral efficiency, single-wave rate from 100G to 400G/800G
- **High-Order Modulation**: 16QAM, 64QAM and other high-order modulation formats
- **Space Division Multiplexing (SDM)**: Multi-core fiber, few-mode fiber, breaking single-fiber capacity limits

## Future Outlook

1. Single-wave rate 1.6Tbps and above
2. Commercialization of space division multiplexing technology
3. Fusion of quantum communication and classical fiber communication
4. Silicon photonics technology to reduce optical module cost and power consumption',
    NULL,
    0,
    1,
    DATE_SUB(NOW(), INTERVAL 14 DAY)
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  content = VALUES(content),
  cover_image_url = VALUES(cover_image_url),
  is_featured = VALUES(is_featured),
  is_published = VALUES(is_published),
  published_at = VALUES(published_at);
