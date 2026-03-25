-- Enable real-time for the orders table so the frontend can listen for payment confirmations
BEGIN;
  -- Add the 'orders' table to the 'supabase_realtime' publication
  -- This allows the client to subscribe to changes using supabase.channel()
  ALTER PUBLICATION supabase_realtime ADD TABLE orders;
COMMIT;
