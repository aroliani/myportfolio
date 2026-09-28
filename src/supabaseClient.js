import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Resilient initialization: Prevents application crash if .env credentials are not yet set
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        insert: async () => {
          console.warn('Supabase credentials (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are not set. Question logging skipped.');
          return { error: null };
        },
        select: async () => ({ data: [], error: null }),
      }),
    };