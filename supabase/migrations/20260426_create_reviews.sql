-- Запусти этот SQL в Supabase Dashboard → SQL Editor

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  vehicle_model text,
  rating integer NOT NULL DEFAULT 5,
  review_text text NOT NULL,
  review_date date NOT NULL,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviews_rating_check CHECK (rating >= 1 AND rating <= 5)
);

-- RLS: публичный read только видимых отзывов
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read visible reviews"
  ON reviews FOR SELECT
  USING (is_visible = true);
