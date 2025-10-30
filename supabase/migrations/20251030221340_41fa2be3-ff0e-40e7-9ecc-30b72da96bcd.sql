
-- Make the product-verifications bucket public so AI can access images
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-verifications';
