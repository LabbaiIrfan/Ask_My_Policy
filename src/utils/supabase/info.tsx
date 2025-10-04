import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://uizanrvvlwqjfogizmzs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpemFucnZ2bHdxamZvZ2l6bXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NTgwODEsImV4cCI6MjA3NTEzNDA4MX0.zyswFWJ8A_ZvTWQHzeEtXkw0bCwPP8T2hdS-RfQFxck"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)