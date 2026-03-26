-- Add SEO and metadata columns to products table
ALTER TABLE products ADD COLUMN meta_title TEXT;
ALTER TABLE products ADD COLUMN meta_description TEXT;
ALTER TABLE products ADD COLUMN slug TEXT UNIQUE;
ALTER TABLE products ADD COLUMN image_alt TEXT;
ALTER TABLE products ADD COLUMN sku TEXT;

-- Create an index on slug for faster lookups
CREATE INDEX idx_products_slug ON products(slug);
