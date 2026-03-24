-- Migration: Create merchant_data table
-- Created: 2026-03-24

CREATE TABLE IF NOT EXISTS merchant_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id VARCHAR(100),
    bank_code VARCHAR(20),
    terminal_id VARCHAR(50),
    merchant_name VARCHAR(255),
    merchant_city VARCHAR(100),
    mcc VARCHAR(20),
    currency_code VARCHAR(10),
    country_code VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE merchant_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read merchant_data" ON merchant_data FOR SELECT USING (true);
CREATE POLICY "Anyone can insert merchant_data" ON merchant_data FOR INSERT WITH CHECK (true);
