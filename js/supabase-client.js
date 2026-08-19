import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

window.lmsSupabaseUrl = url || "";
window.lmsSupabaseKey = key || "";

if (!url || !key) {
  console.error(
    "Supabase: missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local"
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
