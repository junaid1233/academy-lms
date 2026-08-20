(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function stars(n) {
    const full = Math.round(n);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function catName(id) {
    return (LMS.categories.find((c) => c.id === id) || { name: id }).name;
  }

  function courseImg(c) {
    return LMS.courseImages[c.id] || "https://picsum.photos/seed/" + encodeURIComponent(c.id) + "/800/500";
  }

  const LECTURE_STEMS = {
    basics: ["Power on and log in", "Mouse, keyboard, and cursor", "Desktop, taskbar, and windows", "Files versus folders", "Copy, cut, paste, undo", "USB drives and saving work", "Windows settings that matter", "Install and remove an app", "Print and PDF", "Keyboard shortcuts", "Search on this PC", "Recycle bin and restore", "User accounts", "Display, sound, and wifi", "A tidy desktop habit"],
    web: ["HTML document skeleton", "Headings, paragraphs, and text", "Links and images", "Lists and tables", "Forms and inputs", "CSS selectors", "The box model", "Flexbox layouts", "CSS Grid", "Responsive breakpoints", "Accessible labels", "A page you can deploy", "Navbar and footer", "Cards and hero", "Debug in the browser"],
    programming: ["Tools and first file", "Variables and types", "Conditions and branches", "Loops that stop", "Functions you reuse", "Arrays and lists", "Objects and maps", "Errors and reading them", "Small algorithms", "Input and output", "A mini project", "Refactor messy code", "Comments that help", "Test a function", "Ship a script"],
    datascience: ["A question before a chart", "Tables and columns", "Clean missing values", "Filters and groups", "Simple plots", "Pandas in practice", "Join two tables", "A one-page finding", "Notebooks vs scripts", "Outliers and lies", "Export a report", "SQL into Python", "Time series peek", "Share the notebook", "Review a peer chart"],
    ai: ["What a model is not", "Train, val, test split", "Features that leak", "A baseline first", "Overfit on purpose", "Metrics that match the job", "A small neural net", "PyTorch tensors", "Prompt patterns", "RAG with your notes", "Guardrails", "Evaluate without hype", "Ship a demo", "Read a paper slowly", "Ethics in the lab"],
    cloud: ["Accounts and regions", "IAM without drama", "A VPC you can draw", "Linux on a server", "SSH and keys", "Docker image", "Compose locally", "Kubernetes pod", "Health probes", "Terraform state", "Logs and alarms", "A rebuildable lab", "Cost on the bill", "Secrets, not slides", "Roll forward, not panic"],
    security: ["Threat vs vulnerability", "Passwords and phishing", "IP, DNS, and ports", "Packets you can read", "Permissions on a box", "Scope of a lab", "Defense in layers", "Logs that tell a story", "A written report", "OWASP in plain talk", "Network map", "Backup and restore", "Incident timeline", "Only systems you own", "Ethics before tools"],
    mobile: ["Project and emulator", "First screen", "Layouts that flex", "Lists from data", "Navigation", "State that survives", "Talk to an API", "Images and assets", "A build you install", "Kotlin or Dart basics", "Forms on a phone", "Back button traps", "Store listing notes", "Crash you can reproduce", "Test on a cheap phone"],
    cs: ["Problem before code", "Time and space", "Arrays and hashing", "Stacks and queues", "Trees", "Graphs in words", "Recursion with a trace", "Sorting you can explain", "A proof sketch", "Memory model", "Concurrency caution", "Design a component", "Trade-offs on a board", "Interview out loud", "Review a PR"],
    db: ["Tables and keys", "SELECT with a purpose", "WHERE and ORDER", "JOIN without cartesian mess", "GROUP BY", "Indexes that help", "Insert, update, delete", "Transactions", "A schema you can defend", "MySQL vs the idea", "A business question", "Explain the grain", "Views", "Backup a database", "Read an EXPLAIN"],
    math: ["Notation without fear", "Sets and logic", "Functions as maps", "Linear equations", "Vectors you can draw", "Matrices as actions", "Probability in one page", "Distributions", "Sampling", "A worked example", "Proof structure", "Discrete vs continuous", "For ML, what matters", "Exercises, then rest", "Check your grain"],
    design: ["See before you draw", "Type and hierarchy", "Spacing as a system", "Color with contrast", "Figma file tour", "Components", "Handoff to HTML", "Annotate a screenshot", "Crop and export", "Mobile frames", "Accessibility in UI", "A critique session", "Portfolio crop", "Match the mock", "Ship the pixels"],
    career: ["Story of one project", "Resume that scans", "GitHub that reads", "STAR answers", "A portfolio page", "Mock interview", "Offer basics", "Write a design note", "Mentor a junior", "Scope a week", "Public notes", "Ask a better question", "Network without spam", "A calm calendar", "Next role, not panic"]
  };

  function lectureTitles(course, n) {
    const bank = LECTURE_STEMS[course.category] || LECTURE_STEMS.programming;
    const titles = [];
    for (let i = 0; i < n; i++) {
      const base = bank[i % bank.length];
      const round = Math.floor(i / bank.length);
      titles.push(round ? base + " · part " + (round + 1) : base);
    }
    if (titles.length) titles[0] = "Welcome to " + course.title;
    if (titles.length > 1) titles[titles.length - 1] = "Wrap-up and next course";
    return titles;
  }

  function buildCurriculum(course) {
    const n = Math.max(7, course.lectures | 0);
    const titles = lectureTitles(course, n);
    const sections = [];
    for (let start = 0; start < n; start += 7) {
      const end = Math.min(start + 7, n);
      const lectures = [];
      for (let i = start; i < end; i++) {
        lectures.push({
          type: "lecture",
          num: i + 1,
          title: titles[i],
          mins: 5 + ((i * 3) % 11)
        });
      }
      const from = start + 1;
      const to = end;
      sections.push({
        from,
        to,
        lectures,
        test: {
          type: "test",
          from,
          to,
          title: "Short test · lectures " + from + "–" + to
        }
      });
    }
    return { n, titles, sections };
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function uniqueOptions(correct, pool) {
    const opts = [correct];
    shuffle(pool.filter((x) => x && x !== correct)).forEach((x) => {
      if (opts.length < 4 && !opts.includes(x)) opts.push(x);
    });
    while (opts.length < 4) opts.push("Review the lecture notes again");
    return shuffle(opts);
  }

  function makeTestQuestions(course, from, to, titles) {
    const slice = titles.slice(from - 1, to);
    const pool = titles.concat(course.outcomes || []);
    const first = slice[0];
    const mid = slice[Math.floor((slice.length - 1) / 2)];
    const last = slice[slice.length - 1];
    return [
      {
        q: "This short test covers which lectures?",
        options: uniqueOptions("Lectures " + from + "–" + to, [
          "Lectures 1–3 only",
          "The whole catalog",
          "Lectures " + (from + 7) + "–" + (to + 7),
          "Only the final exam"
        ]),
        answer: "Lectures " + from + "–" + to
      },
      {
        q: "What is the first topic in this block?",
        options: uniqueOptions(first, pool),
        answer: first
      },
      {
        q: "Which topic is in this block of lectures?",
        options: uniqueOptions(mid, pool),
        answer: mid
      },
      {
        q: "What is the last lecture before this test?",
        options: uniqueOptions(last, pool),
        answer: last
      },
      {
        q: "If you miss a question, what should you do?",
        options: uniqueOptions("Re-watch those 7 lectures, then retry the test", [
          "Skip to an expert course",
          "Ignore it and close the tab",
          "Change the instructor",
          "Unlock the next path without practice"
        ]),
        answer: "Re-watch those 7 lectures, then retry the test"
      }
    ];
  }

  function instSlug(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function instOf(nameOrId) {
    const slug = instSlug(nameOrId);
    return (LMS.instructors || []).find((i) => i.id === nameOrId || i.id === slug || instSlug(i.name) === slug);
  }

  function instHref(name) {
    const i = instOf(name);
    return "instructor.html?id=" + (i ? i.id : instSlug(name));
  }

  function instTaught(inst) {
    return LMS.courses.filter((c) => c.instructor === inst.name);
  }

  function instructorBlock(inst, opts) {
    const taught = instTaught(inst);
    const students = taught.reduce((n, c) => n + (c.students || 0), 0);
    const reviews = taught.reduce((n, c) => n + (c.reviews || 0), 0);
    const paras = (Array.isArray(inst.bio) ? inst.bio : [inst.bio || ""]).map((p) => `<p>${p}</p>`).join("");
    const pic = inst.photo || "";
    const heading = opts && opts.heading === false ? "" : "<h2 class=\"ud-inst-h\">Instructors</h2>";
    const nameInner = opts && opts.link === false
      ? inst.name
      : `<a href="${instHref(inst.name)}">${inst.name}</a>`;
    return `
      <section class="ud-inst">
        ${heading}
        <div class="ud-inst-name">${nameInner}</div>
        <p class="ud-inst-role">${inst.role}</p>
        <div class="ud-inst-row">
          <img class="ud-inst-avatar" src="${pic}" alt="${inst.name}" onerror="this.style.display='none'">
          <ul class="ud-inst-meta">
            <li><span class="ud-ico">★</span> ${inst.rating} Instructor Rating</li>
            <li><span class="ud-ico">◆</span> ${reviews.toLocaleString()} Reviews</li>
            <li><span class="ud-ico">☺</span> ${students.toLocaleString()} Students</li>
            <li><span class="ud-ico">▶</span> ${taught.length} Courses</li>
          </ul>
        </div>
        <div class="ud-inst-bio is-short" data-bio>${paras}</div>
        <button type="button" class="ud-inst-more" data-bio-toggle>Show more ▾</button>
      </section>`;
  }

  function bindBioToggles(root) {
    (root || document).querySelectorAll("[data-bio-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bio = btn.previousElementSibling;
        const open = bio.classList.toggle("is-short");
        btn.textContent = open ? "Show more ▾" : "Show less ▴";
      });
    });
  }

  function courseCard(c) {
    const badge = c.badge ? `<span class="badge badge-gold">${c.badge}</span>` : "";
    const img = courseImg(c);
    const fallback = "https://picsum.photos/seed/" + encodeURIComponent(c.id) + "/800/500";
    return `<article class="course">
      <a class="cover c-${c.category}" href="course.html?id=${c.id}">
        <img src="${img}" alt="${c.title}" onerror="this.onerror=null;this.src='${fallback}'">
        ${badge}<span class="cover-meta">${catName(c.category)} · ${c.hours}h</span>
      </a>
      <div class="course-body">
        <span class="badge badge-level">${c.level}</span>
        <h3><a href="course.html?id=${c.id}">${c.title}</a></h3>
        <a class="instructor" href="${instHref(c.instructor)}">${c.instructor}</a>
        <div class="stars">${stars(c.rating)} ${c.rating} <em>(${c.reviews.toLocaleString()})</em></div>
        <div class="course-foot"><span>${c.price}</span><span class="muted">${c.lectures} lectures</span></div>
        ${coursePickBtn(c.id)}
      </div>
    </article>`;
  }

  function getEnrolledIds() {
    const rec = activeRecord();
    return rec ? rec.enrolled : [];
  }

  function setEnrolledIds(ids) {
    const rec = activeRecord();
    if (!rec) return;
    persistRecord({ ...rec, enrolled: ids.slice(0, 2) });
  }

  function getTeachingIds() {
    const rec = activeRecord();
    return rec ? rec.teaching : [];
  }

  function setTeachingIds(ids) {
    const rec = activeRecord();
    if (!rec) return;
    persistRecord({ ...rec, teaching: ids });
  }

  function deskToast(msg) {
    let el = $("#desk-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "desk-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(deskToast._t);
    deskToast._t = setTimeout(() => el.classList.remove("is-on"), 3200);
  }

  function toggleSelectCourse(courseId) {
    if (!currentUser()) {
      location.href = "login.html";
      return { login: true };
    }
    const ids = getEnrolledIds();
    if (ids.includes(courseId)) {
      setEnrolledIds(ids.filter((id) => id !== courseId));
      deskToast("That ledger left your desk. One seat is free again.");
      return { selected: false };
    }
    if (ids.length >= 2) {
      deskToast("Your desk already holds two ledgers. Drop one on your profile before claiming another.");
      return { full: true };
    }
    setEnrolledIds(ids.concat(courseId));
    deskToast("Seated. You may keep two courses on this desk at a time.");
    return { selected: true };
  }

  function bindCoursePicks(root) {
    (root || document).querySelectorAll("[data-select-course]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSelectCourse(btn.getAttribute("data-select-course"));
        const host = root || document;
        host.querySelectorAll("[data-select-course]").forEach((b) => {
          const id = b.getAttribute("data-select-course");
          const ids = getEnrolledIds();
          const on = ids.includes(id);
          b.classList.toggle("is-on", on);
          b.textContent = on ? "On your desk" : ids.length >= 2 ? "Desk is full" : "Select for desk";
        });
      });
    });
  }

  function coursePickBtn(courseId) {
    if (!currentUser()) return "";
    const ids = getEnrolledIds();
    const on = ids.includes(courseId);
    const label = on ? "On your desk" : ids.length >= 2 ? "Desk is full" : "Select for desk";
    return `<button type="button" class="pick-btn${on ? " is-on" : ""}" data-select-course="${courseId}">${label}</button>`;
  }

  function studyCard(s) {
    const img = (LMS.studyImages && LMS.studyImages[s.id]) || "";
    return `<a class="study" href="topic.html?id=${s.id}">
      ${img ? `<img class="study-pic" src="${img}" alt="">` : `<div class="ring-prog" style="--p:${s.mastery}"><span>${s.mastery}%</span></div>`}
      <div>
        <span class="badge badge-level">${s.level}</span>
        <h3>${s.name}</h3>
        <p>${s.units} units · ${s.hours}h · ${s.mastery}% mastery</p>
      </div>
    </a>`;
  }

  window.renderCourses = function (target, list) {
    const el = $(target);
    if (!el) return;
    el.innerHTML = list.map(courseCard).join("") || `<p class="muted">No courses match these filters.</p>`;
    bindCoursePicks(el);
  };

  window.renderStudy = function (target, list) {
    const el = $(target);
    if (!el) return;
    el.innerHTML = list.map(studyCard).join("");
  };

  function enableDragScroll(scroller) {
    if (!scroller) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const maxScroll = () => Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const clamp = (v) => Math.max(0, Math.min(maxScroll(), v));

    scroller.addEventListener("mousedown", (e) => {
      down = true;
      moved = false;
      startX = e.pageX;
      startLeft = scroller.scrollLeft;
      scroller.classList.add("dragging");
    });
    window.addEventListener("mouseup", () => {
      down = false;
      scroller.classList.remove("dragging");
    });
    window.addEventListener("mousemove", (e) => {
      if (!down) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      scroller.scrollLeft = clamp(startLeft - dx);
    });
    scroller.addEventListener(
      "click",
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem("lms-user") || "null");
    } catch (e) {
      return null;
    }
  }

  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem("lms-accounts") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(list) {
    localStorage.setItem("lms-accounts", JSON.stringify(list));
  }

  function newUserId() {
    return (crypto.randomUUID && crypto.randomUUID()) || "lms-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function emptyStudentProfile() {
    return {
      firstName: "",
      lastName: "",
      headline: "",
      bio: "",
      website: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      photo: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      showProfile: true,
      emailTips: true,
      emailReminders: true
    };
  }

  function normalizeStudentProfile(p, nameFallback) {
    p = p && typeof p === "object" ? p : {};
    const full = String(nameFallback || "").trim();
    const parts = full ? full.split(/\s+/) : [];
    return {
      firstName: p.firstName || parts[0] || "",
      lastName: p.lastName || (parts.length > 1 ? parts.slice(1).join(" ") : ""),
      headline: p.headline || "",
      bio: p.bio || "",
      website: p.website || "",
      twitter: p.twitter || "",
      linkedin: p.linkedin || "",
      facebook: p.facebook || "",
      youtube: p.youtube || "",
      photo: p.photo || "",
      timezone: p.timezone || emptyStudentProfile().timezone,
      showProfile: p.showProfile !== false,
      emailTips: p.emailTips !== false,
      emailReminders: p.emailReminders !== false
    };
  }

  function displayNameFromProfile(profile, fallback) {
    const n = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim();
    return n || fallback || "Learner";
  }

  function normalizeRecord(rec) {
    rec = rec || {};
    const profile = normalizeStudentProfile(rec.profile, rec.name);
    const name = displayNameFromProfile(profile, rec.name || "");
    return {
      id: rec.id || newUserId(),
      name,
      email: String(rec.email || "").trim().toLowerCase(),
      role: rec.role || "student",
      enrolled: Array.isArray(rec.enrolled) ? rec.enrolled.slice(0, 2) : [],
      teaching: Array.isArray(rec.teaching) ? rec.teaching : [],
      lang: rec.lang || localStorage.getItem("lms-lang") || "en",
      progress: rec.progress && typeof rec.progress === "object" ? rec.progress : {},
      study: rec.study && typeof rec.study === "object" ? rec.study : {},
      profile,
      teachStatus: rec.teachStatus === "approved" || rec.teachStatus === "pending" ? rec.teachStatus : "none",
      teachProfile:
        rec.teachProfile && typeof rec.teachProfile === "object"
          ? {
              headline: rec.teachProfile.headline || "",
              bio: rec.teachProfile.bio || "",
              courseId: rec.teachProfile.courseId || ""
            }
          : { headline: "", bio: "", courseId: "" },
      updatedAt: rec.updatedAt || new Date().toISOString()
    };
  }

  function loadRecord(email) {
    if (!email) return null;
    email = String(email).trim().toLowerCase();
    try {
      const raw = JSON.parse(localStorage.getItem("lms-data:" + email) || "null");
      if (raw) return normalizeRecord(raw);
    } catch (e) {}
    let enrolled = [];
    let teaching = [];
    try {
      enrolled = JSON.parse(localStorage.getItem("lms-enrolled:" + email) || "null") || JSON.parse(localStorage.getItem("lms-enrolled") || "[]");
    } catch (e) {
      enrolled = [];
    }
    try {
      teaching = JSON.parse(localStorage.getItem("lms-teaching:" + email) || "null") || JSON.parse(localStorage.getItem("lms-teaching") || "[]");
    } catch (e) {
      teaching = [];
    }
    const acc = getAccounts().find((a) => a.email === email);
    const session = currentUser();
    if (!acc && !(session && session.email === email)) {
      return enrolled.length || teaching.length
        ? normalizeRecord({ email, enrolled, teaching })
        : null;
    }
    return normalizeRecord({
      id: acc?.id || session?.id,
      name: acc?.name || session?.name || "",
      email,
      role: acc?.role || session?.role || "student",
      enrolled,
      teaching
    });
  }

  function persistRecord(rec) {
    rec = normalizeRecord({ ...rec, updatedAt: new Date().toISOString() });
    if (!rec.email) return rec;
    localStorage.setItem("lms-data:" + rec.email, JSON.stringify(rec));
    localStorage.setItem("lms-user", JSON.stringify({ id: rec.id, name: rec.name, email: rec.email, role: rec.role }));
    localStorage.setItem("lms-enrolled:" + rec.email, JSON.stringify(rec.enrolled));
    localStorage.setItem("lms-teaching:" + rec.email, JSON.stringify(rec.teaching));
    localStorage.setItem("lms-lang", rec.lang);
    const accounts = getAccounts();
    const i = accounts.findIndex((a) => a.email === rec.email);
    if (i >= 0) {
      accounts[i].id = rec.id;
      accounts[i].name = rec.name;
      accounts[i].role = rec.role;
      saveAccounts(accounts);
    }
    const push = () => cloudSave(rec);
    if (window.lmsDb) push();
    else window.addEventListener("lms-ready", push, { once: true });
    return rec;
  }

  function activeRecord() {
    const u = currentUser();
    if (!u?.email) return null;
    return loadRecord(u.email) || persistRecord(normalizeRecord(u));
  }

  let cloudSaveTimer;
  function queueCloudSave(rec) {
    clearTimeout(cloudSaveTimer);
    cloudSaveTimer = setTimeout(() => cloudSave(rec), 250);
  }

  async function syncCourseTables(rec) {
    const db = window.lmsDb;
    if (!db || !rec?.email) return;
    const titleOf = (id) => {
      const c = typeof LMS !== "undefined" && LMS.courses ? LMS.courses.find((x) => x.id === id) : null;
      return (c && c.title) || id;
    };
    const email = encodeURIComponent(rec.email);
    const studentRows = (rec.enrolled || []).map((course_id) => ({
      user_id: String(rec.id || ""),
      name: rec.name || "",
      email: rec.email,
      course_id,
      course_title: titleOf(course_id)
    }));
    const teacherRows = (rec.teaching || []).map((course_id) => ({
      user_id: String(rec.id || ""),
      name: rec.name || "",
      email: rec.email,
      course_id,
      course_title: titleOf(course_id),
      headline: rec.teachProfile?.headline || ""
    }));
    await db.request("lms_student_courses?email=eq." + email, "DELETE");
    if (studentRows.length) {
      const ins = await db.request("lms_student_courses", "POST", studentRows);
      if (ins.ok) console.log("Saved to Table Editor → lms_student_courses", studentRows.length);
    }
    await db.request("lms_teacher_courses?email=eq." + email, "DELETE");
    if (teacherRows.length) {
      const ins = await db.request("lms_teacher_courses", "POST", teacherRows);
      if (ins.ok) console.log("Saved to Table Editor → lms_teacher_courses", teacherRows.length);
    }
  }

  async function cloudSave(rec) {
    if (!rec) return;
    await syncCourseTables(rec);
    const sb = window.lmsSupabase;
    try {
      if (!sb) return;
      const { data } = await sb.auth.getUser();
      if (data?.user) {
        await sb.auth.updateUser({
          data: {
            name: rec.name,
            role: rec.role,
            enrolled: rec.enrolled,
            teaching: rec.teaching,
            lang: rec.lang,
            progress: rec.progress,
            study: rec.study,
            teachStatus: rec.teachStatus,
            teachProfile: rec.teachProfile,
            profile: rec.profile,
            updatedAt: rec.updatedAt
          }
        });
      }
    } catch (e) {
      console.error("Auth metadata save:", e.message || e);
    }
  }

  async function cloudRegister({ name, email, password, role, rec }) {
    const sb = window.lmsSupabase;
    if (!sb) return rec;
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          enrolled: rec.enrolled,
          teaching: rec.teaching,
          lang: rec.lang,
          progress: rec.progress,
          study: rec.study,
          teachStatus: rec.teachStatus,
          teachProfile: rec.teachProfile,
          profile: rec.profile
        }
      }
    });
    if (error) {
      console.error("Supabase sign up:", error.message);
      return rec;
    }
    if (data?.user?.id) rec = persistRecord({ ...rec, id: data.user.id });
    return rec;
  }

  async function cloudLogin(email, password) {
    const sb = window.lmsSupabase;
    if (!sb) return null;
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error || !data?.user) return null;
    const meta = data.user.user_metadata || {};
    const local = loadRecord(email) || {};
    return persistRecord({
      ...local,
      id: data.user.id,
      email: data.user.email || email,
      name: meta.name || local.name || "",
      role: meta.role || local.role || "student",
      enrolled: Array.isArray(meta.enrolled) ? meta.enrolled : local.enrolled,
      teaching: Array.isArray(meta.teaching) ? meta.teaching : local.teaching,
        lang: meta.lang || local.lang,
        progress: meta.progress || local.progress,
        study: meta.study || local.study,
        teachStatus: meta.teachStatus || local.teachStatus,
        teachProfile: meta.teachProfile || local.teachProfile,
        profile: meta.profile || local.profile
    });
  }

  async function cloudHydrate() {
    const sb = window.lmsSupabase;
    if (!sb) return;
    try {
      const { data } = await sb.auth.getSession();
      const user = data?.session?.user;
      if (!user) return;
      const meta = user.user_metadata || {};
      const local = loadRecord(user.email) || {};
        persistRecord({
        ...local,
        id: user.id,
        email: user.email,
        name: meta.name || local.name || currentUser()?.name || "",
        role: meta.role || local.role || currentUser()?.role || "student",
        enrolled: Array.isArray(meta.enrolled) && meta.enrolled.length ? meta.enrolled : local.enrolled,
        teaching: Array.isArray(meta.teaching) && meta.teaching.length ? meta.teaching : local.teaching,
        lang: meta.lang || local.lang,
        progress: Object.keys(meta.progress || {}).length ? meta.progress : local.progress,
        study: Object.keys(meta.study || {}).length ? meta.study : local.study,
        teachStatus: meta.teachStatus || local.teachStatus,
        teachProfile: meta.teachProfile || local.teachProfile,
        profile: meta.profile || local.profile
      });
      const rec = activeRecord();
      if (rec?.lang) applyLang(rec.lang);
    } catch (e) {
      console.error("Supabase hydrate:", e.message || e);
    }
  }

  function isEmailComplete(value) {
    return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(value || "").trim());
  }

  function passwordGaps(value) {
    const s = String(value || "");
    const gaps = [];
    if (s.length < 8) gaps.push("8 characters");
    if (!/[a-z]/.test(s)) gaps.push("a lowercase letter");
    if (!/[A-Z]/.test(s)) gaps.push("an uppercase letter");
    if (!/[0-9]/.test(s)) gaps.push("a number");
    if (!/[^A-Za-z0-9]/.test(s)) gaps.push("a symbol");
    return gaps;
  }

  function isPasswordStrong(value) {
    return passwordGaps(value).length === 0;
  }

  function headerAccount() {
    const user = currentUser();
    if (!user) {
      return `<a class="btn btn-login" href="login.html" data-i18n="login">Log In</a>
        <a class="btn btn-signup" href="register.html" data-i18n="join">Join for Free</a>`;
    }
    const rec = activeRecord();
    const name = rec?.name || user.name || "Learner";
    const letter = name.trim().charAt(0).toUpperCase();
    const photo = rec?.profile?.photo;
    const avatar = photo
      ? `<img class="user-avatar-img" src="${photo}" alt="">`
      : `<span class="user-avatar">${letter}</span>`;
    return `<a class="btn btn-login" href="dashboard.html">My learning</a>
        <a class="user-chip" href="profile.html" title="Account settings">
          ${avatar}
          <span>${name}</span>
        </a>
        <button class="btn-logout" type="button" id="logout-btn">Log out</button>`;
  }

  function mountCatRail() {
    const header = $(".header");
    if (!header || $("#cat-rail")) return;
    const params = new URLSearchParams(location.search);
    const active = params.get("cat") || "";
    const bar = document.createElement("div");
    bar.className = "cat-rail-bar";
    const pills = LMS.categories.map(
        (c) =>
          `<a class="cat-pill${active === c.id ? " is-on" : ""}" href="courses.html?cat=${c.id}">${c.name}</a>`
      ).join("");
    bar.innerHTML = `<div class="wrap"><div class="cat-rail" id="cat-rail">${pills}</div></div>`;
    header.insertAdjacentElement("afterend", bar);
    enableDragScroll($("#cat-rail"));
  }

  function mountHeader() {
    const header = $(".header");
    if (!header) return;
    header.innerHTML = `
      <div class="wrap header-bar">
        <div class="header-left">
        <a class="logo" href="index.html">
          <img src="assets/logo.svg" alt="" />
          <span class="logo-text">LMS <span>Academy</span></span>
        </a>
        <nav class="nav">
          <div class="drop">
            <button type="button"><span data-i18n="explore">Explore</span> <span class="chev">▾</span></button>
            <div class="mega">
              <a href="courses.html?cat=basics"><div>Computer Basics<small>Windows, Office, internet</small></div></a>
              <a href="courses.html?cat=web"><div>Web Development<small>HTML to Next.js</small></div></a>
              <a href="courses.html?cat=programming"><div>Programming<small>Python, JS, Java</small></div></a>
              <a href="courses.html?cat=datascience"><div>Data Science<small>SQL to analysis</small></div></a>
              <a href="courses.html?cat=ai"><div>AI & Machine Learning<small>ML to PyTorch</small></div></a>
              <a href="courses.html?cat=cloud"><div>Cloud & DevOps<small>AWS, Docker, K8s</small></div></a>
              <a href="courses.html?cat=security"><div>Cybersecurity<small>Defense and labs</small></div></a>
              <a href="courses.html?cat=cs"><div>Computer Science<small>DSA & systems</small></div></a>
            </div>
          </div>
          <a href="paths.html">Paths</a>
        </nav>
        </div>
        <form class="search header-search" data-search-form>
          <input type="search" placeholder="What do you want to learn?" data-i18n-placeholder="search" />
          <button class="search-go" type="submit" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
          </button>
        </form>
        <div class="header-actions">
        <a class="btn btn-login" href="${currentUser() && activeRecord()?.teachStatus === "approved" ? "instructor-hub.html" : "teach.html"}">Teach</a>
        ${headerAccount()}
        <div class="lang-wrap">
          <button class="globe-btn" type="button" aria-label="Change language" title="Language">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18"/></svg>
          </button>
          <div class="lang-menu">
            <button type="button" data-lang="en">English</button>
            <button type="button" data-lang="ur">اردو</button>
            <button type="button" data-lang="hi">हिन्दी</button>
            <button type="button" data-lang="zh">中文</button>
            <button type="button" data-lang="ar">العربية</button>
            <button type="button" data-lang="ja">日本語</button>
          </div>
        </div>
        </div>
      </div>`;
    $("#logout-btn")?.addEventListener("click", async () => {
      try {
        await window.lmsSupabase?.auth.signOut();
      } catch (e) {}
      localStorage.removeItem("lms-user");
      location.href = "index.html";
    });
    bindLang();
  }

  function col(title, items) {
    return `<div><h4>${title}</h4>${items.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>`;
  }

  function mountFooter() {
    const byCat = {};
    LMS.courses.forEach((c) => {
      if (!byCat[c.category]) byCat[c.category] = [];
      byCat[c.category].push(c);
    });
    const columns = LMS.categories
      .filter((cat) => byCat[cat.id] && byCat[cat.id].length)
      .map((cat) =>
        col(
          cat.name,
          byCat[cat.id].map((c) => [c.title, "course.html?id=" + c.id])
        )
      )
      .join("");

    const html = `
      <div class="foot-explore">
        <div class="wrap">
          <h3 data-i18n="exploreTitle">LMS Academy courses</h3>
          <div class="explore-grid">${columns}</div>
        </div>
      </div>
      <div class="foot-bottom">
        <div class="wrap foot-bottom-inner">
          <span>© 2026 LMS Academy. Learn. Master. Build.</span>
          <div class="lang-wrap">
            <button class="globe-btn globe-btn-light" type="button" aria-label="Change language">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18"/></svg>
              <span class="lang-label">English</span>
            </button>
            <div class="lang-menu lang-menu-up">
              <button type="button" data-lang="en">English</button>
              <button type="button" data-lang="ur">اردو</button>
              <button type="button" data-lang="hi">हिन्दी</button>
              <button type="button" data-lang="zh">中文</button>
              <button type="button" data-lang="ar">العربية</button>
              <button type="button" data-lang="ja">日本語</button>
            </div>
          </div>
        </div>
      </div>`;
    $$(".footer").forEach((f) => {
      f.classList.add("site-footer");
      f.innerHTML = html;
    });
  }

  function bindLang() {
    const saved = (activeRecord() && activeRecord().lang) || localStorage.getItem("lms-lang") || "en";
    applyLang(saved);
    $$("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLang(btn.dataset.lang);
        $$(".lang-wrap").forEach((w) => w.classList.remove("open"));
      });
    });
    $$(".globe-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const wrap = btn.closest(".lang-wrap");
        $$(".lang-wrap").forEach((w) => {
          if (w !== wrap) w.classList.remove("open");
        });
        wrap.classList.toggle("open");
      });
    });
    document.addEventListener("click", () => $$(".lang-wrap").forEach((w) => w.classList.remove("open")));
  }

  const i18n = {
    en: {
      explore: "Explore",
      search: "What do you want to learn?",
      login: "Log In",
      join: "Join for Free",
      exploreTitle: "LMS Academy courses"
    },
    ur: {
      explore: "ایکسپلور",
      search: "کچھ بھی تلاش کریں",
      login: "لاگ ان",
      join: "مفت جوائن",
      exploreTitle: "LMS Academy کے کورسز"
    },
    hi: {
      explore: "एक्सप्लोर",
      search: "कुछ भी खोजें",
      login: "लॉग इन",
      join: "फ्री जॉइन",
      exploreTitle: "LMS Academy के कोर्स"
    },
    zh: {
      explore: "探索",
      search: "搜索任何内容",
      login: "登录",
      join: "免费加入",
      exploreTitle: "LMS Academy 课程"
    },
    ar: {
      explore: "استكشف",
      search: "ابحث عن أي شيء",
      login: "تسجيل الدخول",
      join: "انضم مجانًا",
      exploreTitle: "دورات LMS Academy"
    },
    ja: {
      explore: "探索",
      search: "何でも検索",
      login: "ログイン",
      join: "無料で参加",
      exploreTitle: "LMS Academyのコース"
    }
  };

  function applyLang(code) {
    localStorage.setItem("lms-lang", code);
    const rec = activeRecord();
    if (rec && rec.lang !== code) persistRecord({ ...rec, lang: code });
    const names = { en: "English", ur: "اردو", hi: "हिन्दी", zh: "中文", ar: "العربية", ja: "日本語" };
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ur" || code === "ar" ? "rtl" : "ltr";
    $$(".lang-label").forEach((el) => {
      el.textContent = names[code] || "English";
    });
    const pack = i18n[code] || i18n.en;
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (pack[key]) el.textContent = pack[key];
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (pack[key]) el.placeholder = pack[key];
    });
  }

  mountHeader();
  mountFooter();
  bindLang();

  const menuBtn = $("#menu-toggle");
  const mobile = $("#mobile-nav");
  if (menuBtn && mobile) {
    menuBtn.addEventListener("click", () => mobile.classList.toggle("open"));
  }

  const q = new URLSearchParams(location.search);

  if ($("#home-courses")) {
    let level = "Beginner";
    const show = () => {
      const list = LMS.courses.filter((c) => c.level === level);
      renderCourses("#home-courses", list.slice(0, 3));
      const label = $("#home-level-label");
      if (label) label.textContent = level + " · 3 featured";
      $$("[data-level]").forEach((el) => el.classList.toggle("is-on", el.dataset.level === level));
      const link = $("#home-catalog-link");
      if (link) {
        link.href = "courses.html?level=" + encodeURIComponent(level);
        link.textContent = "All " + level + " in catalog";
      }
    };
    $$("[data-level]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        level = el.dataset.level;
        show();
        $("#featured")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    show();
    renderStudy("#home-study", LMS.studySubjects.slice(0, 6));
  }

  if ($("#catalog")) {
    const apply = () => {
      const cat = $("#f-cat")?.value || "all";
      const lvl = $("#f-level")?.value || "all";
      const search = ($("#catalog-q")?.value || "").toLowerCase();
      const list = LMS.courses.filter((c) => {
        const okCat = cat === "all" || c.category === cat;
        const okLvl = lvl === "all" || c.level === lvl;
        const okQ = !search || (c.title + c.instructor + c.desc).toLowerCase().includes(search);
        return okCat && okLvl && okQ;
      });
      $("#count") && ($("#count").textContent = list.length + " " + (lvl === "all" ? "" : lvl + " ") + "courses");
      renderCourses("#catalog", list);
    };
    if (q.get("cat") && $("#f-cat")) {
      $("#f-cat").value = q.get("cat");
      const r = document.querySelector(`input[name=cat][value="${q.get("cat")}"]`);
      if (r) r.checked = true;
    }
    if (q.get("level") && $("#f-level")) {
      $("#f-level").value = q.get("level");
      const r = document.querySelector(`input[name=lvl][value="${q.get("level")}"]`);
      if (r) r.checked = true;
    }
    if (q.get("q") && $("#catalog-q")) $("#catalog-q").value = q.get("q");
    $("#catalog-q")?.addEventListener("input", apply);
    $$("input[name=lvl]").forEach((i) =>
      i.addEventListener("change", () => {
        $("#f-level").value = i.value;
        apply();
      })
    );
    $$("input[name=cat]").forEach((i) =>
      i.addEventListener("change", () => {
        $("#f-cat").value = i.value;
        apply();
      })
    );
    apply();
  }

  if ($("#course-root")) {
    const c = LMS.courses.find((x) => x.id === q.get("id")) || LMS.courses[0];
    $("#c-title").textContent = c.title;
    const instLink = $("#c-inst");
    instLink.textContent = c.instructor;
    instLink.href = instHref(c.instructor);
    $("#c-desc").textContent = c.desc;
    $("#c-level").textContent = c.level;
    $("#c-cat").textContent = catName(c.category);
    $("#c-meta").textContent = `${c.rating} ★ · ${c.reviews.toLocaleString()} reviews · ${c.students.toLocaleString()} learners`;
    $("#c-hours").textContent = c.hours + " hours";
    $("#c-lectures").textContent = c.lectures + " lectures";
    $("#c-price").textContent = c.price === "Free" ? "Free" : "Included in LMS Academy";
    $("#c-cover").className = "player";
    const img = courseImg(c);
    if (img) $("#c-cover").style.backgroundImage = "url('" + img + "')";
    const studentBtn = $("#enroll-student");
    const startBtn = $("#start-course");
    const dropBtn = $("#drop-course");
    const paintStudentCtas = () => {
      const onDesk = currentUser() && getEnrolledIds().includes(c.id);
      if (studentBtn) studentBtn.style.display = onDesk ? "none" : "";
      if (startBtn) startBtn.style.display = onDesk ? "" : "none";
      if (dropBtn) dropBtn.style.display = onDesk ? "" : "none";
      if (studentBtn && currentUser() && !onDesk) {
        studentBtn.textContent = "Select this course";
        studentBtn.href = "#";
      } else if (studentBtn && !currentUser()) {
        studentBtn.textContent = "Log in to select";
      }
      if (startBtn) startBtn.href = "course.html?id=" + c.id + "&start=1";
    };
    paintStudentCtas();
    if (q.get("start") === "1") {
      setTimeout(() => $("#c-lesson")?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
    studentBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!currentUser()) {
        location.href = "login.html?course=" + encodeURIComponent(c.id);
        return;
      }
      const res = toggleSelectCourse(c.id);
      if (res.full) return;
      paintStudentCtas();
    });
    dropBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSelectCourse(c.id);
      paintStudentCtas();
    });
    $("#enroll-teacher")?.addEventListener("click", (e) => {
      e.preventDefault();
      saveEnroll("teacher", c.id);
    });
    $("#c-outcomes").innerHTML = c.outcomes.map((o) => `<li>• ${o}</li>`).join("");
    const outline = buildCurriculum(c);
    const tests = outline.sections.length;
    $("#c-curric-meta") &&
      ($("#c-curric-meta").textContent =
        outline.n + " lectures · a short test after every 7 lectures (" + tests + " tests)");
    $("#c-lectures").textContent = outline.n + " lectures · " + tests + " short tests";
    $("#c-curric").innerHTML = outline.sections
      .map((sec, s) => {
        const rows = sec.lectures
          .map(
            (lec) =>
              `<button type="button" class="lec-row" data-open="lec" data-num="${lec.num}">
                <span class="lec-play">▶</span>
                <span class="lec-title">${lec.num}. ${lec.title}</span>
                <span class="lec-mins">${lec.mins} min</span>
              </button>`
          )
          .join("");
        return `<details class="curric-sec" ${s === 0 ? "open" : ""}>
          <summary>Section ${s + 1} · Lectures ${sec.from}–${sec.to} <em>+ short test</em></summary>
          <div class="lec-list">
            ${rows}
            <button type="button" class="lec-row is-test" data-open="test" data-from="${sec.from}" data-to="${sec.to}">
              <span class="lec-play">✎</span>
              <span class="lec-title">${sec.test.title}</span>
              <span class="lec-mins">5 q</span>
            </button>
          </div>
        </details>`;
      })
      .join("");

    const lessonEl = $("#c-lesson");
    const coverSpan = $("#c-cover span");
    const progressKey = "lms-lec-" + c.id;
    const loadProg = () => {
      const rec = activeRecord();
      if (rec?.progress?.[c.id]) return rec.progress[c.id];
      try {
        return JSON.parse(localStorage.getItem(progressKey) || '{"done":[],"tests":{}}');
      } catch (e) {
        return { done: [], tests: {} };
      }
    };
    const saveProg = (p) => {
      localStorage.setItem(progressKey, JSON.stringify(p));
      const rec = activeRecord();
      if (rec) persistRecord({ ...rec, progress: { ...rec.progress, [c.id]: p } });
    };

    const markRows = () => {
      const p = loadProg();
      $$(".lec-row[data-open=lec]").forEach((row) => {
        row.classList.toggle("is-done", p.done.includes(Number(row.dataset.num)));
      });
      $$(".lec-row[data-open=test]").forEach((row) => {
        const k = row.dataset.from + "-" + row.dataset.to;
        row.classList.toggle("is-done", p.tests[k] != null);
      });
    };

    const openLecture = (num) => {
      const sec = outline.sections.find((s) => num >= s.from && num <= s.to);
      const lec = sec && sec.lectures.find((l) => l.num === num);
      if (!lec || !lessonEl) return;
      $$(".lec-row").forEach((r) => r.classList.toggle("is-on", r.dataset.num == num));
      if (coverSpan) coverSpan.textContent = "▶ Lecture " + lec.num + " · " + lec.title;
      lessonEl.hidden = false;
      lessonEl.innerHTML = `
        <span class="badge badge-teal">Lecture ${lec.num} of ${outline.n}</span>
        <h3>${lec.title}</h3>
        <p class="muted">${lec.mins} minutes · ${c.instructor} · ${c.level}</p>
        <p>This lecture is part of <strong>${c.title}</strong>. Watch, pause, and try the step on your own machine before you continue.</p>
        <p>${c.desc}</p>
        <p class="muted">After lecture ${Math.min(num - ((num - 1) % 7) + 6, outline.n)}, a short test will check lectures ${num - ((num - 1) % 7)}–${Math.min(num - ((num - 1) % 7) + 6, outline.n)}.</p>
        <button class="btn btn-teal" type="button" data-mark-lec>Mark lecture complete</button>`;
      lessonEl.querySelector("[data-mark-lec]").addEventListener("click", () => {
        const p = loadProg();
        if (!p.done.includes(num)) p.done.push(num);
        saveProg(p);
        markRows();
        lessonEl.querySelector("[data-mark-lec]").textContent = "Saved · next lecture";
      });
    };

    const openTest = (from, to) => {
      const qs = makeTestQuestions(c, from, to, outline.titles);
      $$(".lec-row").forEach((r) =>
        r.classList.toggle("is-on", r.dataset.open === "test" && r.dataset.from == from && r.dataset.to == to)
      );
      if (coverSpan) coverSpan.textContent = "✎ Short test · lectures " + from + "–" + to;
      lessonEl.hidden = false;
      lessonEl.innerHTML = `
        <span class="badge badge-coral">Short test</span>
        <h3>Lectures ${from}–${to}</h3>
        <p class="muted">5 questions on the lectures you just finished. No skip — this checks the previous block.</p>
        <form class="quiz-form">
          ${qs
            .map(
              (item, i) => `<fieldset class="quiz-q">
                <legend>${i + 1}. ${item.q}</legend>
                ${item.options
                  .map(
                    (opt, oi) =>
                      `<label><input type="radio" name="q${i}" value="${oi}" required /> ${String(opt)
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")}</label>`
                  )
                  .join("")}
              </fieldset>`
            )
            .join("")}
          <button class="btn btn-navy" type="submit">Submit test</button>
        </form>
        <div class="quiz-result" hidden></div>`;
      const form = lessonEl.querySelector(".quiz-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let score = 0;
        qs.forEach((item, i) => {
          const picked = form.querySelector(`input[name=q${i}]:checked`);
          const ok = picked && item.options[Number(picked.value)] === item.answer;
          if (ok) score++;
          const fs = form.querySelectorAll("fieldset")[i];
          fs.classList.add(ok ? "ok" : "bad");
        });
        const pct = Math.round((score / qs.length) * 100);
        const p = loadProg();
        p.tests[from + "-" + to] = pct;
        saveProg(p);
        markRows();
        const box = lessonEl.querySelector(".quiz-result");
        box.hidden = false;
        box.innerHTML = `<p><strong>${score} / ${qs.length}</strong> · ${pct}% on lectures ${from}–${to}.</p>
          <p class="muted">${pct >= 70 ? "You can continue to the next section." : "Re-watch those 7 lectures, then retry."}</p>`;
      });
    };

    $("#c-curric").addEventListener("click", (e) => {
      const row = e.target.closest("[data-open]");
      if (!row) return;
      if (row.dataset.open === "lec") openLecture(Number(row.dataset.num));
      if (row.dataset.open === "test") openTest(Number(row.dataset.from), Number(row.dataset.to));
    });
    markRows();
    openLecture(1);
    const inst = instOf(c.instructor);
    if (inst && $("#c-instructor")) {
      $("#c-instructor").innerHTML = instructorBlock(inst);
      bindBioToggles($("#c-instructor"));
    }
  }

  if ($("#instructor-root")) {
    const inst = instOf(q.get("id")) || LMS.instructors[0];
    const taught = instTaught(inst);
    document.title = inst.name + " — LMS Academy";
    $("#instructor-root").innerHTML = `
      <div class="crumbs"><a href="index.html">Home</a> / <a href="courses.html">Courses</a> / Instructor</div>
      ${instructorBlock(inst, { heading: true, link: false })}
      <h2 class="serif" style="font-size:28px;color:var(--navy);margin:28px 0 16px">Courses by ${inst.name.split(" ")[0]}</h2>
      <div class="grid-4" id="inst-courses"></div>`;
    bindBioToggles($("#instructor-root"));
    renderCourses("#inst-courses", taught);
  }

  if ($("#topic-root")) {
    const s = LMS.studySubjects.find((x) => x.id === q.get("id")) || LMS.studySubjects[0];
    const units = LMS.studyUnits[s.id] || [
      { title: "Start here", lessons: 4, type: "lesson" },
      { title: "Core ideas", lessons: 5, type: "lesson" },
      { title: "Guided practice", lessons: 1, type: "practice" },
      { title: "Worked examples", lessons: 4, type: "lesson" },
      { title: "Unit quiz", lessons: 1, type: "quiz" },
      { title: "Apply it in IT", lessons: 3, type: "lesson" },
      { title: "Mini project", lessons: 1, type: "project" },
      { title: "Mastery challenge", lessons: 1, type: "mastery" }
    ];
    $("#t-name").textContent = s.name;
    $("#t-blurb").textContent = s.blurb;
    $("#t-meta").textContent = `${s.level} · ${s.units} units · ${s.hours} hours`;
    const startMastery = activeRecord()?.study?.[s.id] ?? localStorage.getItem("lms-mastery-" + s.id) ?? s.mastery;
    $("#t-mastery").textContent = startMastery + "% mastery";
    $("#t-units").innerHTML = units
      .map(
        (u, i) =>
          `<div class="unit ${i === 0 ? "active" : ""}" data-i="${i}"><b>${u.title}</b><div class="muted">${u.lessons} item${u.lessons > 1 ? "s" : ""} · ${u.type}</div></div>`
      )
      .join("");
    const show = (i) => {
      $$(".unit").forEach((el) => el.classList.toggle("active", el.dataset.i == i));
      const u = units[i];
      $("#t-lesson").innerHTML = `
        <span class="badge badge-teal">${u.type}</span>
        <h2 style="margin:10px 0 12px">${u.title}</h2>
        <p class="muted">${s.blurb}</p>
        <p style="margin:16px 0">${u.body || "This unit is original LMS Academy material: a short idea, a worked IT example, then a check. It is written for this campus — not copied from another academy."}</p>
        <h3 style="margin-top:22px">Try this</h3>
        <div class="q" data-ok="1">A. Explain the idea in one sentence, then give an IT example.</div>
        <div class="q">B. Skip practice and only rewatch later.</div>
        <div class="q" data-ok="1">C. Do the unit quiz when you can teach it back.</div>
        <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-teal" id="mark-done">Mark unit practiced</button>
          <a class="btn btn-ghost" href="study.html">Back to Study Hub</a>
        </div>`;
      $$(".q").forEach((el) =>
        el.addEventListener("click", () => el.classList.toggle("ok"))
      );
      $("#mark-done")?.addEventListener("click", () => {
        const rec = activeRecord();
        const prev = rec?.study?.[s.id] ?? localStorage.getItem("lms-mastery-" + s.id) ?? s.mastery;
        const n = Math.min(100, Number(prev) + 8);
        localStorage.setItem("lms-mastery-" + s.id, n);
        if (rec) persistRecord({ ...rec, study: { ...rec.study, [s.id]: n } });
        $("#t-mastery").textContent = n + "% mastery";
        $("#mark-done").textContent = "Saved · keep going";
      });
    };
    $$(".unit").forEach((el) => el.addEventListener("click", () => show(el.dataset.i)));
    show(0);
  }

  if ($("#paths-root")) {
    $("#paths-root").innerHTML = LMS.paths
      .map((p) => {
        const n = p.courses.length;
        return `<article class="path-card">
          <span class="badge badge-navy">${p.level}</span>
          <h3>${p.name}</h3>
          <p class="muted">${p.role}</p>
          <div class="meta-row"><span class="skill">${p.months} months</span><span class="skill">${n} course steps</span></div>
          <div class="meta-row">${p.skills.map((s) => `<span class="skill">${s}</span>`).join("")}</div>
          <a class="btn btn-navy" href="courses.html">Open related courses</a>
        </article>`;
      })
      .join("");
  }

  if ($("#certs-root")) {
    $("#certs-root").innerHTML = LMS.certs
      .map(
        (c) => `<article class="cert-card">
          <span class="badge badge-coral">${c.track}</span>
          <h3>${c.name}</h3>
          <p class="muted">${c.projects} required projects · ~${c.hours} hours · ${c.level}</p>
          <p style="margin:12px 0;font-size:14px">Complete projects to earn a shareable LMS Academy certificate — curriculum-style, not a watched-video badge.</p>
          <a class="btn btn-teal" href="course.html?id=ms-office">Start from beginner</a>
        </article>`
      )
      .join("");
  }

  $$("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = form.querySelector("input").value.trim();
      location.href = "courses.html?q=" + encodeURIComponent(v);
    });
  });

  function saveEnroll(role, courseId) {
    let user = currentUser();
    if (!user) {
      location.href = "login.html?role=" + role + (courseId ? "&course=" + courseId : "");
      return;
    }
    if (role === "student") {
      const res = toggleSelectCourse(courseId);
      if (res.full) {
        location.href = "profile.html";
        return;
      }
      location.href = "profile.html";
      return;
    }
    location.href = "teach.html" + (courseId ? "?course=" + encodeURIComponent(courseId) : "");
  }

  const auth = $("#auth-form");
  if (auth) {
    if (currentUser() && !$("#name")) {
      location.href = "profile.html";
    }
    const preset = q.get("role");
    if (preset) {
      const r = document.querySelector(`input[name=role][value="${preset}"]`);
      if (r) r.checked = true;
    }
    const emailEl = $("#email");
    const passEl = $("#password");
    const nextBtn = $("#auth-next");
    const submitBtn = $("#auth-submit");
    const emailHint = $("#email-hint");
    const pwHint = $("#pw-hint");
    const errEl = $("#auth-error");
    const step1 = auth.querySelector('[data-step="1"]');
    const step2 = auth.querySelector('[data-step="2"]');
    const isRegister = !!$("#name");

    const paintEmail = () => {
      const typed = emailEl.value.trim().length > 0;
      const ok = isEmailComplete(emailEl.value);
      emailEl.classList.toggle("is-ok", ok);
      emailEl.classList.toggle("is-bad", typed && !ok);
      emailHint.classList.toggle("is-on", typed && !ok);
      const nameOk = !isRegister || ($("#name").value || "").trim().length > 1;
      if (nextBtn) nextBtn.disabled = !(ok && nameOk);
      return ok;
    };

    const paintPassword = () => {
      const typed = passEl.value.length > 0;
      const gaps = passwordGaps(passEl.value);
      const ok = isRegister ? gaps.length === 0 : typed;
      passEl.classList.toggle("is-ok", isRegister ? ok : false);
      passEl.classList.toggle("is-bad", isRegister && typed && !ok);
      pwHint.classList.toggle("is-on", isRegister && typed && !ok);
      if (isRegister && typed && !ok) {
        pwHint.textContent =
          "This lock is still unfinished. Add " + gaps.join(", ").replace(/, ([^,]*)$/, " and $1") + ".";
      }
      if (submitBtn) submitBtn.disabled = !ok;
      return ok;
    };

    emailEl?.addEventListener("input", paintEmail);
    $("#name")?.addEventListener("input", paintEmail);
    passEl?.addEventListener("input", paintPassword);
    paintEmail();
    if (passEl) paintPassword();

    const nameEl = $("#name");
    nameEl?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      paintEmail();
      if ((nameEl.value || "").trim().length > 1) emailEl.focus();
    });
    emailEl?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (isRegister && (nameEl?.value || "").trim().length < 2) {
        nameEl?.focus();
        return;
      }
      if (!paintEmail()) return;
      nextBtn?.click();
    });

    nextBtn?.addEventListener("click", () => {
      if (!paintEmail()) return;
      step1.hidden = true;
      step2.hidden = false;
      passEl.focus();
    });
    $("#auth-back")?.addEventListener("click", () => {
      step2.hidden = true;
      step1.hidden = false;
      if (errEl) errEl.hidden = true;
    });

    auth.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (step2?.hidden) {
        if (paintEmail()) {
          step1.hidden = true;
          step2.hidden = false;
          passEl.focus();
        }
        return;
      }
      if (!paintEmail() || !paintPassword()) return;
      const email = emailEl.value.trim().toLowerCase();
      const password = passEl.value;
      const role = document.querySelector("input[name=role]:checked")?.value || preset || "student";
      const accounts = getAccounts();
      if (submitBtn) submitBtn.disabled = true;

      if (isRegister) {
        const name = ($("#name").value || "").trim();
        if (accounts.some((a) => a.email === email)) {
          errEl.hidden = false;
          errEl.textContent = "This email already has a campus seat. Log in instead.";
          if (submitBtn) submitBtn.disabled = false;
          return;
        }
        const rec = persistRecord(normalizeRecord({ name, email, role }));
        accounts.push({ id: rec.id, name, email, password, role });
        saveAccounts(accounts);
        await cloudRegister({ name, email, password, role, rec });
      } else {
        let rec = await cloudLogin(email, password);
        if (!rec) {
          const found = accounts.find((a) => a.email === email && a.password === password);
          if (!found) {
            errEl.hidden = false;
            errEl.textContent = "No match for that email and password. Check both, or join free first.";
            if (submitBtn) submitBtn.disabled = false;
            return;
          }
          persistRecord(loadRecord(found.email) || normalizeRecord(found));
        } else if (!accounts.some((a) => a.email === email)) {
          accounts.push({ id: rec.id, name: rec.name, email, password, role: rec.role });
          saveAccounts(accounts);
        }
      }
      const course = q.get("course");
      const session = currentUser();
      if (course) saveEnroll(session.role, course);
      else location.href = "profile.html";
    });
  }

  if ($("#teach-form")) {
    const ADMIN_EMAIL = "campus.steward@lmsacademy.org";
    let user = currentUser();
    if (!user) {
      location.href = "login.html?role=teacher";
    } else {
      const rec = activeRecord() || persistRecord(normalizeRecord(user));
      const preset = q.get("course") || rec.teachProfile.courseId || rec.enrolled[0] || LMS.courses[0].id;
      const sel = $("#teach-course");
      sel.innerHTML = LMS.courses
        .map((c) => {
          const hold = rec.enrolled.includes(c.id) ? " · on your desk" : "";
          return `<option value="${c.id}"${c.id === preset ? " selected" : ""}>${c.title} (${c.level})${hold}</option>`;
        })
        .join("");
      $("#teach-headline").value = rec.teachProfile.headline || "";
      $("#teach-bio").value = rec.teachProfile.bio || "";
      const statusEl = $("#teach-status");
      const unlockBtn = $("#teach-unlock");
      const holdHint = $("#teach-hold-hint");
      const paintHold = () => {
        const id = sel.value;
        const holds = activeRecord().enrolled.includes(id);
        holdHint.style.display = "block";
        holdHint.className = "field-hint is-on";
        holdHint.textContent = holds
          ? "You already hold this ledger. After permission you can teach it."
          : "This course is not on your desk yet. Seat it as a student first (max two), then ask to teach.";
      };
      const paintStatus = () => {
        const live = activeRecord();
        statusEl.hidden = live.teachStatus === "none";
        statusEl.className = "teach-banner is-" + live.teachStatus;
        if (live.teachStatus === "pending") {
          statusEl.textContent = "Permission letter is with the steward. Teaching stays locked until they reply.";
          unlockBtn.style.display = "";
        } else if (live.teachStatus === "approved") {
          statusEl.textContent = "The steward opened the door. You may teach courses you hold.";
          unlockBtn.style.display = "none";
          $("#teach-ask").textContent = "Add this course to my teaching";
        }
      };
      paintHold();
      paintStatus();
      sel.addEventListener("change", paintHold);

      $("#teach-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const live = activeRecord();
        const courseId = sel.value;
        const headline = ($("#teach-headline").value || "").trim();
        const bio = ($("#teach-bio").value || "").trim();
        if (headline.length < 3 || bio.length < 12) {
          deskToast("Write a headline and a short about-you before the steward will read it.");
          return;
        }
        persistRecord({
          ...live,
          teachProfile: { headline, bio, courseId }
        });
        const holds = live.enrolled.includes(courseId);
        const course = LMS.courses.find((c) => c.id === courseId);
        if (live.teachStatus === "approved") {
          if (!holds) {
            deskToast("Seat this course on your desk first, then you can teach it.");
            return;
          }
          const list = live.teaching.slice();
          if (!list.includes(courseId)) list.push(courseId);
          persistRecord({
            ...activeRecord(),
            role: live.role === "student" ? "both" : live.role === "teacher" ? "teacher" : "both",
            teaching: list,
            teachProfile: { headline, bio, courseId }
          });
          deskToast("This ledger is now on your teaching desk.");
          location.href = "instructor-hub.html";
          return;
        }
        const body = [
          "A teacher asks for permission to teach on LMS Academy.",
          "",
          "Name: " + live.name,
          "Email: " + live.email,
          "Campus ID: " + live.id,
          "Headline: " + headline,
          "Course: " + (course ? course.title : courseId),
          "Already holds course: " + (holds ? "yes" : "no"),
          "",
          "About:",
          bio
        ].join("\n");
        persistRecord({
          ...activeRecord(),
          teachStatus: "pending",
          teachProfile: { headline, bio, courseId }
        });
        location.href =
          "mailto:" +
          ADMIN_EMAIL +
          "?subject=" +
          encodeURIComponent("Teach permission — " + live.name) +
          "&body=" +
          encodeURIComponent(body);
        paintStatus();
      });

      unlockBtn.addEventListener("click", () => {
        const live = activeRecord();
        const courseId = sel.value;
        if (!live.enrolled.includes(courseId)) {
          deskToast("Hold the course on your student desk before teaching it.");
          return;
        }
        const list = live.teaching.slice();
        if (!list.includes(courseId)) list.push(courseId);
        persistRecord({
          ...live,
          teachStatus: "approved",
          role: live.role === "student" ? "both" : "teacher",
          teaching: list,
          teachProfile: {
            headline: ($("#teach-headline").value || "").trim(),
            bio: ($("#teach-bio").value || "").trim(),
            courseId
          }
        });
        deskToast("Permission sealed. You may teach.");
        location.href = "instructor-hub.html";
      });
    }
  }

  if ($("#hub-root")) {
    const user = currentUser();
    if (!user) {
      location.href = "login.html?role=teacher";
    } else {
      const rec = activeRecord() || persistRecord(normalizeRecord(user));
      const teaching = LMS.courses.filter((c) => rec.teaching.includes(c.id));
      const learners = teaching.reduce((n, c) => n + (c.students || 0), 0);
      const letter = (rec.name || "T").trim().charAt(0).toUpperCase();
      const panel = (id) => {
        if (rec.teachStatus !== "approved") {
          return `<div class="info-card">
            <h2 class="serif" style="font-size:28px;color:var(--navy)">Instructor hub is locked</h2>
            <p class="muted" style="margin:10px 0 16px">This campus is free — still, the steward must grant permission before you teach. Status: <b>${rec.teachStatus === "pending" ? "waiting on steward" : "not requested"}</b>.</p>
            <a class="btn btn-coral" href="teach.html#apply">Ask to teach for free</a>
          </div>`;
        }
        if (id === "courses") {
          return `<h2 class="serif" style="font-size:28px;color:var(--navy);margin-bottom:8px">Your courses</h2>
            <p class="muted" style="margin-bottom:16px">Free to host. You may teach ledgers you already hold.</p>
            ${
              teaching.length
                ? teaching
                    .map((c) => {
                      const img = courseImg(c);
                      return `<article class="hub-course">
                        ${img ? `<img src="${img}" alt="">` : ""}
                        <div>
                          <b>${c.title}</b>
                          <p class="muted">${c.level} · ${c.students.toLocaleString()} learners on this topic · $0</p>
                          <a class="btn btn-navy" href="course.html?id=${c.id}">Open room</a>
                        </div>
                      </article>`;
                    })
                    .join("")
                : `<p class="muted">No teaching courses yet.</p>`
            }
            <p style="margin-top:16px"><a class="btn btn-ghost" href="teach.html#apply">Add a course you hold</a></p>`;
        }
        if (id === "profile") {
          return `<h2 class="serif" style="font-size:28px;color:var(--navy);margin-bottom:8px">Public profile</h2>
            <p class="muted" style="margin-bottom:16px">Shown as your campus guide. No storefront, no prices.</p>
            <div class="info-card">
              <p><strong>Name:</strong> ${rec.name}</p>
              <p><strong>Headline:</strong> ${rec.teachProfile.headline || "—"}</p>
              <p style="margin-top:10px">${rec.teachProfile.bio || ""}</p>
              <p style="margin-top:16px"><a class="btn btn-navy" href="teach.html#apply">Edit profile</a></p>
            </div>`;
        }
        return `<h2 class="serif" style="font-size:28px;color:var(--navy);margin-bottom:6px">Welcome, ${rec.name.split(" ")[0] || "guide"}</h2>
          <p class="muted" style="margin-bottom:20px">Instructor hub · everything on this campus stays free.</p>
          <div class="teach-stats">
            <div><b>${teaching.length}</b><span>Courses you guide</span></div>
            <div><b>${learners.toLocaleString()}</b><span>Learners on those topics</span></div>
            <div><b>$0</b><span>Price for every seat</span></div>
            <div><b>Open</b><span>Steward permission</span></div>
          </div>
          <div class="info-card" style="margin-top:18px">
            <h3>${rec.teachProfile.headline || "Instructor"}</h3>
            <p class="muted" style="margin-top:8px">${rec.teachProfile.bio || "Add a bio on your apply page."}</p>
          </div>`;
      };
      const paint = (id) => {
        $$("[data-hub]").forEach((a) => a.classList.toggle("is-on", a.getAttribute("data-hub") === id));
        $("#hub-main").innerHTML = panel(id);
      };
      $("#hub-root").innerHTML = `
        <div class="wrap hub-layout">
          <aside class="hub-side">
            <div class="hub-who">
              <span class="user-avatar">${letter}</span>
              <div><b>${rec.name}</b><span>Free instructor desk</span></div>
            </div>
            <a href="#" data-hub="overview" class="is-on">Overview</a>
            <a href="#" data-hub="courses">Courses</a>
            <a href="#" data-hub="profile">Profile</a>
            <a href="dashboard.html">Student desk</a>
            <a href="teach.html">Teach landing</a>
          </aside>
          <div id="hub-main"></div>
        </div>`;
      $$("[data-hub]").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          paint(a.getAttribute("data-hub"));
        });
      });
      paint("overview");
    }
  }

  if ($("#dash-root")) {
    const user = currentUser();
    if (!user) {
      location.href = "login.html";
    } else {
    $("#dash-name").textContent = user.name;
    $("#dash-role") && ($("#dash-role").textContent =
      user.role === "teacher" ? "Teacher campus" : user.role === "both" ? "Student + teacher" : "Student campus");
    const ids = getEnrolledIds();
    const enrolled = LMS.courses.filter((c) => ids.includes(c.id));
    $("#dash-courses").innerHTML = enrolled.length
      ? enrolled
          .map((c, i) => {
        const p = [42, 18, 70, 12][i % 4];
        const img = courseImg(c);
        return `<div class="info-card" style="margin-bottom:12px;display:grid;grid-template-columns:88px 1fr;gap:12px">
          ${img ? `<img src="${img}" alt="" style="width:88px;height:64px;object-fit:cover;border-radius:10px">` : ""}
          <div><b>${c.title}</b>
          <p class="muted"><a class="instructor" href="${instHref(c.instructor)}">${c.instructor}</a> · ${c.level}</p>
          <div class="bar" style="margin-top:10px"><i style="width:${p}%"></i></div>
          <small class="muted">${p}% complete</small>
          <p style="margin-top:10px"><a class="btn btn-coral" href="course.html?id=${c.id}&start=1">Start</a></p></div>
        </div>`;
      })
      .join("")
      : `<p class="muted">Your desk is empty. Pick up to two courses from the catalog.</p><p style="margin-top:10px"><a class="btn btn-navy" href="courses.html">Choose courses</a></p>`;
    const tIds = getTeachingIds();
    const teaching = LMS.courses.filter((c) => tIds.includes(c.id));
    if ($("#dash-teach")) {
      $("#dash-teach").innerHTML = teaching.length
        ? teaching
            .map((c) => `<div class="info-card" style="margin-bottom:12px"><b>${c.title}</b><p class="muted">You are listed as instructor · ${c.students.toLocaleString()} learners on this topic</p></div>`)
            .join("")
        : `<p class="muted">No teaching enrollments yet.</p><a class="btn btn-navy" href="teach.html">Teach for free</a>`;
    }
    }
  }

  if ($("#profile-root")) {
    const user = currentUser();
    if (!user) {
      location.href = "login.html";
    } else {
      let rec = activeRecord() || persistRecord(normalizeRecord(user));
      const panel = $("#profile-card");
      const langNames = {
        en: "English",
        ur: "Urdu",
        hi: "Hindi",
        zh: "Chinese",
        ar: "Arabic",
        ja: "Japanese"
      };

      function progressPct(courseId) {
        const p = rec.progress?.[courseId];
        if (!p?.done) return 0;
        return Math.min(100, Math.round((p.done.length / 12) * 100)) || Math.min(100, p.done.length * 8);
      }

      function flashSave(msg) {
        let el = $("#account-save-flash");
        if (!el) {
          el = document.createElement("div");
          el.id = "account-save-flash";
          document.body.appendChild(el);
        }
        el.textContent = msg || "Saved";
        el.classList.add("is-on");
        clearTimeout(flashSave._t);
        flashSave._t = setTimeout(() => el.classList.remove("is-on"), 2400);
      }

      function avatarHtml(sizeClass) {
        const letter = (rec.name || rec.email || "U").trim().charAt(0).toUpperCase();
        if (rec.profile.photo) {
          return `<img class="acct-avatar ${sizeClass || ""}" src="${rec.profile.photo}" alt="">`;
        }
        return `<div class="acct-avatar acct-avatar-letter ${sizeClass || ""}">${letter}</div>`;
      }

      function paint(tab) {
        $$("[data-account-tab]").forEach((b) =>
          b.classList.toggle("is-on", b.getAttribute("data-account-tab") === tab)
        );
        const p = rec.profile;

        if (tab === "basic") {
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>Public profile</h2>
                  <p class="muted">These details can appear on your learner card across LMS Academy.</p>
                </div>
                ${avatarHtml("acct-avatar-sm")}
              </header>
              <form class="acct-form" id="acct-basic-form">
                <div class="acct-row-2">
                  <label>First name<input name="firstName" type="text" maxlength="40" value="${escapeHtml(p.firstName)}" required /></label>
                  <label>Last name<input name="lastName" type="text" maxlength="40" value="${escapeHtml(p.lastName)}" /></label>
                </div>
                <label>Headline
                  <input name="headline" type="text" maxlength="60" value="${escapeHtml(p.headline)}" placeholder="e.g. Aspiring full-stack developer" />
                  <span class="acct-hint">Short line under your name (max 60 characters).</span>
                </label>
                <label>About you
                  <textarea name="bio" rows="5" maxlength="500" placeholder="Tell other learners and instructors about your goals.">${escapeHtml(p.bio)}</textarea>
                  <span class="acct-hint">Plain text, up to 500 characters.</span>
                </label>
                <label>Language
                  <select name="lang">
                    ${Object.keys(langNames)
                      .map((k) => `<option value="${k}"${rec.lang === k ? " selected" : ""}>${langNames[k]}</option>`)
                      .join("")}
                  </select>
                </label>
                <label>Website<input name="website" type="url" value="${escapeHtml(p.website)}" placeholder="https://" /></label>
                <div class="acct-row-2">
                  <label>X / Twitter<input name="twitter" type="text" value="${escapeHtml(p.twitter)}" placeholder="@handle" /></label>
                  <label>LinkedIn<input name="linkedin" type="text" value="${escapeHtml(p.linkedin)}" placeholder="Profile URL or username" /></label>
                </div>
                <div class="acct-row-2">
                  <label>Facebook<input name="facebook" type="text" value="${escapeHtml(p.facebook)}" /></label>
                  <label>YouTube<input name="youtube" type="text" value="${escapeHtml(p.youtube)}" /></label>
                </div>
                <label>Timezone
                  <input name="timezone" type="text" value="${escapeHtml(p.timezone)}" placeholder="Asia/Karachi" />
                </label>
                <div class="acct-actions">
                  <button class="btn btn-navy" type="submit">Save profile</button>
                </div>
              </form>
            </div>`;
          $("#acct-basic-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const nextProfile = {
              ...p,
              firstName: String(fd.get("firstName") || "").trim(),
              lastName: String(fd.get("lastName") || "").trim(),
              headline: String(fd.get("headline") || "").trim().slice(0, 60),
              bio: String(fd.get("bio") || "").trim().slice(0, 500),
              website: String(fd.get("website") || "").trim(),
              twitter: String(fd.get("twitter") || "").trim(),
              linkedin: String(fd.get("linkedin") || "").trim(),
              facebook: String(fd.get("facebook") || "").trim(),
              youtube: String(fd.get("youtube") || "").trim(),
              timezone: String(fd.get("timezone") || "").trim() || p.timezone
            };
            const name = displayNameFromProfile(nextProfile, rec.name);
            rec = persistRecord({
              ...rec,
              name,
              lang: String(fd.get("lang") || rec.lang),
              profile: nextProfile
            });
            applyLang(rec.lang);
            flashSave("Profile saved");
            paint("basic");
            mountHeader();
          });
          return;
        }

        if (tab === "photo") {
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>Photo</h2>
                  <p class="muted">Add a clear face photo so instructors and classmates recognise you.</p>
                </div>
              </header>
              <div class="acct-photo-block">
                ${avatarHtml("acct-avatar-lg")}
                <div>
                  <p class="muted" style="margin-bottom:12px">JPG or PNG, kept on this device (and synced to your account metadata when signed in).</p>
                  <label class="btn btn-navy acct-file-btn">Upload photo
                    <input id="acct-photo-input" type="file" accept="image/*" hidden />
                  </label>
                  ${p.photo ? `<button type="button" class="btn btn-ghost" id="acct-photo-clear">Remove</button>` : ""}
                </div>
              </div>
            </div>`;
          $("#acct-photo-input")?.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (file.size > 900000) {
              flashSave("Choose a smaller image (under ~900KB)");
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              rec = persistRecord({
                ...rec,
                profile: { ...rec.profile, photo: String(reader.result || "") }
              });
              flashSave("Photo updated");
              paint("photo");
              mountHeader();
            };
            reader.readAsDataURL(file);
          });
          $("#acct-photo-clear")?.addEventListener("click", () => {
            rec = persistRecord({ ...rec, profile: { ...rec.profile, photo: "" } });
            flashSave("Photo removed");
            paint("photo");
            mountHeader();
          });
          return;
        }

        if (tab === "security") {
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>Login &amp; security</h2>
                  <p class="muted">Email is your campus ID. Change password with your current one.</p>
                </div>
              </header>
              <form class="acct-form" id="acct-security-form">
                <label>Email
                  <input type="email" value="${rec.email}" readonly />
                  <span class="acct-hint">Email cannot be changed here.</span>
                </label>
                <label>Current password<input name="current" type="password" autocomplete="current-password" required /></label>
                <label>New password<input name="next" type="password" autocomplete="new-password" required /></label>
                <label>Confirm new password<input name="confirm" type="password" autocomplete="new-password" required /></label>
                <p class="acct-hint">Use 8+ characters with upper, lower, number, and a symbol.</p>
                <p class="acct-error" id="acct-sec-err" hidden></p>
                <div class="acct-actions">
                  <button class="btn btn-navy" type="submit">Update password</button>
                </div>
              </form>
            </div>`;
          $("#acct-security-form")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const errEl = $("#acct-sec-err");
            const fd = new FormData(e.target);
            const current = String(fd.get("current") || "");
            const next = String(fd.get("next") || "");
            const confirm = String(fd.get("confirm") || "");
            errEl.hidden = true;
            if (next !== confirm) {
              errEl.hidden = false;
              errEl.textContent = "New passwords do not match.";
              return;
            }
            if (!isPasswordStrong(next)) {
              errEl.hidden = false;
              errEl.textContent = "New password needs: " + passwordGaps(next).join(", ") + ".";
              return;
            }
            const accounts = getAccounts();
            const i = accounts.findIndex((a) => a.email === rec.email);
            if (i < 0 || accounts[i].password !== current) {
              errEl.hidden = false;
              errEl.textContent = "Current password is incorrect.";
              return;
            }
            accounts[i].password = next;
            saveAccounts(accounts);
            try {
              const sb = window.lmsSupabase;
              if (sb) {
                const { error } = await sb.auth.updateUser({ password: next });
                if (error) console.error(error.message);
              }
            } catch (err) {}
            e.target.reset();
            flashSave("Password updated");
          });
          return;
        }

        if (tab === "privacy") {
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>Privacy</h2>
                  <p class="muted">Control what other learners can see about you.</p>
                </div>
              </header>
              <form class="acct-form" id="acct-privacy-form">
                <label class="acct-check">
                  <input type="checkbox" name="showProfile" ${p.showProfile ? "checked" : ""} />
                  <span><b>Show my public profile</b><small>Name, headline, and about text may appear on campus pages.</small></span>
                </label>
                <div class="acct-actions">
                  <button class="btn btn-navy" type="submit">Save privacy</button>
                </div>
              </form>
            </div>`;
          $("#acct-privacy-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            rec = persistRecord({
              ...rec,
              profile: { ...p, showProfile: fd.get("showProfile") === "on" }
            });
            flashSave("Privacy saved");
            paint("privacy");
          });
          return;
        }

        if (tab === "notifications") {
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>Notifications</h2>
                  <p class="muted">Choose which campus emails you want (stored with your account).</p>
                </div>
              </header>
              <form class="acct-form" id="acct-notify-form">
                <label class="acct-check">
                  <input type="checkbox" name="emailTips" ${p.emailTips ? "checked" : ""} />
                  <span><b>Learning tips</b><small>Occasional study tips and new catalog picks.</small></span>
                </label>
                <label class="acct-check">
                  <input type="checkbox" name="emailReminders" ${p.emailReminders ? "checked" : ""} />
                  <span><b>Course reminders</b><small>Nudge when you have unfinished lectures on your desk.</small></span>
                </label>
                <div class="acct-actions">
                  <button class="btn btn-navy" type="submit">Save preferences</button>
                </div>
              </form>
            </div>`;
          $("#acct-notify-form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            rec = persistRecord({
              ...rec,
              profile: {
                ...p,
                emailTips: fd.get("emailTips") === "on",
                emailReminders: fd.get("emailReminders") === "on"
              }
            });
            flashSave("Notification preferences saved");
            paint("notifications");
          });
          return;
        }

        if (tab === "learning") {
          const enrolled = LMS.courses.filter((c) => rec.enrolled.includes(c.id));
          const slots = [0, 1]
            .map((i) => {
              const c = enrolled[i];
              if (!c) {
                return `<a class="desk-slot is-empty" href="courses.html">
                  <span class="desk-slot-kicker">Open seat ${i + 1}</span>
                  <strong>Add a course</strong>
                  <span>You can keep two courses active at once.</span>
                </a>`;
              }
              const img = courseImg(c);
              const pct = progressPct(c.id);
              return `<article class="desk-slot">
                ${img ? `<img src="${img}" alt="">` : ""}
                <span class="desk-slot-kicker">Seat ${i + 1}</span>
                <strong>${c.title}</strong>
                <span>${c.instructor} · ${c.level}</span>
                <div class="bar"><i style="width:${pct}%"></i></div>
                <small class="muted">${pct}% complete</small>
                <div class="desk-slot-actions">
                  <a class="btn btn-coral" href="course.html?id=${c.id}&start=1">Continue</a>
                  <button type="button" class="btn btn-ghost" data-drop-course="${c.id}">Remove</button>
                </div>
              </article>`;
            })
            .join("");
          panel.innerHTML = `
            <div class="acct-panel">
              <header class="acct-panel-head">
                <div>
                  <h2>My learning</h2>
                  <p class="muted">Your two-course desk — start, continue, or free a seat.</p>
                </div>
                <a class="btn btn-ghost" href="dashboard.html">Full dashboard</a>
              </header>
              <div class="desk-grid" style="padding:0">${slots}</div>
              ${
                rec.teachProfile.headline
                  ? `<div class="acct-teach-note">
                      <span class="desk-slot-kicker">${rec.teachStatus === "approved" ? "Approved to teach" : rec.teachStatus === "pending" ? "Waiting on steward" : "Draft"}</span>
                      <strong>${rec.teachProfile.headline}</strong>
                      <p class="muted">${rec.teachProfile.bio}</p>
                      <a class="btn btn-navy" href="instructor-hub.html">Instructor hub</a>
                    </div>`
                  : `<p style="margin-top:18px"><a class="btn btn-ghost" href="teach.html">Ask to teach on campus</a></p>`
              }
            </div>`;
          $$("[data-drop-course]").forEach((btn) => {
            btn.addEventListener("click", () => {
              toggleSelectCourse(btn.getAttribute("data-drop-course"));
              rec = activeRecord();
              paint("learning");
            });
          });
        }
      }

      $$("[data-account-tab]").forEach((btn) => {
        btn.addEventListener("click", () => paint(btn.getAttribute("data-account-tab")));
      });
      const startTab = new URLSearchParams(location.search).get("tab") || "basic";
      paint(startTab);
    }
  }

  function mountLearnerHome() {
    if (!$("body.home") || !currentUser()) return;
    const rec = activeRecord();
    if (!rec) return;
    document.body.classList.add("is-learner");
    const promo = $(".promo");
    if (promo) {
      promo.innerHTML = `Signed in as <strong>${rec.name || "Learner"}</strong> · <a href="profile.html">Account settings</a> · <a href="dashboard.html">My learning</a>`;
    }
    const first = (rec.profile?.firstName || rec.name || "there").split(" ")[0];
    const enrolled = LMS.courses.filter((c) => rec.enrolled.includes(c.id));
    const hero = $(".hero");
    if (hero) {
      const learnCards = enrolled.length
        ? enrolled
            .map((c) => {
              const img = courseImg(c);
              const p = rec.progress?.[c.id];
              const pct = p?.done ? Math.min(100, Math.round((p.done.length / 12) * 100) || p.done.length * 8) : 12;
              return `<a class="learn-card" href="course.html?id=${c.id}&start=1">
                ${img ? `<img src="${img}" alt="">` : `<div class="learn-card-fallback"></div>`}
                <div>
                  <span class="learn-kicker">${c.level}</span>
                  <strong>${c.title}</strong>
                  <span class="muted">${c.instructor}</span>
                  <div class="bar"><i style="width:${pct}%"></i></div>
                  <em>${pct}% complete · Continue</em>
                </div>
              </a>`;
            })
            .join("")
        : `<div class="learn-empty">
            <strong>No courses on your desk yet</strong>
            <p class="muted">Pick up to two courses and they will show here when you return.</p>
            <a class="btn btn-coral" href="courses.html">Browse courses</a>
          </div>`;
      hero.innerHTML = `
        <div class="wrap learner-hero">
          <div class="learner-hero-copy">
            <p class="kicker">Welcome back</p>
            <h1>Let's keep learning, <em>${escapeHtml(first)}</em>.</h1>
            <p class="lead">${escapeHtml(rec.profile?.headline || "Pick up where you left off, or claim a new seat from the catalog.")}</p>
            <div class="chips">
              <a class="chip is-on" href="dashboard.html">My learning</a>
              <a class="chip" href="courses.html">Browse catalog</a>
              <a class="chip" href="profile.html">Account settings</a>
              <a class="chip" href="study.html">Study Hub</a>
            </div>
          </div>
          <div class="learner-desk">
            <div class="section-h" style="margin-bottom:12px">
              <div>
                <h2 style="font-size:22px">My learning</h2>
                <p>${enrolled.length} / 2 active seats</p>
              </div>
            </div>
            <div class="learn-stack">${learnCards}</div>
          </div>
        </div>`;
    }
    const dual = $(".dual-cta");
    if (dual) {
      const section = dual.closest(".section");
      if (section) section.hidden = true;
    }
  }

  mountLearnerHome();


  window.addEventListener("lms-ready", () => {
    cloudHydrate().then(() => {
      const rec = activeRecord();
      if (rec) cloudSave(rec);
    });
  });
  if (window.lmsSupabase) {
    cloudHydrate().then(() => {
      const rec = activeRecord();
      if (rec) cloudSave(rec);
    });
  }
})();
