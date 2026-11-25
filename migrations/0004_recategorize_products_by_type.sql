-- Reclassify products by generated Product Type instead of source folder path
PRAGMA foreign_keys = OFF;

INSERT OR REPLACE INTO product_categories (id, name, slug, description, sort_order) VALUES
  ('cat_optical_transceiver_module', 'Optical Transceiver Module', 'optical-transceiver-module', 'General optical transceiver modules for fiber access, telecom transmission and enterprise networks.', 10),
  ('cat_sfp_optical_transceiver', 'SFP Optical Transceiver', 'sfp-optical-transceiver', 'SFP optical transceivers for Fast Ethernet, Gigabit Ethernet and legacy optical networks.', 20),
  ('cat_sfp_plus_optical_transceiver', 'SFP+ Optical Transceiver', 'sfp-plus-optical-transceiver', '10G SFP+ optical transceivers for data center, carrier and enterprise network applications.', 30),
  ('cat_cwdm_optical_transceiver', 'CWDM Optical Transceiver', 'cwdm-optical-transceiver', 'CWDM optical transceivers with multiple wavelength options for wavelength-division multiplexing networks.', 40),
  ('cat_copper_rj45_transceiver', 'Copper RJ45 Transceiver', 'copper-rj45-transceiver', 'Copper RJ45 transceiver modules for Ethernet transmission over twisted-pair copper cabling.', 50),
  ('cat_active_optical_cable', 'Active Optical Cable', 'active-optical-cable', 'AOC active optical cables for high-speed data center interconnect applications.', 60),
  ('cat_direct_attach_copper_cable', 'Direct Attach Copper Cable', 'direct-attach-copper-cable', 'DAC direct attach copper cables for short-distance high-speed equipment interconnection.', 70);

UPDATE products
SET category_id = CASE json_extract(specifications, '$."Product Type"')
  WHEN 'SFP Optical Transceiver' THEN 'cat_sfp_optical_transceiver'
  WHEN 'SFP+ Optical Transceiver' THEN 'cat_sfp_plus_optical_transceiver'
  WHEN 'CWDM Optical Transceiver' THEN 'cat_cwdm_optical_transceiver'
  WHEN 'Copper RJ45 Transceiver' THEN 'cat_copper_rj45_transceiver'
  WHEN 'Active Optical Cable' THEN 'cat_active_optical_cable'
  WHEN 'Direct Attach Copper Cable' THEN 'cat_direct_attach_copper_cable'
  ELSE 'cat_optical_transceiver_module'
END;

DELETE FROM product_categories
WHERE id NOT IN (
  SELECT DISTINCT category_id FROM products WHERE category_id IS NOT NULL
);

PRAGMA foreign_keys = ON;
