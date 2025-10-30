
-- Create storage bucket for product verification images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-verifications',
  'product-verifications',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for product verification images
CREATE POLICY "Users can upload their own verification images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-verifications' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own verification images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'product-verifications' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own verification images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-verifications' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add digital_twin_data column to products table for NFT metadata
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS digital_twin_data jsonb DEFAULT NULL;

-- Add blockchain_hash column for verification
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS blockchain_hash text DEFAULT NULL;

COMMENT ON COLUMN public.products.digital_twin_data IS 'JSON metadata for the digital twin/NFT representation';
COMMENT ON COLUMN public.products.blockchain_hash IS 'Blockchain verification hash';
