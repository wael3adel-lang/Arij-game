// Supabase connection settings for ARİJ OYUNU
// IMPORTANT: Put only your Supabase Project URL and Publishable Key here.
// NEVER put a Supabase secret/service_role key in this file.

const SUPABASE_URL = "https://akiuzveglknlwcqnczfl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_6UV-xg2rU6nAWgd9c-BIPQ_if-sdbM3";

if (
  !window.supabaseClient &&
  window.supabase &&
  SUPABASE_URL.startsWith("http")
) {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}
