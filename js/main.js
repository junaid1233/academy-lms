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

  function courseCard(c) {
    const badge = c.badge ? `<span class="badge badge-gold">${c.badge}</span>` : "";
    const img = courseImg(c);
    const fallback = "https://picsum.photos/seed/" + encodeURIComponent(c.id) + "/800/500";
    return `<a class="course" href="course.html?id=${c.id}">
      <div class="cover c-${c.category}">
        <img src="${img}" alt="${c.title}" onerror="this.onerror=null;this.src='${fallback}'">
        ${badge}<span class="cover-meta">${catName(c.category)} · ${c.hours}h</span>
      </div>
      <div class="course-body">
        <span class="badge badge-level">${c.level}</span>
        <h3>${c.title}</h3>
        <div class="instructor">${c.instructor}</div>
        <div class="stars">${stars(c.rating)} ${c.rating} <em>(${c.reviews.toLocaleString()})</em></div>
        <div class="course-foot"><span>${c.price}</span><span class="muted">${c.lectures} lectures</span></div>
      </div>
    </a>`;
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

  function enhanceHeader() {
    const actions = $(".header-actions");
    if (!actions || $("#teach-link")) return;
    const teach = document.createElement("a");
    teach.id = "teach-link";
    teach.className = "btn btn-ghost";
    teach.href = "teach.html";
    teach.textContent = "Teach";
    actions.insertBefore(teach, actions.firstChild);
    const mobile = $("#mobile-nav");
    if (mobile && !mobile.querySelector("[href='teach.html']")) {
      mobile.insertAdjacentHTML("afterbegin", "<a href='teach.html'>Teach</a><a href='register.html?role=student'>Join as student</a>");
    }
  }

  function mountFooter() {
    const html = `
      <div class="footer-crest"></div>
      <div class="wrap">
        <div class="footer-hero">
          <div>
            <p class="footer-kicker">LMS Academy campus</p>
            <h2>Learn in order.<br>Master with practice.<br>Build for real.</h2>
          </div>
          <div class="footer-levels">
            <a href="courses.html?level=Beginner"><small>01</small>Beginner</a>
            <a href="courses.html?level=Intermediate"><small>02</small>Intermediate</a>
            <a href="courses.html?level=Advanced"><small>03</small>Advanced</a>
            <a href="courses.html?level=Expert"><small>04</small>Expert</a>
          </div>
        </div>
        <div class="footer-grid">
          <div>
            <a class="logo" href="index.html"><img src="assets/logo.svg" alt="" /><span class="logo-text">LMS Academy</span></a>
            <p style="margin:12px 0;max-width:280px">IT from first click to first job. Startup skills, then code, then careers.</p>
          </div>
          <div>
            <h4>Learn</h4>
            <a href="courses.html">Course catalog</a>
            <a href="study.html">Study Hub</a>
            <a href="courses.html?cat=basics">Computer basics</a>
            <a href="courses.html?cat=web">Web development</a>
          </div>
          <div>
            <h4>Build</h4>
            <a href="certifications.html">Certificates</a>
            <a href="paths.html">Career paths</a>
            <a href="courses.html?cat=ai">AI & ML</a>
            <a href="dashboard.html">Dashboard</a>
          </div>
          <div>
            <h4>Academy</h4>
            <a href="about.html">About</a>
            <a href="teach.html">Teach</a>
            <a href="login.html">Log in</a>
            <a href="register.html">Join free</a>
          </div>
          <div>
            <h4>Notes in your inbox</h4>
            <p style="font-size:14px">New units, paths, and free CS drops.</p>
            <form class="news" data-news>
              <input type="email" placeholder="Email" required />
              <button class="btn btn-coral" type="submit">Go</button>
            </form>
          </div>
        </div>
        <div class="foot-note">
          <span>© 2026 LMS Academy · A campus, not a clone.</span>
          <span class="footer-sig">Learn. Master. Build.</span>
        </div>
      </div>`;
    $$(".footer").forEach((f) => {
      f.innerHTML = html;
    });
    $$("[data-news]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.querySelector("input").value = "";
        form.insertAdjacentHTML("afterend", "<p style='font-size:13px;margin-top:8px'>Saved. See you in class.</p>");
      });
    });
  }

  enhanceHeader();
  mountFooter();

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
      renderCourses("#home-courses", list);
      const label = $("#home-level-label");
      if (label) label.textContent = level + " · " + list.length + " courses";
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
    $("#c-inst").textContent = c.instructor;
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
    $("#enroll-student")?.addEventListener("click", (e) => {
      e.preventDefault();
      saveEnroll("student", c.id);
    });
    $("#enroll-teacher")?.addEventListener("click", (e) => {
      e.preventDefault();
      saveEnroll("teacher", c.id);
    });
    $("#c-outcomes").innerHTML = c.outcomes.map((o) => `<li>• ${o}</li>`).join("");
    const weeks = [
      "Foundations & setup",
      "Core skills with guided practice",
      "Projects and feedback loops",
      "Capstone, review, next steps"
    ];
    $("#c-curric").innerHTML = weeks
      .map(
        (w, i) =>
          `<details ${i === 0 ? "open" : ""}><summary>Module ${i + 1}: ${w}</summary><p class="muted" style="margin-top:8px">Video lessons, exercises, and a checkpoint quiz. ${c.level} pacing.</p></details>`
      )
      .join("");
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
    $("#t-mastery").textContent = s.mastery + "% mastery";
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
        const key = "lms-mastery-" + s.id;
        const n = Math.min(100, Number(localStorage.getItem(key) || s.mastery) + 8);
        localStorage.setItem(key, n);
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
    let user = JSON.parse(localStorage.getItem("lms-user") || "null");
    if (!user) {
      location.href = "register.html?role=" + role + (courseId ? "&course=" + courseId : "");
      return;
    }
    if (role === "teacher" && user.role === "student") user.role = "both";
    else if (role === "student" && user.role === "teacher") user.role = "both";
    else if (!user.role) user.role = role;
    localStorage.setItem("lms-user", JSON.stringify(user));
    const key = role === "teacher" ? "lms-teaching" : "lms-enrolled";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    if (courseId && !list.includes(courseId)) list.push(courseId);
    localStorage.setItem(key, JSON.stringify(list));
    location.href = "dashboard.html";
  }

  const auth = $("#auth-form");
  if (auth) {
    const preset = q.get("role");
    if (preset) {
      const r = document.querySelector(`input[name=role][value="${preset}"]`);
      if (r) r.checked = true;
    }
    auth.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#name")?.value || $("#email").value.split("@")[0];
      const role = document.querySelector("input[name=role]:checked")?.value || preset || "student";
      localStorage.setItem("lms-user", JSON.stringify({ name, email: $("#email").value, role }));
      const course = q.get("course");
      if (course) saveEnroll(role, course);
      else location.href = "dashboard.html";
    });
  }

  if ($("#teach-form")) {
    $("#teach-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let user = JSON.parse(localStorage.getItem("lms-user") || "null");
      if (!user) {
        location.href = "register.html?role=teacher";
        return;
      }
      user.role = user.role === "student" ? "both" : "teacher";
      localStorage.setItem("lms-user", JSON.stringify(user));
      const list = JSON.parse(localStorage.getItem("lms-teaching") || "[]");
      const pick = $("#teach-course")?.value;
      if (pick && !list.includes(pick)) list.push(pick);
      localStorage.setItem("lms-teaching", JSON.stringify(list));
      location.href = "dashboard.html";
    });
  }

  if ($("#dash-root")) {
    const user = JSON.parse(localStorage.getItem("lms-user") || '{"name":"Learner","role":"student"}');
    $("#dash-name").textContent = user.name;
    $("#dash-role") && ($("#dash-role").textContent =
      user.role === "teacher" ? "Teacher campus" : user.role === "both" ? "Student + teacher" : "Student campus");
    const ids = JSON.parse(localStorage.getItem("lms-enrolled") || "[]");
    let enrolled = LMS.courses.filter((c) => ids.includes(c.id));
    if (!enrolled.length) enrolled = LMS.courses.filter((c) => c.level === "Beginner").slice(0, 3);
    $("#dash-courses").innerHTML = enrolled
      .map((c, i) => {
        const p = [42, 18, 70, 12][i % 4];
        const img = courseImg(c);
        return `<div class="info-card" style="margin-bottom:12px;display:grid;grid-template-columns:88px 1fr;gap:12px">
          ${img ? `<img src="${img}" alt="" style="width:88px;height:64px;object-fit:cover;border-radius:10px">` : ""}
          <div><b>${c.title}</b>
          <p class="muted">${c.instructor} · ${c.level}</p>
          <div class="bar" style="margin-top:10px"><i style="width:${p}%"></i></div>
          <small class="muted">${p}% complete</small></div>
        </div>`;
      })
      .join("");
    const tIds = JSON.parse(localStorage.getItem("lms-teaching") || "[]");
    const teaching = LMS.courses.filter((c) => tIds.includes(c.id));
    if ($("#dash-teach")) {
      $("#dash-teach").innerHTML = teaching.length
        ? teaching
            .map((c) => `<div class="info-card" style="margin-bottom:12px"><b>${c.title}</b><p class="muted">You are listed as instructor · ${c.students.toLocaleString()} learners on this topic</p></div>`)
            .join("")
        : `<p class="muted">No teaching enrollments yet.</p><a class="btn btn-navy" href="teach.html">Enroll as teacher</a>`;
    }
  }
})();
