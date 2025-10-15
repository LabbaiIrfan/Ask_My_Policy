// src/utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in env.');
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON ?? '');
