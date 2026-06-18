import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://rbbxfltbbjmolwwnyqmf.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYnhmbHRiYmptb2x3d255cW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzQ4MzgsImV4cCI6MjA5NzM1MDgzOH0.HAHUQF3Hbe5msKZVhWNg7qsI6E9dxLjlPtUXjXqkAEc';

export const supabase = createClient(supabaseUrl, supabaseKey);
