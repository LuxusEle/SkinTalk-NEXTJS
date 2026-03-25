-- Enable REPLICA IDENTITY FULL to ensure all columns are available in the Realtime broadcast
ALTER TABLE orders REPLICA IDENTITY FULL;
