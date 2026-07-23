import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gqonqrwgvfqioxcghrmg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hDM2H9lkTMFl3yAg4OXtPA_kMzn4O8c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
