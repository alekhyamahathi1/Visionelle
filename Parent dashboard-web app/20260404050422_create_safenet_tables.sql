/*
  # SafeNet Parent Control System - Initial Schema

  ## Overview
  Creates the database schema for the SafeNet Parent Control System parent dashboard.
  This system monitors child browsing activity detected by the SafeNet Chrome extension.

  ## New Tables
  
  ### `alerts`
  Stores all content detections and classifications from the child's browser
  - `id` (uuid, primary key) - Unique identifier for each alert
  - `timestamp` (timestamptz) - When the content was detected
  - `device_id` (text) - Identifier for the child's device/browser
  - `url` (text) - The webpage URL where content was detected
  - `title` (text) - The webpage title
  - `content_snippet` (text) - Sample of the detected content
  - `classification` (text) - Classification type: SAFE, HARMFUL, or FAKE
  - `confidence` (numeric) - Confidence score (0-1)
  - `keywords` (jsonb) - Array of keywords that triggered the classification
  - `created_at` (timestamptz) - Database insert timestamp

  ### `keywords`
  Stores custom keywords configured by parents for monitoring
  - `id` (uuid, primary key) - Unique identifier
  - `keyword` (text) - The keyword to monitor
  - `type` (text) - Keyword type: HARMFUL or FAKE
  - `created_at` (timestamptz) - When the keyword was added

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Add policies for authenticated users to manage their own data
  - Future enhancement: Add user_id column to support multi-parent accounts
*/

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  device_id text NOT NULL DEFAULT 'device-001',
  url text NOT NULL,
  title text,
  content_snippet text,
  classification text NOT NULL CHECK (classification IN ('SAFE', 'HARMFUL', 'FAKE')),
  confidence numeric CHECK (confidence >= 0 AND confidence <= 1),
  keywords jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'HARMFUL' CHECK (type IN ('HARMFUL', 'FAKE')),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_classification ON alerts(classification);
CREATE INDEX IF NOT EXISTS idx_alerts_device_id ON alerts(device_id);
CREATE INDEX IF NOT EXISTS idx_keywords_type ON keywords(type);

-- Enable Row Level Security
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

-- RLS Policies for alerts table
CREATE POLICY "Allow all operations on alerts for authenticated users"
  ON alerts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for keywords table
CREATE POLICY "Allow all operations on keywords for authenticated users"
  ON keywords FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert some initial demo data
INSERT INTO keywords (keyword, type) VALUES
  ('threat', 'HARMFUL'),
  ('bully', 'HARMFUL'),
  ('hurt', 'HARMFUL'),
  ('free', 'FAKE'),
  ('giveaway', 'FAKE'),
  ('winner', 'FAKE')
ON CONFLICT (keyword) DO NOTHING;

-- Insert sample alerts for demo purposes
INSERT INTO alerts (timestamp, device_id, url, title, content_snippet, classification, confidence, keywords) VALUES
  (now() - interval '5 minutes', 'device-001', 'https://example.com/social', 'Social Network', 'I will hurt you if you do not comply', 'HARMFUL', 0.92, '["hurt", "threat"]'::jsonb),
  (now() - interval '15 minutes', 'device-001', 'https://example.com/news', 'News Site', 'Latest breaking news about technology', 'SAFE', 0.95, '[]'::jsonb),
  (now() - interval '30 minutes', 'device-001', 'https://example.com/promo', 'Free Prize', 'You are a winner! Click here for your free prize now!', 'FAKE', 0.88, '["free", "winner", "click here"]'::jsonb),
  (now() - interval '1 hour', 'device-001', 'https://example.com/education', 'Khan Academy', 'Learn mathematics for free with interactive lessons', 'SAFE', 0.97, '[]'::jsonb),
  (now() - interval '2 hours', 'device-001', 'https://example.com/chat', 'Chat Room', 'Meet a stranger and share your address', 'HARMFUL', 0.89, '["stranger", "address"]'::jsonb),
  (now() - interval '3 hours', 'device-001', 'https://example.com/sale', 'Limited Offer', 'Act now! Limited time discount guaranteed!', 'FAKE', 0.85, '["act now", "limited time", "guaranteed"]'::jsonb),
  (now() - interval '4 hours', 'device-001', 'https://example.com/wiki', 'Wikipedia', 'Educational article about history', 'SAFE', 0.96, '[]'::jsonb),
  (now() - interval '5 hours', 'device-001', 'https://example.com/forum', 'Forum Post', 'Discussion about violence and weapons', 'HARMFUL', 0.91, '["violence", "weapon"]'::jsonb)
ON CONFLICT DO NOTHING;