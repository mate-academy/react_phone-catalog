import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kcdxmxtgppcaorrgyqnv.supabase.co';
const supabasePublishableKey = 'sb_publishable_vUw-kR1_cez09_CZt-dOkw_hSIQdZE9';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
