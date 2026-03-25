-- Migration: Add item_code to products table
-- Created: 2026-03-26

ALTER TABLE products ADD COLUMN IF NOT EXISTS item_code VARCHAR(50);
