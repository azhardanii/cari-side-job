import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wpegsgxkyrhaflksbijm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_XjABixiuqSJXyvMSpGSOXQ_ccV-NnEz';

export const supabase = createClient(supabaseUrl, supabaseKey);
