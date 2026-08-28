const env = (typeof import.meta !== "undefined" && import.meta.env) || {};
const url = env.VITE_SUPABASE_URL || "https://kvabjueeywumbufbrkzr.supabase.co";
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_oiWIwYuE3-_jcKpTuPKopQ_B4ZY2CEg";

window.lmsSupabaseUrl = url;
window.lmsSupabaseKey = key;

function sessionKey() {
  try {
    return "sb-" + new URL(url).hostname.split(".")[0] + "-auth-token";
  } catch (e) {
    return "lms-sb-session";
  }
}

function readSession() {
  try {
    const raw = localStorage.getItem(sessionKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.currentSession || parsed;
  } catch (e) {
    return null;
  }
}

function writeSession(session) {
  if (!session) {
    localStorage.removeItem(sessionKey());
    return;
  }
  localStorage.setItem(sessionKey(), JSON.stringify(session));
}

async function authFetch(path, method, body, token) {
  const res = await fetch(url + "/auth/v1/" + path, {
    method,
    headers: {
      apikey: key,
      Authorization: "Bearer " + (token || key),
      "Content-Type": "application/json"
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { message: text };
  }
  if (!res.ok) {
    const message =
      (data && (data.error_description || data.msg || data.message || data.error)) ||
      text ||
      res.status;
    return { data: null, error: { message } };
  }
  return { data, error: null };
}

function createAuthClient() {
  return {
    auth: {
      async getSession() {
        return { data: { session: readSession() }, error: null };
      },
      async getUser() {
        const session = readSession();
        if (!session?.access_token) return { data: { user: null }, error: null };
        const { data, error } = await authFetch("user", "GET", undefined, session.access_token);
        return { data: { user: data }, error };
      },
      async signUp({ email, password, options }) {
        const { data, error } = await authFetch("signup", "POST", {
          email,
          password,
          data: (options && options.data) || {}
        });
        if (data?.access_token) writeSession(data);
        return { data: { user: data && (data.user || data), session: data }, error };
      },
      async signInWithPassword({ email, password }) {
        const { data, error } = await authFetch("token?grant_type=password", "POST", {
          email,
          password
        });
        if (data?.access_token) writeSession(data);
        return { data: { user: data && data.user, session: data }, error };
      },
      async updateUser(attrs) {
        const session = readSession();
        if (!session?.access_token) {
          return { data: { user: null }, error: { message: "Not signed in" } };
        }
        const body = {};
        if (attrs.password) body.password = attrs.password;
        if (attrs.data) body.data = attrs.data;
        const { data, error } = await authFetch("user", "PUT", body, session.access_token);
        if (data && session) {
          session.user = data;
          writeSession(session);
        }
        return { data: { user: data }, error };
      },
      async signOut() {
        const session = readSession();
        if (session?.access_token) {
          await authFetch("logout", "POST", {}, session.access_token);
        }
        writeSession(null);
        return { error: null };
      }
    }
  };
}

if (!url || !key) {
  console.error(
    "Supabase: missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY"
  );
  window.lmsSupabase = null;
} else {
  window.lmsSupabase = createAuthClient();
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
