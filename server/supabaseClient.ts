// server/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Pobierane z environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient("https://evhgyccanrvmzmncqptc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2aGd5Y2NhbnJ2bXptbmNxcHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzM1NDksImV4cCI6MjA3NjIwOTU0OX0.2RdN4Cx5G5hwjjnKSdFXtP3vlvS-C3X0DwGVwzsYrSE");
                                     
