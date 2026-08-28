import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Safely access environment variables, falling back to credentials when running directly in the browser on GitHub Pages
const env = (typeof import.meta !== "undefined" && import.meta.env) || {};
const url = env.VITE_SUPABASE_URL || "https://kvabjueeywumbufbrkzr.supabase.co";
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_oiWIwYuE3-_jcKpTuPKopQ_B4ZY2CEg";

window.lmsSupabaseUrl = url;
window.lmsSupabaseKey = key;

if (!url || !key) {
  console.error(
    "Supabase: missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY"
  );
  window.lmsSupabase = null;
} else {
  window.lmsSupabase = createClient(url, key);
}

window.lmsDb = {
  async request(path, method, body) {
    if (!url || !key) return { ok: false, error: "missing supabase env" };
    const res = await fetch(`${url}/rest/v1/${path}`, {
      method,
      headers: {
        apikey: key,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }
    if (!res.ok) {
      const msg = (data && data.message) || text || res.status;
      console.error("Table write failed:", path, msg);
      return { ok: false, error: msg, data };
    }
    return { ok: true, data };
  }
};

window.dispatchEvent(new Event("lms-ready"));
