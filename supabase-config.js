const SUPABASE_URL = "https://akiuzveglknlwcqnczfl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_6UV-xg2rU6nAWgd9c-BIPQ_if-sdbM3";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
