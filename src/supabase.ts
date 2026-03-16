import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// URL de tu proyecto
const supabaseUrl = 'https://scqczncnnfgpckjoylgn.supabase.co'

// API KEY pública
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcWN6bmNubmZncGNram95bGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDMyMjIsImV4cCI6MjA4ODkxOTIyMn0.89H6kg1Pj9h3HMa4eT-sEtQmJoUzvGZ9yL_diLqW2T0'

// Crear cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipo para la tabla messages
export interface Message {
  id: number
  content: string
  created_at: string
  updated_at: string
}


// SQL para crear un mensaje
// CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   content TEXT NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );


// ALTER TABLE messages ENABLE ROW LEVEL SECURITY;


// CREATE POLICY "Allow public access" ON messages
//   FOR ALL USING (true) WITH CHECK (true);

