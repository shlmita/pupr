import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jwacaapmefsrijyxnccu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWNhYXBtZWZzcmlqeXhuY2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyODMzOTAsImV4cCI6MjA1NDg1OTM5MH0.teBf7cqk8cxjRJ7kzOs25jnCS122nJfllOwu6ynEfxI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 