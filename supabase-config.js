// Supabase connection settings for ARİJ OYUNU
// IMPORTANT: Put only your Supabase Project URL and Publishable Key here.
// NEVER put a Supabase secret/service_role key in this file.
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

if (!window.supabaseClient && window.supabase && SUPABASE_URL.startsWith("http")) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
