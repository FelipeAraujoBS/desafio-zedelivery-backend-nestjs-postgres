-- 1️⃣ Extensões necessárias
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2️⃣ Tabela principal
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  trading_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  document TEXT NOT NULL UNIQUE,

  coverage_area geometry(MultiPolygon, 4326) NOT NULL,
  address geometry(Point, 4326) NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3️⃣ Índices espaciais (essenciais)
CREATE INDEX idx_partners_coverage_area
  ON partners
  USING GIST (coverage_area);

CREATE INDEX idx_partners_address
  ON partners
  USING GIST (address);
