-- Migration: Add name and contact_number to user_profiles
-- Created: 2026-03-26

-- Add columns to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS contact_number TEXT;

-- Update function to handle new user signup with metadata
-- This extracts 'name' and 'contact_number' from the user's raw metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, name, contact_number)
    VALUES (
        NEW.id, 
        NEW.email, 
        (NEW.raw_user_meta_data->>'name')::TEXT, 
        (NEW.raw_user_meta_data->>'contact_number')::TEXT
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        contact_number = EXCLUDED.contact_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-sync existing metadata (optional, if any users already have metadata)
UPDATE user_profiles p
SET 
    name = (u.raw_user_meta_data->>'name')::TEXT,
    contact_number = (u.raw_user_meta_data->>'contact_number')::TEXT
FROM auth.users u
WHERE p.id = u.id;
