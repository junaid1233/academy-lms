(function () {
  const TOPICS = [
    {
      id: "about",
      keys: [
        "what is", "what's this", "about site", "about lms", "about this", "about academy", "tell me about",
        "hello", "hi", "hey", "good morning", "good evening", "salam", "assalam", "assalamualaikum", "help", "help me",
        "site kya", "ye site", "yeh site", "ye website", "lms academy", "academy kya", "campus kya", "website kya", "web site",
        "tagline", "mission", "kyun", "kyun hai", "why this", "why lms", "who are you", "bot kya", "tum kaun", "introduce",
        "info", "information", "detail", "details", "samjhao", "batao site", "overview", "summary", "explain site",
        "یہ سائٹ", "سائٹ کیا", "کیمپس کیا", "کیا ہے", "مدد", "سلام",
        "这是什么", "网站", "你好", "关于", "क्या है", "यह साइट", "नमस्ते", "こんにちは", "これは何", "サイト",
        "ما هو", "مرحبا", "bonjour", "hola", "qué es", "hallo", "was ist", "olá", "o que é",
        "что это", "помощь", "안녕하세요", "nedir", "merhaba", "apa itu", "ciao", "campus"
      ]
    },
    {
      id: "pages",
      keys: [
        "pages", "page list", "all pages", "which pages", "menu", "navigation", "sitemap", "site map", "links", "sare pages",
        "kahan", "kahan hai", "where is", "where can", "kaun se page", "kon sa page", "kitne pages", "header", "footer",
        "navbar", "top bar", "sidebar", "pages kya", "site structure", "صفحات", "صفحہ کہاں",
        "पेज", "सभी पेज", "कहाँ है", "ページ", "メニュー", "páginas", "dónde", "seiten", "wo ist", "страницы", "sayfalar", "halaman"
      ]
    },
    {
      id: "login",
      keys: [
        "login", "log in", "signin", "sign in", "sign-in", "account", "login kaise", "kaise login", "how to login", "how do i login",
        "logun", "loginn", "andar kaise", "enter account", "access account", "can't login", "cannot login", "login nahi", "login problem",
        "لاگ ان", "لاگ اِن", "لاگ ان کیسے", "اکاؤنٹ", "دخول", "تسجيل الدخول", "كيف أسجل",
        "登录", "如何登录", "लॉग इन", "लॉगिन", "लॉگ इन कैसे", "ログイン", "サインイン",
        "connexion", "se connecter", "iniciar sesión", "anmelden", "entrar", "войти", "вход", "로그인", "giriş", "masuk akun", "accedi"
      ]
    },
    {
      id: "register",
      keys: [
        "register", "registration", "join", "join free", "sign up", "signup", "sign-up", "create account", "naya account",
        "account banao", "account banana", "new account", "sign up kaise", "register kaise", "how to register", "how to join",
        "enroll account", "membership", "make account", "account banaen",
        "جوائن", "رجسٹر", "اکاؤنٹ بنائیں", "نیا اکاؤنٹ", "إنشاء حساب", "انضم", "تسجيل",
        "注册", "加入", "रजिस्टर", "जॉइन", "खाता बनाएं", "新規登録", "参加",
        "inscription", "registrarse", "registrieren", "cadastrar", "регистрация", "가입", "kayıt", "daftar", "registrati"
      ]
    },
    {
      id: "password",
      keys: [
        "password", "passwd", "strong password", "password rule", "password rules", "password kaise", "password requirement",
        "password strong", "weak password", "forgot password", "change password", "eye icon", "show password", "hide password",
        "پاس ورڈ", "پاسورڈ", "مضبوط پاس ورڈ", "رمز عبور", "كلمة المرور",
        "密码", "强密码", "पासवर्ड", "मजबूत पासवर्ड", "パスワード",
        "mot de passe", "contraseña", "passwort", "senha", "пароль", "비밀번호", "şifre", "kata sandi", "password forte"
      ]
    },
    {
      id: "learn",
      keys: [
        "how to learn", "learn course", "start course", "start learning", "enroll", "enrol", "select course", "my learning",
        "course kaise", "kaise seekh", "kaise padho", "seekhna", "seekhein", "padhna", "padhai", "parhai", "study course",
        "learning kaise", "shuru kaise", "begin learning", "get started", "getting started", "first step", "kaise shuru", "how to start",
        "سیکھنا", "پڑھنا", "کیسے سیکھیں", "پڑھائی", "تعلم", "كيف أتعلم", "ابدأ التعلم",
        "怎么学", "学习", "如何学习", "कैसे सीखें", "पढ़ाई", "सीखना", "学び方", "学ぶ",
        "apprendre", "comment apprendre", "aprender", "cómo aprender", "lernen", "wie lernen", "изучать", "배우기", "öğrenmek", "belajar", "imparare"
      ]
    },
    {
      id: "desk",
      keys: [
        "desk", "student desk", "two course", "2 course", "2 courses", "max 2", "maximum 2", "desk full", "desk is full",
        "select for desk", "on your desk", "ledger", "seat", "seated", "add course", "course add", "course select",
        "do course", "sirf 2", "sirf do", "zyada course", "remove course", "course hatao", "desk pe", "table pe course", "limit 2",
        "ڈیسک", "ڈیسک پر", "دو کورس", "مكتب", "المكتب",
        "书桌", "课桌", "最多两门", "डेस्क", "डेस्क पर", "दो कोर्स", "机", "デスク",
        "bureau", "escritorio", "schreibtisch", "mesa do aluno", "стол", "책상", "masa", "meja", "scrivania"
      ]
    },
    {
      id: "course",
      keys: [
        "course", "courses", "kurs", "catalog", "catalogue", "lecture", "lectures", "lesson", "lessons", "preview",
        "level", "levels", "beginner", "intermediate", "advanced", "expert", "curriculum", "requirements", "description",
        "courses.html", "kitne course", "kitne courses", "how many course", "how many courses", "course list", "sare course",
        "class", "classes", "module", "modules", "syllabus", "outcome", "outcomes", "course detail", "course page", "browse courses",
        "کورس", "کورسز", "کیٹلاگ", "لیکچر", "دورة", "دورات", "كتالوج", "محاضرة",
        "课程", "目录", "讲座", "कोर्स", "कोर्सेस", "कैटलॉग", "レクチャー", "コース", "カタログ",
        "curso", "cursos", "cours", "курс", "강의", "kursus", "corso", "lezione"
      ]
    },
    {
      id: "categories",
      keys: [
        "category", "categories", "topic", "topics", "subject", "subjects", "domain", "browse topics",
        "web development", "programming", "data science", "cybersecurity", "computer basics", "machine learning",
        "artificial intelligence", "cloud & devops", "mobile development", "database", "databases", "ui/ux", "career skills", "math for it",
        "category list", "topics list", "kis category", "topics kya", "categories kya",
        "زمرہ", "زمرے", "موضوع", "موضوعات", "تصنيف", "فئة", "أقسام",
        "分类", "类别", "主题", "विषय", "श्रेणी", "श्रेणियाँ", "カテゴリ", "ジャンル",
        "categoría", "categorías", "catégorie", "kategorie", "категории", "카테고리", "kategori", "categoria"
      ]
    },
    {
      id: "teach",
      keys: [
        "teacher", "teach", "instructor", "teaching", "permission", "teach.html", "padhao", "parhao", "ustad", "tutor",
        "become teacher", "teacher kaise", "teach kaise", "how to teach", "apply teach", "teaching permission", "course publish", "want to teach",
        "پڑھانا", "استاد", "استاد بنیں", "اجازت", "معلم", "تدريس", "أريد أن أعلم",
        "老师", "教学", "如何授课", "शिक्षक", "अध्यापक", "पढ़ाना", "教える", "講師",
        "enseignant", "enseigner", "profesor", "enseñar", "lehrer", "unterrichten", "учитель", "가르치기", "öğretmek", "mengajar", "insegnante"
      ]
    },
    {
      id: "instructor",
      keys: [
        "instructor hub", "instructor-hub", "teaching hub", "my courses teach", "approved teacher", "teacher hub",
        "instructor panel", "teacher dashboard", "teaching tools", "after approval", "permission ke baad", "hub for teachers",
        "انسٹرکٹر ہب", "ٹیچر ہب", "لوحة المعلم", "教师中心", "インストラクターハブ", "centro docente"
      ]
    },
    {
      id: "study",
      keys: [
        "study hub", "study.html", "studyhub", "practice", "practise", "mastery", "units", "drill", "drills",
        "quiz", "challenge", "extra practice", "mashq", "riyaz", "practice hub", "short unit", "study page", "practice more",
        "اسٹڈی ہب", "مشق", "ریاض", "پریکٹس", "تدريب", "ممارسة", "مركز الدراسة",
        "练习", "学习中心", "अभ्यास", "प्रैक्टिस", "स्टडी हब", "練習", "スタディハブ",
        "pratique", "práctica", "übung", "практика", "연습", "pratik", "latihan", "pratica"
      ]
    },
    {
      id: "paths",
      keys: [
        "path", "paths", "career path", "career paths", "career track", "career tracks", "learning path", "roadmap",
        "front-end", "frontend", "back-end", "backend", "full-stack", "fullstack", "data analyst", "cloud engineer",
        "paths.html", "role path", "job path", "career", "career plan", "paths kya",
        "کیریئر", "کیریئر پاتھ", "راستہ", "مسار", "مسارات", "مسار مهني",
        "职业路径", "路径", "करियर", "करियर पाथ", "पाथ", "キャリアパス", "学習パス",
        "parcours", "ruta", "rutas", "karrierepfad", "путь", "경로", "kariyer yolu", "jalur", "percorso"
      ]
    },
    {
      id: "certs",
      keys: [
        "certificate", "certificates", "certification", "certifications", "cert", "certs", "project certificate",
        "diploma", "credential", "badge cert", "earn certificate", "certificate kaise", "serteficate", "get certificate",
        "سرٹیفکیٹ", "سند", "شهادة", "شهادات", "شهادة المشروع",
        "证书", "认证", "प्रमाणपत्र", "सर्टिफिकेट", "証明書", "認定",
        "certificat", "certificado", "zertifikat", "сертификат", "수료증", "sertifika", "sertifikat", "attestato"
      ]
    },
    {
      id: "dashboard",
      keys: [
        "dashboard", "dash board", "continue", "continue learning", "my learning", "progress", "dashboard.html",
        "learning home", "learning panel", "student home", "continue courses", "meri learning", "progress bar", "my progress",
        "ڈیش بورڈ", "میری لرننگ", "پیشرفت", "لوحة التعلم", "التقدم",
        "仪表板", "我的学习", "进度", "डैशबोर्ड", "मेरी लर्निंग", "ダッシュボード", "学習ホーム",
        "tableau de bord", "fortschritt", "кабинет", "대시보드", "panelim", "dasbor", "cruscotto"
      ]
    },
    {
      id: "profile",
      keys: [
        "profile", "profil", "account settings", "photo", "picture", "edit name", "change name", "profile.html",
        "settings", "setting", "avatar", "account info", "edit profile", "profile update", "mera profile", "account page", "update photo",
        "پروفائل", "اکاؤنٹ سیٹنگز", "تصویر", "الملف", "إعدادات الحساب", "صورة",
        "个人资料", "账户设置", "头像", "प्रोफ़ाइल", "खाता सेटिंग", "プロフィール", "設定",
        "paramètres", "configuración", "einstellungen", "профиль", "프로필", "ayarlar", "profil saya", "impostazioni"
      ]
    },
    {
      id: "home",
      keys: [
        "home", "homepage", "home page", "index", "landing", "first page", "main page", "start page", "ghar page",
        "main screen", "welcome page", "front page", "ana sayfa",
        "ہوم", "مرکزی صفحہ", "الصفحة الرئيسية", "الرئيسية",
        "首页", "主页", "होम", "होमपेज", "ホーム", "トップ",
        "accueil", "inicio", "startseite", "главная", "홈", "beranda"
      ]
    },
    {
      id: "free",
      keys: [
        "free", "price", "cost", "money", "muft", "payment", "pay", "checkout", "fees", "paid", "charge",
        "subscription", "buy", "purchase", "paisa", "keemat", "qemat", "billing", "is it free", "free hai", "kitna paisa",
        "مفت", "قیمت", "پیسہ", "ادائیگی", "مجاني", "سعر", "دفع", "هل مجاني",
        "免费", "价格", "付钱", "मुफ़्त", "मुफ्त", "कीमत", "無料", "料金",
        "gratuit", "gratis", "preis", "kostenlos", "бесплатно", "무료", "ücretsiz", "gratuito"
      ]
    },
    {
      id: "language",
      keys: [
        "language", "languages", "explore", "zaban", "zuban", "globe", "translate", "translation", "switch language",
        "urdu", "hindi", "arabic", "chinese", "japanese", "english", "lang change", "language change", "language kaise",
        "change language", "rtl", "french", "spanish", "german",
        "زبان", "زبان بدلیں", "ایکسپلور", "لغة", "تغيير اللغة", "العربية",
        "语言", "切换语言", "भाषा", "भाषा बदलें", "言語", "言語変更",
        "langue", "idioma", "sprache", "язык", "언어", "dil", "bahasa", "lingua"
      ]
    },
    {
      id: "logout",
      keys: [
        "logout", "log out", "log-out", "sign out", "signout", "sign-out", "exit account", "bahir", "baahar", "logout kaise",
        "session end", "leave account", "how to logout",
        "لاگ آؤٹ", "باہر نکلیں", "خروج", "تسجيل الخروج",
        "退出", "登出", "लॉग आउट", "साइन आउट", "ログアウト",
        "déconnexion", "cerrar sesión", "abmelden", "выйти", "로그아웃", "çıkış", "keluar", "esci"
      ]
    },
    {
      id: "contact",
      keys: [
        "contact", "admin", "support", "email", "mail", "steward", "help desk", "helpdesk", "customer care",
        "report", "complaint", "campus.steward", "who to email", "rabta", "rabtah", "contact us", "how to contact",
        "رابطہ", "ای میل", "سپورٹ", "اتصل", "دعم", "بريد",
        "联系", "客服", "邮箱", "संपर्क", "ईमेल", "सहायता", "連絡", "サポート",
        "contacto", "kontakt", "contatto", "поддержка", "문의", "destek", "dukungan", "aide"
      ]
    },
    {
      id: "search",
      keys: [
        "search", "search bar", "find course", "find courses", "filter", "filters", "talash", "tlaash", "dhundo",
        "dhoondo", "khojo", "look for", "lookup", "how to search", "search kaise",
        "تلاش", "ڈھونڈو", "بحث", "ابحث",
        "搜索", "查找", "खोज", "ढूंढो", "検索", "探す",
        "rechercher", "buscar", "suchen", "поиск", "검색", "ara", "cari", "cerca"
      ]
    },
    {
      id: "done",
      keys: [
        "done", "done bar", "done button", "after select", "start learning button", "bottom bar", "neeche bar",
        "done kya", "done kaise", "open course button", "what is done",
        "ڈن", "نیچے بار", "تم", "زر تم",
        "完成", "底部按钮", "डन", "नीचे बार", "完了", "下部バー",
        "bouton done", "barra inferior", "fertig", "готово", "완료", "bitti", "selesai", "fatto"
      ]
    }
  ];


  const EN = {
    about:
      "LMS Academy (tagline: Learn. Master. Build.) is a free IT learning campus. One home for catalog, Study Hub, career Paths, and project Certificates. Navy/teal academic look — not a sale marketplace. Beginner → Expert IT only: programming, web, data, AI, cloud, security, mobile, CS, SQL, math.",
    pages:
      "Main pages: Home (index), About, Courses catalog, Course detail, Topic/category, Paths, Certifications, Study Hub, Teach, Instructor hub, Dashboard (My learning), Profile (account settings), Log in, Join free. Header: Explore (languages), Paths, Study Hub, search, account. Footer: Learn / Build / Account links.",
    login:
      "Log in page (login.html): use the email + password from Join free. After login you get My learning, profile chip, and Log out. Wrong password? Check caps and retype. Need an account first? Use Join free.",
    register:
      "Join free (register.html): enter name, a complete email (name@domain.com), and a strong password. Role is student by default. After join you are logged in and can open Courses / Profile / Dashboard.",
    password:
      "Password must have: 8+ characters, lowercase, uppercase, a number, and a symbol (e.g. !@#). Eye icon shows/hides the password while typing. Forgot it? Open Log in → Forgot password: enter your email, use the 6-digit campus reset code, then create and confirm a new password.",
    learn:
      "Flow: Courses → pick level or category → Select for desk (max 2) → Done opens the course → mark lectures complete → practice in Study Hub. Logged-in home focuses on learning; marketing blocks hide. Dashboard = Continue your courses.",
    desk:
      "Student desk holds max 2 courses at a time. Select for desk seats a course; if full, remove one from Profile → My learning first. After select, a bottom Done bar appears to open the course. Toast messages confirm seat / full desk.",
    course:
      "Open Courses for the free catalog by Beginner, Intermediate, Advanced, Expert. Each course page has lectures (early ones often Preview), accordion sections, Requirements, Description, outcomes, and instructor. Ask me a course name (e.g. Python, React, AWS) for live details from the catalog.",
    categories:
      "Categories (topics): Computer Basics, Web Development, Programming, Data Science, AI & Machine Learning, Cloud & DevOps, Cybersecurity, Mobile Development, Computer Science, Databases, Math for IT, UI/UX for IT, Career Skills. Open a topic page or filter on Courses.",
    teach:
      "Teach page: create teacher profile, put that course on your student desk first, email campus.steward@lmsacademy.org for permission. When approved, use Instructor hub. Teaching here is free.",
    instructor:
      "Instructor hub (after steward approval): manage teaching courses, materials, and your instructor profile. Reach it from Teach flow once permission is granted.",
    study:
      "Study Hub (study.html): short original units, practice, quizzes, and mastery challenges (e.g. foundations, Python-style drills). Open from header or dashboard. Progress/mastery can save per unit.",
    paths:
      "Career Paths (paths.html) are longer tracks, e.g. Front-End Developer, Back-End, Full-Stack, Data Analyst, AI/ML Engineer, Cloud Engineer, Cybersecurity Analyst, Mobile App Developer. Each lists months, level range, skills, and linked courses.",
    certs:
      "Certifications page: project-based certificates (e.g. Responsive Web Design, JS Algorithms, Front-End Libraries, Data Viz, Back End & APIs, Python, Data Science, ML, Cloud, Cybersecurity). Real projects = proof — not just watching videos.",
    dashboard:
      "Dashboard = My learning: continue seated courses, jump to Study Hub, and see learning progress. Teaching block is not shown on the student dashboard; teachers use Instructor hub.",
    profile:
      "Profile = account settings (Udemy-style): name, photo/avatar, language, My learning (desk courses — remove to free a seat), and account info. Open via your name chip in the header.",
    home:
      "Home shows LMS Academy branding and learning entry points. When logged in, marketing sections hide (.home-marketing) so the page focuses on your learning. Guests see catalog/paths CTAs.",
    free:
      "LMS Academy is free for learners and teachers on this site — no course prices or payment checkout. Some catalog labels say Included/Free; nothing to buy here.",
    language:
      "Explore (or globe) in the header switches site UI: English, Urdu, Hindi, Chinese, Arabic, Japanese (RTL for Urdu/Arabic). This Campus Bot answers in the language of your question (many languages).",
    logout:
      "Click Log out in the header, confirm the dialog, then you return home and the session clears.",
    contact:
      "Teacher permission / campus steward: campus.steward@lmsacademy.org. For how-to on this site, ask Campus Bot: login, desk, courses, paths, Study Hub, certificates, profile, language.",
    search:
      "Use the header search to find courses by keywords. Or open Courses and filter by level/category. You can also type a skill here (Python, SQL, React…) and I will match catalog courses.",
    done:
      "After you Select for desk, a bottom Done bar appears. Done opens that course (start learning). You can also open the course from Dashboard or Profile → My learning.",
    fallback:
      "I answer LMS Academy site questions: about, pages, login/join, password, courses, categories, desk (max 2), Study Hub, Paths, certificates, teach/instructor hub, dashboard, profile, language, logout. Ask a course name for live catalog info."
  };

  const LOCAL = {
    "ur-roman": {
      about:
        "LMS Academy (Learn. Master. Build.) free IT campus hai. Courses catalog, Study Hub, career Paths, project Certificates — ek jagah. Sirf IT: web, programming, data, AI, cloud, security, mobile, CS, SQL, math. Beginner se Expert.",
      pages:
        "Pages: Home, About, Courses, Course detail, Topic, Paths, Certifications, Study Hub, Teach, Instructor hub, Dashboard (My learning), Profile, Login, Join free. Header mein Explore (languages), Paths, Study Hub, search, account.",
      login:
        "login.html: Join wala email + password. Login ke baad My learning, profile chip, Log out. Pehle account chahiye to Join free.",
      register:
        "Join free: name, poora email (name@domain.com), strong password. Baad mein Courses / Profile / Dashboard kholo.",
      password:
        "Password: 8+ letters, choti + bari letter, number, symbol (!@#). Bhool gaye? Login → Forgot password: email, 6-digit code, phir naya password banao.",
      learn:
        "Courses → level/category → Select for desk (max 2) → Done se course → lectures complete → Study Hub practice. Dashboard = Continue.",
      desk:
        "Desk pe max 2 courses. Full ho to Profile → My learning se ek hatao. Select ke baad neeche Done bar aati hai.",
      course:
        "Courses page free catalog: Beginner, Intermediate, Advanced, Expert. Course pe lectures (Preview), Requirements, Description, instructor. Course naam poochho (Python, React…) — live detail dunga.",
      categories:
        "Categories: Computer Basics, Web, Programming, Data Science, AI/ML, Cloud & DevOps, Cybersecurity, Mobile, CS, Databases, Math for IT, UI/UX, Career Skills.",
      teach:
        "Teach: teacher profile → pehle desk pe course → campus.steward@lmsacademy.org → approve ke baad Instructor hub. Teaching free.",
      instructor:
        "Instructor hub (permission ke baad): apne teaching courses manage. Teach flow se milta hai.",
      study:
        "Study Hub: short units, practice, quiz, mastery. Header ya dashboard se. Progress save ho sakti hai.",
      paths:
        "Paths: Front-End, Back-End, Full-Stack, Data Analyst, AI/ML, Cloud, Cybersecurity, Mobile — months, skills, linked courses paths.html pe.",
      certs:
        "Certificates project-based (Web, JS, Python, Data, ML, Cloud, Security…). Video dekhne se nahi — projects se proof.",
      dashboard:
        "Dashboard = My learning: continue courses + Study Hub. Student dashboard pe Teaching nahi; teachers Instructor hub use karte hain.",
      profile:
        "Profile = settings: name, photo, language, My learning (desk se course hatao), account. Header chip se kholo.",
      home:
        "Home branding + learning links. Login ke baad marketing hide; focus learning pe.",
      free:
        "Yahan seekhna aur padhana free — payment/checkout nahi.",
      language:
        "Explore/globe se site language: en, ur, hi, zh, ar, ja. Bot jawab usi language mein deta hai jis mein sawal ho.",
      logout:
        "Log out → confirm → home, session clear.",
      contact:
        "Steward: campus.steward@lmsacademy.org. Site help is bot se poochho.",
      search:
        "Header search ya Courses filters. Yahan bhi skill likho (Python, SQL…) — catalog match karunga.",
      done:
        "Select ke baad Done bar → Done se course open. Dashboard/Profile se bhi.",
      fallback:
        "LMS Academy sawal: about, pages, login/join, password, courses, categories, desk, Study Hub, Paths, certs, teach, dashboard, profile, language. Course naam bhi poochho."
    },
    ur: {
      about: "LMS Academy مفت آئی ٹی کیمپس ہے — کورسز، اسٹڈی ہب، پاتھس، سرٹیفکیٹ۔",
      pages: "صفحات: Home، About، Courses، Paths، Certifications، Study Hub، Teach، Dashboard، Profile، Login، Join۔",
      login: "لاگ اِن: جوائن والا ای میل اور پاس ورڈ۔",
      register: "جوائن فری: نام، مکمل ای میل، مضبوط پاس ورڈ۔",
      password: "پاس ورڈ: ۸+، چھوٹی/بڑی حرف، نمبر، علامت۔",
      learn: "کورسز → لیول → ڈیسک (زیادہ سے زیادہ ۲) → Done → لیکچرز → Study Hub۔",
      desk: "ڈیسک پر زیادہ سے زیادہ دو کورس۔ بھرا ہو تو پروفائل سے ایک ہٹائیں۔",
      course: "مفت کیٹلاگ Beginner تا Expert۔ کورس کا نام پوچھیں تفصیل کے لیے۔",
      categories: "زمرے: Basics، Web، Programming، Data، AI، Cloud، Security، Mobile، CS، DB، Math، UI/UX، Career۔",
      teach: "Teach → پروفائل → ڈیسک → steward میل → Instructor hub۔",
      instructor: "اجازت کے بعد Instructor hub۔",
      study: "اسٹڈی ہب: مختصر یونٹس اور مشق۔",
      paths: "کیریئر پاتھس: Front-End، Back-End، Full-Stack، Data، AI/ML، Cloud، Security، Mobile۔",
      certs: "سرٹیفکیٹ پروجیکٹ پر مبنی ہیں۔",
      dashboard: "ڈیش بورڈ = My learning۔",
      profile: "پروفائل میں اکاؤنٹ سیٹنگز اور My learning۔",
      home: "ہوم پر برانڈنگ؛ لاگ اِن کے بعد مارکیٹنگ چھپتی ہے۔",
      free: "یہاں سیکھنا/پڑھانا مفت ہے۔",
      language: "Explore سے زبان بدلیں؛ بوٹ سوال کی زبان میں جواب دیتا ہے۔",
      logout: "Log out دبائیں اور تصدیق کریں۔",
      contact: "campus.steward@lmsacademy.org",
      search: "ہیڈر سرچ یا Courses فلٹر؛ یہاں بھی کورس نام لکھیں۔",
      done: "Select کے بعد Done بار سے کورس کھولیں۔",
      fallback: "صرف LMS Academy کے سوالات پوچھیں۔"
    },
    hi: {
      about: "LMS Academy मुफ़्त IT कैंपस है — कोर्स, Study Hub, पाथ, सर्टिफिकेट।",
      pages: "पेज: Home, About, Courses, Paths, Certs, Study Hub, Teach, Dashboard, Profile, Login, Join।",
      login: "लॉग इन: Join वाला ईमेल और पासवर्ड।",
      register: "Join free: नाम, पूरा ईमेल, मज़बूत पासवर्ड।",
      password: "पासवर्ड: 8+, छोटे/बड़े अक्षर, संख्या, सिंबल।",
      learn: "कोर्स → स्तर → डेस्क (अधिकतम 2) → Done → लेक्चर → Study Hub।",
      desk: "डेस्क पर अधिकतम 2 कोर्स। भरा हो तो Profile से हटाएँ।",
      course: "मुफ़्त कैटलॉग Beginner से Expert। कोर्स नाम पूछें।",
      categories: "श्रेणियाँ: Basics, Web, Programming, Data, AI, Cloud, Security, Mobile, CS, DB, Math, UI/UX, Career।",
      teach: "Teach → प्रोफ़ाइल → डेस्क → steward ईमेल → Instructor hub।",
      instructor: "अनुमति के बाद Instructor hub।",
      study: "Study Hub में छोटे यूनिट और अभ्यास।",
      paths: "करियर पाथ: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile।",
      certs: "सर्टिफिकेट प्रोजेक्ट आधारित।",
      dashboard: "Dashboard = My learning।",
      profile: "Profile में सेटिंग्स और My learning।",
      home: "होम ब्रांडिंग; लॉगिन के बाद मार्केटिंग छिपती है।",
      free: "यहाँ सीखना/पढ़ाना मुफ़्त।",
      language: "Explore से भाषा बदलें; बॉट सवाल की भाषा में जवाब देता है।",
      logout: "Log out दबाएँ और पुष्टि करें।",
      contact: "campus.steward@lmsacademy.org",
      search: "हेडर सर्च या Courses फ़िल्टर; यहाँ भी कोर्स नाम लिखें।",
      done: "Select के बाद Done बार से कोर्स खोलें।",
      fallback: "केवल LMS Academy के सवाल पूछें।"
    },
    zh: {
      about: "LMS Academy 是免费 IT 校园：课程、Study Hub、职业路径与证书。",
      pages: "页面：首页、About、课程、路径、证书、Study Hub、教学、仪表板、资料、登录、注册。",
      login: "用注册邮箱与密码登录。",
      register: "加入：姓名、完整邮箱、强密码。",
      password: "密码需 8+、大小写、数字、符号。",
      learn: "选课→级别→书桌最多2门→Done→讲座→Study Hub。",
      desk: "书桌最多两门课；满了请先在资料页移除一门。",
      course: "免费目录：初级到专家。可询问具体课程名。",
      categories: "分类含基础、Web、编程、数据、AI、云、安全、移动、CS、数据库、数学、UI/UX、职业。",
      teach: "Teach→资料→书桌→给 steward 发邮件→Instructor hub。",
      instructor: "获批后使用 Instructor hub。",
      study: "Study Hub：短单元与练习。",
      paths: "职业路径含前端、后端、全栈、数据、AI/ML、云、安全、移动。",
      certs: "证书基于项目。",
      dashboard: "仪表板=My learning。",
      profile: "资料页可改账户与书桌课程。",
      home: "首页品牌；登录后隐藏营销区。",
      free: "此处学习与授课免费。",
      language: "用 Explore 切换界面语言；机器人用提问语言回答。",
      logout: "点击 Log out 并确认。",
      contact: "campus.steward@lmsacademy.org",
      search: "用页眉搜索或课程筛选；也可在此输入课程名。",
      done: "选课后用底部 Done 打开课程。",
      fallback: "只回答 LMS Academy 相关问题。"
    },
    ar: {
      about: "LMS Academy حرم مجاني لتقنية المعلومات: دورات وStudy Hub ومسارات وشهادات.",
      pages: "الصفحات: الرئيسية، About، الدورات، المسارات، الشهادات، Study Hub، التدريس، لوحة التعلم، الملف، الدخول، الانضمام.",
      login: "سجّل الدخول بالبريد وكلمة المرور من الانضمام.",
      register: "انضم بالاسم وبريد كامل وكلمة مرور قوية.",
      password: "كلمة المرور: 8+ وحروف كبيرة وصغيرة ورقم ورمز.",
      learn: "اختر دورة ومستوى، حتى دورتين على المكتب، ثم Done والمحاضرات وStudy Hub.",
      desk: "المكتب يتسع لدورتين فقط.",
      course: "كتالوج مجاني من مبتدئ إلى خبير. اسأل باسم الدورة.",
      categories: "التصنيفات: أساسيات، ويب، برمجة، بيانات، ذكاء اصطناعي، سحابة، أمن، جوال، علوم حاسوب، قواعد بيانات، رياضيات، واجهات، مهنة.",
      teach: "Teach ثم الملف ثم المكتب ثم بريد المشرف ثم Instructor hub.",
      instructor: "بعد الإذن استخدم Instructor hub.",
      study: "Study Hub وحدات قصيرة وتدريب.",
      paths: "مسارات مهنية: واجهات، خوادم، كامل، بيانات، ذكاء، سحابة، أمن، جوال.",
      certs: "الشهادات بالمشاريع.",
      dashboard: "لوحة التعلم = My learning.",
      profile: "الملف لإعدادات الحساب ومقررات المكتب.",
      home: "الصفحة الرئيسية للعلامة؛ بعد الدخول تُخفى التسويق.",
      free: "التعلم والتدريس مجانيان هنا.",
      language: "غيّر اللغة من Explore؛ البوت يجيب بلغة سؤالك.",
      logout: "انقر Log out وأكّد.",
      contact: "campus.steward@lmsacademy.org",
      search: "ابحث من الشريط أو اكتب اسم الدورة هنا.",
      done: "بعد الاختيار استخدم Done لفتح الدورة.",
      fallback: "أجب فقط عن أسئلة LMS Academy."
    },
    ja: {
      about: "LMS Academyは無料のITキャンパスです。コース、Study Hub、パス、証明書。",
      pages: "ページ: ホーム、About、コース、パス、証明書、Study Hub、Teach、ダッシュボード、プロフィール、ログイン、登録。",
      login: "登録したメールとパスワードでログイン。",
      register: "参加: 名前、完全なメール、強いパスワード。",
      password: "パスワードは8文字以上、大小英字、数字、記号。",
      learn: "コース→レベル→机に最大2→Done→講義→Study Hub。",
      desk: "机は最大2コース。満杯ならプロフィールで1つ外す。",
      course: "初級〜専門家の無料カタログ。コース名を聞いてください。",
      categories: "カテゴリ: 基礎、Web、プログラミング、データ、AI、クラウド、セキュリティ、モバイル、CS、DB、数学、UI/UX、キャリア。",
      teach: "Teach→プロフィール→机→stewardメール→Instructor hub。",
      instructor: "許可後に Instructor hub。",
      study: "Study Hubは短い単元と練習。",
      paths: "キャリアパス: Front-End、Back-End、Full-Stack、Data、AI/ML、Cloud、Security、Mobile。",
      certs: "証明書はプロジェクト型。",
      dashboard: "ダッシュボード=My learning。",
      profile: "プロフィールで設定と机のコース。",
      home: "ホームはブランド；ログイン後はマーケ非表示。",
      free: "学習も教えることも無料。",
      language: "ExploreでUI言語変更。Botは質問の言語で回答。",
      logout: "Log outして確認。",
      contact: "campus.steward@lmsacademy.org",
      search: "ヘッダー検索か、ここでコース名を入力。",
      done: "選択後、Doneでコースを開く。",
      fallback: "LMS Academyの質問にだけ答えます。"
    },
    fr: {
      about: "LMS Academy est un campus IT gratuit : cours, Study Hub, parcours et certificats.",
      pages: "Pages : Accueil, About, Cours, Paths, Certificats, Study Hub, Teach, Tableau de bord, Profil, Connexion, Inscription.",
      login: "Connectez-vous avec l’e-mail et le mot de passe d’inscription.",
      register: "Rejoignez avec nom, e-mail complet et mot de passe fort.",
      password: "Mot de passe : 8+, majuscule, minuscule, chiffre, symbole.",
      learn: "Cours → niveau → bureau max 2 → Done → leçons → Study Hub.",
      desk: "Le bureau accepte 2 cours max.",
      course: "Catalogue gratuit débutant → expert. Demandez un nom de cours.",
      categories: "Catégories : bases, web, programmation, data, IA, cloud, sécu, mobile, CS, BDD, maths, UI/UX, carrière.",
      teach: "Teach → profil → bureau → e-mail steward → Instructor hub.",
      instructor: "Après permission : Instructor hub.",
      study: "Study Hub : courtes unités et pratique.",
      paths: "Parcours carrière : Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Sécu, Mobile.",
      certs: "Certificats basés sur des projets.",
      dashboard: "Tableau de bord = My learning.",
      profile: "Profil : réglages et cours du bureau.",
      home: "Accueil marque ; marketing masqué après connexion.",
      free: "Apprendre et enseigner sont gratuits ici.",
      language: "Explore change l’UI ; le bot répond dans la langue de la question.",
      logout: "Log out puis confirmer.",
      contact: "campus.steward@lmsacademy.org",
      search: "Recherche d’en-tête ou tapez un cours ici.",
      done: "Après sélection, Done ouvre le cours.",
      fallback: "Je réponds seulement aux questions LMS Academy."
    },
    es: {
      about: "LMS Academy es un campus IT gratuito: cursos, Study Hub, rutas y certificados.",
      pages: "Páginas: Inicio, About, Cursos, Paths, Certificados, Study Hub, Teach, Panel, Perfil, Login, Registro.",
      login: "Inicia sesión con el correo y contraseña del registro.",
      register: "Únete con nombre, correo completo y contraseña fuerte.",
      password: "Contraseña: 8+, mayúscula, minúscula, número y símbolo.",
      learn: "Cursos → nivel → escritorio máx. 2 → Done → clases → Study Hub.",
      desk: "El escritorio admite máximo 2 cursos.",
      course: "Catálogo gratis de principiante a experto. Pregunta por un curso.",
      categories: "Categorías: básicos, web, programación, datos, IA, nube, seguridad, móvil, CS, BD, mates, UI/UX, carrera.",
      teach: "Teach → perfil → escritorio → email al steward → Instructor hub.",
      instructor: "Tras permiso: Instructor hub.",
      study: "Study Hub: unidades cortas y práctica.",
      paths: "Rutas: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Seguridad, Móvil.",
      certs: "Certificados por proyectos.",
      dashboard: "Panel = My learning.",
      profile: "Perfil: ajustes y cursos del escritorio.",
      home: "Inicio de marca; marketing oculto al iniciar sesión.",
      free: "Aprender y enseñar es gratis aquí.",
      language: "Explore cambia el idioma; el bot responde en el idioma de la pregunta.",
      logout: "Pulsa Log out y confirma.",
      contact: "campus.steward@lmsacademy.org",
      search: "Busca en el encabezado o escribe un curso aquí.",
      done: "Tras seleccionar, Done abre el curso.",
      fallback: "Solo respondo preguntas de LMS Academy."
    },
    de: {
      about: "LMS Academy ist ein kostenloser IT-Campus: Kurse, Study Hub, Pfade, Zertifikate.",
      pages: "Seiten: Home, About, Kurse, Paths, Zertifikate, Study Hub, Teach, Dashboard, Profil, Login, Registrierung.",
      login: "Login mit Registrierungs-E-Mail und Passwort.",
      register: "Beitreten: Name, vollständige E-Mail, starkes Passwort.",
      password: "Passwort: 8+, Groß-/Kleinbuchstabe, Zahl, Symbol.",
      learn: "Kurse → Level → Schreibtisch max. 2 → Done → Lektionen → Study Hub.",
      desk: "Schreibtisch hält max. 2 Kurse.",
      course: "Kostenloser Katalog Anfänger–Experte. Kursnamen fragen.",
      categories: "Kategorien: Basics, Web, Programmierung, Data, KI, Cloud, Security, Mobile, CS, DB, Mathe, UI/UX, Karriere.",
      teach: "Teach → Profil → Schreibtisch → Steward-Mail → Instructor hub.",
      instructor: "Nach Erlaubnis: Instructor hub.",
      study: "Study Hub: kurze Einheiten und Übung.",
      paths: "Karrierepfade: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "Zertifikate projektbasiert.",
      dashboard: "Dashboard = My learning.",
      profile: "Profil: Einstellungen und Schreibtisch-Kurse.",
      home: "Home mit Marke; Marketing nach Login ausgeblendet.",
      free: "Lernen und Unterrichten hier kostenlos.",
      language: "Explore ändert die UI; Bot antwortet in der Fragesprache.",
      logout: "Log out klicken und bestätigen.",
      contact: "campus.steward@lmsacademy.org",
      search: "Kopfzeilen-Suche oder Kursname hier eingeben.",
      done: "Nach Auswahl öffnet Done den Kurs.",
      fallback: "Ich beantworte nur LMS-Academy-Fragen."
    },
    pt: {
      about: "LMS Academy é um campus de TI gratuito: cursos, Study Hub, trilhas e certificados.",
      pages: "Páginas: Início, About, Cursos, Paths, Certificados, Study Hub, Teach, Painel, Perfil, Login, Cadastro.",
      login: "Entre com e-mail e senha do cadastro.",
      register: "Cadastre-se com nome, e-mail completo e senha forte.",
      password: "Senha: 8+, maiúscula, minúscula, número e símbolo.",
      learn: "Cursos → nível → mesa máx. 2 → Done → aulas → Study Hub.",
      desk: "A mesa aceita no máximo 2 cursos.",
      course: "Catálogo grátis do iniciante ao especialista.",
      categories: "Categorias: básicos, web, programação, dados, IA, nuvem, segurança, mobile, CS, BD, matemática, UI/UX, carreira.",
      teach: "Teach → perfil → mesa → e-mail ao steward → Instructor hub.",
      instructor: "Após permissão: Instructor hub.",
      study: "Study Hub: unidades curtas e prática.",
      paths: "Trilhas: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Segurança, Mobile.",
      certs: "Certificados por projetos.",
      dashboard: "Painel = My learning.",
      profile: "Perfil: configurações e cursos da mesa.",
      home: "Início da marca; marketing some após login.",
      free: "Aprender e ensinar é grátis aqui.",
      language: "Explore muda o idioma; o bot responde na língua da pergunta.",
      logout: "Clique em Log out e confirme.",
      contact: "campus.steward@lmsacademy.org",
      search: "Pesquise no topo ou digite um curso aqui.",
      done: "Após selecionar, Done abre o curso.",
      fallback: "Só respondo perguntas da LMS Academy."
    },
    ru: {
      about: "LMS Academy — бесплатный IT-кампус: курсы, Study Hub, пути и сертификаты.",
      pages: "Страницы: главная, About, курсы, пути, сертификаты, Study Hub, Teach, кабинет, профиль, вход, регистрация.",
      login: "Вход с email и паролем регистрации.",
      register: "Регистрация: имя, полный email, сильный пароль.",
      password: "Пароль: 8+, верхний/нижний регистр, цифра, символ.",
      learn: "Курсы → уровень → стол макс. 2 → Done → лекции → Study Hub.",
      desk: "На столе максимум 2 курса.",
      course: "Бесплатный каталог от новичка до эксперта.",
      categories: "Категории: основы, web, программирование, данные, ИИ, облако, безопасность, mobile, CS, БД, математика, UI/UX, карьера.",
      teach: "Teach → профиль → стол → письмо steward → Instructor hub.",
      instructor: "После разрешения: Instructor hub.",
      study: "Study Hub: короткие юниты и практика.",
      paths: "Пути: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "Сертификаты за проекты.",
      dashboard: "Кабинет = My learning.",
      profile: "Профиль: настройки и курсы на столе.",
      home: "Главная с брендом; маркетинг скрыт после входа.",
      free: "Обучение и преподавание бесплатны.",
      language: "Explore меняет язык UI; бот отвечает на языке вопроса.",
      logout: "Нажмите Log out и подтвердите.",
      contact: "campus.steward@lmsacademy.org",
      search: "Поиск в шапке или название курса здесь.",
      done: "После выбора Done открывает курс.",
      fallback: "Отвечаю только по LMS Academy."
    },
    ko: {
      about: "LMS Academy는 무료 IT 캠퍼스입니다. 코스, Study Hub, 경로, 수료증.",
      pages: "페이지: 홈, About, 코스, Paths, 수료증, Study Hub, Teach, 대시보드, 프로필, 로그인, 가입.",
      login: "가입 이메일과 비밀번호로 로그인.",
      register: "가입: 이름, 완전한 이메일, 강한 비밀번호.",
      password: "비밀번호: 8+, 대소문자, 숫자, 기호.",
      learn: "코스→레벨→책상 최대 2→Done→강의→Study Hub.",
      desk: "책상은 최대 2개 코스.",
      course: "초급~전문가 무료 카탈로그. 코스 이름을 물어보세요.",
      categories: "카테고리: 기초, 웹, 프로그래밍, 데이터, AI, 클라우드, 보안, 모바일, CS, DB, 수학, UI/UX, 커리어.",
      teach: "Teach→프로필→책상→steward 메일→Instructor hub.",
      instructor: "허가 후 Instructor hub.",
      study: "Study Hub: 짧은 유닛과 연습.",
      paths: "경로: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "수료증은 프로젝트 기반.",
      dashboard: "대시보드=My learning.",
      profile: "프로필에서 설정과 책상 코스.",
      home: "홈 브랜드; 로그인 후 마케팅 숨김.",
      free: "학습과 강의가 무료.",
      language: "Explore로 UI 언어 변경. 봇은 질문 언어로 답함.",
      logout: "Log out 후 확인.",
      contact: "campus.steward@lmsacademy.org",
      search: "헤더 검색 또는 여기에 코스명 입력.",
      done: "선택 후 Done으로 코스 열기.",
      fallback: "LMS Academy 관련 질문에만 답합니다."
    },
    tr: {
      about: "LMS Academy ücretsiz IT kampüsüdür: kurslar, Study Hub, yollar, sertifikalar.",
      pages: "Sayfalar: Ana sayfa, About, Kurslar, Paths, Sertifikalar, Study Hub, Teach, Panel, Profil, Giriş, Kayıt.",
      login: "Kayıt e-posta ve şifre ile giriş.",
      register: "Katıl: ad, tam e-posta, güçlü şifre.",
      password: "Şifre: 8+, büyük/küçük harf, sayı, sembol.",
      learn: "Kurs→seviye→masa en fazla 2→Done→dersler→Study Hub.",
      desk: "Masada en fazla 2 kurs.",
      course: "Ücretsiz katalog: başlangıçtan uzmana.",
      categories: "Kategoriler: temel, web, programlama, veri, AI, bulut, güvenlik, mobil, CS, DB, matematik, UI/UX, kariyer.",
      teach: "Teach→profil→masa→steward e-posta→Instructor hub.",
      instructor: "İzinden sonra Instructor hub.",
      study: "Study Hub: kısa üniteler ve pratik.",
      paths: "Yollar: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "Sertifikalar proje tabanlı.",
      dashboard: "Panel = My learning.",
      profile: "Profil: ayarlar ve masa kursları.",
      home: "Ana sayfa marka; girişten sonra pazarlama gizlenir.",
      free: "Öğrenmek ve öğretmek ücretsiz.",
      language: "Explore dil değiştirir; bot soru dilinde yanıtlar.",
      logout: "Log out’a tıklayıp onaylayın.",
      contact: "campus.steward@lmsacademy.org",
      search: "Üst arama veya buraya kurs adı yazın.",
      done: "Seçimden sonra Done kursu açar.",
      fallback: "Yalnızca LMS Academy sorularını yanıtlarım."
    },
    id: {
      about: "LMS Academy kampus IT gratis: kursus, Study Hub, jalur, sertifikat.",
      pages: "Halaman: Beranda, About, Kursus, Paths, Sertifikat, Study Hub, Teach, Dasbor, Profil, Login, Daftar.",
      login: "Masuk dengan email dan password pendaftaran.",
      register: "Daftar: nama, email lengkap, password kuat.",
      password: "Password: 8+, huruf besar/kecil, angka, simbol.",
      learn: "Kursus→level→meja maks 2→Done→kuliah→Study Hub.",
      desk: "Meja maksimal 2 kursus.",
      course: "Katalog gratis pemula hingga ahli.",
      categories: "Kategori: dasar, web, pemrograman, data, AI, cloud, keamanan, mobile, CS, DB, matematika, UI/UX, karier.",
      teach: "Teach→profil→meja→email steward→Instructor hub.",
      instructor: "Setelah izin: Instructor hub.",
      study: "Study Hub: unit singkat dan latihan.",
      paths: "Jalur: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "Sertifikat berbasis proyek.",
      dashboard: "Dasbor = My learning.",
      profile: "Profil: pengaturan dan kursus meja.",
      home: "Beranda merek; marketing disembunyikan setelah login.",
      free: "Belajar dan mengajar gratis di sini.",
      language: "Explore ubah bahasa UI; bot jawab dalam bahasa pertanyaan.",
      logout: "Klik Log out lalu konfirmasi.",
      contact: "campus.steward@lmsacademy.org",
      search: "Cari di header atau tulis nama kursus di sini.",
      done: "Setelah pilih, Done membuka kursus.",
      fallback: "Saya hanya menjawab pertanyaan LMS Academy."
    },
    bn: {
      about: "LMS Academy বিনামূল্যে IT ক্যাম্পাস — কোর্স, Study Hub, পাথ, সার্টিফিকেট।",
      pages: "পেজ: হোম, About, কোর্স, Paths, সার্টিফিকেট, Study Hub, Teach, ড্যাশবোর্ড, প্রোফাইল, লগইন, জয়েন।",
      login: "জয়েন ইমেইল ও পাসওয়ার্ড দিয়ে লগ ইন।",
      register: "জয়েন: নাম, সম্পূর্ণ ইমেইল, শক্তিশালী পাসওয়ার্ড।",
      password: "পাসওয়ার্ড: ৮+, বড়/ছোট হাতের অক্ষর, সংখ্যা, প্রতীক।",
      learn: "কোর্স→লেভেল→ডেস্ক সর্বোচ্চ ২→Done→লেকচার→Study Hub।",
      desk: "ডেস্কে সর্বোচ্চ ২ কোর্স।",
      course: "বিনামূল্যে ক্যাটালগ বিগিনার থেকে এক্সপার্ট।",
      categories: "ক্যাটাগরি: বেসিকস, ওয়েব, প্রোগ্রামিং, ডেটা, AI, ক্লাউড, সিকিউরিটি, মোবাইল, CS, DB, গণিত, UI/UX, ক্যারিয়ার।",
      teach: "Teach→প্রোফাইল→ডেস্ক→steward ইমেইল→Instructor hub।",
      instructor: "অনুমতির পর Instructor hub।",
      study: "Study Hub: ছোট ইউনিট ও অনুশীলন।",
      paths: "পাথ: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile।",
      certs: "সার্টিফিকেট প্রজেক্টভিত্তিক।",
      dashboard: "ড্যাশবোর্ড = My learning।",
      profile: "প্রোফাইলে সেটিংস ও ডেস্ক কোর্স।",
      home: "হোম ব্র্যান্ড; লগইনের পর মার্কেটিং লুকানো।",
      free: "শেখা ও পড়ানো এখানে বিনামূল্যে।",
      language: "Explore দিয়ে ভাষা বদলান; বট প্রশ্নের ভাষায় উত্তর দেয়।",
      logout: "Log out চাপুন এবং নিশ্চিত করুন।",
      contact: "campus.steward@lmsacademy.org",
      search: "হেডার সার্চ বা এখানে কোর্সের নাম লিখুন।",
      done: "সিলেক্টের পর Done দিয়ে কোর্স খুলুন।",
      fallback: "শুধু LMS Academy প্রশ্নের উত্তর দিই।"
    },
    it: {
      about: "LMS Academy è un campus IT gratuito: corsi, Study Hub, percorsi e certificati.",
      pages: "Pagine: Home, About, Corsi, Paths, Certificati, Study Hub, Teach, Dashboard, Profilo, Login, Registrazione.",
      login: "Accedi con email e password di registrazione.",
      register: "Unisciti con nome, email completa e password forte.",
      password: "Password: 8+, maiuscola, minuscola, numero, simbolo.",
      learn: "Corsi → livello → scrivania max 2 → Done → lezioni → Study Hub.",
      desk: "La scrivania tiene al massimo 2 corsi.",
      course: "Catalogo gratis da principiante a esperto.",
      categories: "Categorie: basi, web, programmazione, dati, AI, cloud, sicurezza, mobile, CS, DB, matematica, UI/UX, carriera.",
      teach: "Teach → profilo → scrivania → email allo steward → Instructor hub.",
      instructor: "Dopo il permesso: Instructor hub.",
      study: "Study Hub: unità brevi e pratica.",
      paths: "Percorsi: Front-End, Back-End, Full-Stack, Data, AI/ML, Cloud, Security, Mobile.",
      certs: "Certificati basati su progetti.",
      dashboard: "Dashboard = My learning.",
      profile: "Profilo: impostazioni e corsi sulla scrivania.",
      home: "Home del brand; marketing nascosto dopo il login.",
      free: "Imparare e insegnare qui è gratis.",
      language: "Explore cambia la lingua UI; il bot risponde nella lingua della domanda.",
      logout: "Clicca Log out e conferma.",
      contact: "campus.steward@lmsacademy.org",
      search: "Cerca nell’header o scrivi un corso qui.",
      done: "Dopo la selezione, Done apre il corso.",
      fallback: "Rispondo solo a domande su LMS Academy."
    }
  };

  function packFor(lang) {
    const local = LOCAL[lang];
    if (!local) return EN;
    const out = {};
    Object.keys(EN).forEach((k) => {
      out[k] = local[k] || EN[k];
    });
    return out;
  }

  function countHits(text, words) {
    let n = 0;
    words.forEach((w) => {
      if (text.includes(w)) n += 1;
    });
    return n;
  }

  function detectReplyLang(text) {
    const raw = String(text || "").trim();
    if (!raw) return "en";

    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(raw)) return "ja";
    if (/[\uac00-\ud7af]/.test(raw)) return "ko";
    if (/[\u4e00-\u9fff]/.test(raw)) return "zh";
    if (/[\u0900-\u097F]/.test(raw)) return "hi";
    if (/[\u0980-\u09FF]/.test(raw)) return "bn";
    if (/[\u0400-\u04FF]/.test(raw)) return "ru";
    if (/[\u0600-\u06FF]/.test(raw)) {
      if (/[\u0679\u067E\u0686\u0688\u0691\u06A9\u06AF\u06BA\u06BE\u06C1\u06D2\u06CC]/.test(raw)) return "ur";
      if (/(ہے|کیا|کیسے|کورس|لاگ|سائٹ|پڑھ|سیکھ)/.test(raw)) return "ur";
      return "ar";
    }

    const low = raw.toLowerCase();
    const scores = {
      "ur-roman": countHits(low, [
        "kya", "kaise", "hai", "ho", "mujhe", "mera", "meri", "batao", "bata", "chahiye", "karna", "karo",
        "seekh", "parho", "padhao", "padhna", "ka", "ki", "ke", "se", "mein", "main", "yeh", "woh", "urdu",
        "kitne", "samjhao", "detail", "details", "kyun", "kahan", "kon", "kaun", "nahi", "haan", "acha",
        "please", "plz", "zarurat", "chahiye", "bata dein", "bataye"
      ]) + (/\b(kya|kaise|hai|batao|chahiye|karo|mein|mujhe|kitne|samjhao|kyun|kahan)\b/.test(low) ? 3 : 0),
      fr: countHits(low, ["bonjour", "merci", "comment", "cours", "connexion", "quoi", "est", "pour", "avec", "je", "vous", "aide", "apprendre", "gratuit"]),
      es: countHits(low, ["hola", "gracias", "cómo", "como", "curso", "iniciar", "qué", "que", "para", "con", "sesión", "ayuda", "aprender", "gratis"]),
      de: countHits(low, ["hallo", "danke", "wie", "kurs", "anmelden", "was", "ist", "für", "mit", "ich", "hilfe", "lernen", "kostenlos"]),
      pt: countHits(low, ["olá", "ola", "obrigado", "como", "curso", "entrar", "o que", "para", "com", "ajuda", "aprender", "gratis"]),
      it: countHits(low, ["ciao", "grazie", "come", "corso", "accedi", "che", "cosa", "per", "con", "aiuto", "imparare", "gratuito"]),
      tr: countHits(low, ["merhaba", "nasıl", "nasil", "kurs", "giriş", "giris", "nedir", "için", "icin", "yardım", "öğrenmek", "ücretsiz"]),
      id: countHits(low, ["apa", "bagaimana", "kursus", "masuk", "saya", "untuk", "dengan", "cara", "bantuan", "belajar", "gratis"]),
      en: countHits(low, [
        "what", "how", "the", "is", "are", "can", "do", "does", "login", "course", "teach",
        "study", "certificate", "language", "about", "help", "please", "this", "site", "free", "where", "many", "which", "explain"
      ])
    };

    if (/\b(kya|kaise|hai|batao|chahiye|karo|mein|mujhe|kitne|samjhao|kyun|kahan|padhao|seekhna)\b/.test(low)) {
      return "ur-roman";
    }

    let best = "en";
    let bestScore = -1;
    Object.keys(scores).forEach((lang) => {
      if (scores[lang] > bestScore) {
        bestScore = scores[lang];
        best = lang;
      }
    });
    if (bestScore <= 0) return "en";
    return best;
  }

  function pickTopic(q) {
    const text = q.toLowerCase();
    let best = null;
    let score = 0;
    TOPICS.forEach((item) => {
      let s = 0;
      item.keys.forEach((k) => {
        if (text.includes(String(k).toLowerCase())) s += k.length > 4 ? 2 : 1;
      });
      if (s > score) {
        score = s;
        best = item;
      }
    });
    return score > 0 ? best.id : null;
  }

  function say(lang, map) {
    return map[lang] || map.en || Object.values(map)[0];
  }

  function liveFromLMS(text, lang) {
    const L = window.LMS;
    if (!L || !Array.isArray(L.courses)) return null;
    const q = String(text || "").toLowerCase().trim();
    if (!q) return null;

    const courseCount = L.courses.length;
    const catNames = (L.categories || []).map((c) => c.name);
    const pathNames = (L.paths || []).map((p) => p.name);
    const certNames = (L.certs || []).map((c) => c.name);

    const levels = L.levels || ["Beginner", "Intermediate", "Advanced", "Expert"];

    const courseWord = /(course|courses|kurs|کورس|کورسز|कोर्स|curso|cursos|cours|コース|课程|دورة)/.test(q);
    const askCount =
      /(kitne|kitni|how many|عدد|几个|몇|combien|cuántos|cuantos|quanta|сколько|berapa|count)/.test(q) && courseWord;
    const askCourseList =
      courseWord &&
      /(kon\s*kon|kya\s*kya|kons[ae]|kaun\s*kaun|which|what|list|all|sare|saare|available|names?|batao|dikhao|show|mention|yahan|کون کون|کیا کیا|कौन कौन|क्या क्या|哪些|どんな)/.test(
        q
      );

    if (askCount) {
      return say(lang, {
        en: "LMS Academy has " + courseCount + " courses in the catalog, across " + catNames.length + " categories and levels: " + levels.join(", ") + ". All free here.",
        "ur-roman": "Kul " + courseCount + " courses hain (" + catNames.length + " categories). Levels: " + levels.join(", ") + ". Sab free. Naam chahiye to \"kon kon se courses\" poochho.",
        ur: "کیٹلاگ میں " + courseCount + " کورسز ہیں، " + catNames.length + " زمرے، لیولز: " + levels.join("، ") + "۔",
        hi: "कैटलॉگ में " + courseCount + " कोर्स हैं, " + catNames.length + " श्रेणियाँ, स्तर: " + levels.join(", ") + "।"
      });
    }

    if (askCourseList) {
      const byLevel = levels.map(function (lv) {
        return {
          lv: lv,
          titles: L.courses.filter(function (c) { return c.level === lv; }).map(function (c) { return c.title; })
        };
      }).filter(function (x) { return x.titles.length; });

      // "kon kon / which" → name list; "kya kya / what" → kinds + samples
      const wantNames = /(kon\s*kon|kaun\s*kaun|kons[ae]|which|list|names?|dikhao|show|sare|saare|all|کون کون|कौन कौन)/.test(q);
      const wantKinds = /(kya\s*kya|what|kis\s*qisim|kis\s*tarah|types?|kinds?|کیا کیا|क्या क्या)/.test(q);

      if (wantKinds && !wantNames) {
        const summary = byLevel
          .map(function (x) {
            return x.lv + " (" + x.titles.length + ") e.g. " + x.titles.slice(0, 2).join(", ");
          })
          .join(" | ");
        return say(lang, {
          en: "Courses come in 4 levels — " + levels.join(", ") + ". Total " + courseCount + ". " + summary + ". Ask “which courses” for more names, or a topic like Python.",
          "ur-roman": "Courses 4 levels mein hain — " + levels.join(", ") + ". Kul " + courseCount + ". " + summary + ". Zyada naam ke liye “kon kon se courses” poochho, ya Python/React likho.",
          ur: "کورسز چار لیول میں ہیں — " + levels.join("، ") + "۔ کل " + courseCount + "۔ " + summary + "۔",
          hi: "कोर्स 4 स्तरों में हैं — " + levels.join(", ") + "। कुल " + courseCount + "। " + summary + "।"
        });
      }

      const chunks = byLevel.map(function (x) {
        const show = x.titles.slice(0, 4);
        const more = x.titles.length - show.length;
        return x.lv + ": " + show.join("; ") + (more > 0 ? " …+" + more : "");
      });
      const body = chunks.join(" | ");
      return say(lang, {
        en: "Course names (" + courseCount + " total): " + body + ". Full catalog: courses.html — or ask one name (Python, React…).",
        "ur-roman": "Courses ke naam (kul " + courseCount + "): " + body + ". Poori list courses.html — ya ek naam poochho (Python, React…).",
        ur: "کورسز کے نام (کل " + courseCount + "): " + body + "۔",
        hi: "कोर्स के नाम (कुल " + courseCount + "): " + body + "।"
      });
    }

    const askCats = /(categor|topics?|subjects?|زمرہ|موضوع|विषय|カテゴリ|分类)/.test(q);
    if (askCats && (/(list|kya|what|all|sare|تمام|सभी|哪些|どれ|batao|kon)/.test(q) || q.length < 36)) {
      return say(lang, {
        en: "Categories: " + catNames.join("; ") + ". Open Courses or a topic page to browse.",
        "ur-roman": "Categories: " + catNames.join("; ") + ". Courses ya topic page se dekho.",
        ur: "زمرے: " + catNames.join("؛ ") + "۔",
        hi: "श्रेणियाँ: " + catNames.join("; ") + "।"
      });
    }

    const askPaths = /(career\s*)?paths?\b|کیریئر|करियर|مسارات|parcours|キャリアパス/.test(q);
    if (askPaths && (/(list|kya|what|all|sare|names|kitne|which|batao|kon)/.test(q) || q.length < 28)) {
      return say(lang, {
        en: "Career Paths (" + (L.paths || []).length + "): " + pathNames.join("; ") + ". Open paths.html for months, skills, and linked courses.",
        "ur-roman": "Career Paths (" + (L.paths || []).length + "): " + pathNames.join("; ") + ". Detail paths.html pe.",
        ur: "کیریئر پاتھس: " + pathNames.join("؛ ") + "۔",
        hi: "करियर पाथ: " + pathNames.join("; ") + "।"
      });
    }

    if (
      /(certificate|certification|certs?|سرٹیفکیٹ|प्रमाणपत्र)/.test(q) &&
      /(list|kya|what|all|sare|which|kitne|kon)/.test(q)
    ) {
      return say(lang, {
        en: "Certificates (" + (L.certs || []).length + "): " + certNames.join("; ") + ". They need real projects — see certifications.html.",
        "ur-roman": "Certificates (" + (L.certs || []).length + "): " + certNames.join("; ") + ". Projects chahiye — certifications.html.",
        ur: "سرٹیفکیٹس: " + certNames.join("؛ ") + "۔",
        hi: "सर्टिफिकेट: " + certNames.join("; ") + "।"
      });
    }

    // Match a specific path by name fragment
    const pathHit = (L.paths || []).find((p) => {
      const blob = `${p.name} ${p.id} ${p.role} ${(p.skills || []).join(" ")}`.toLowerCase();
      return q.split(/\s+/).filter((w) => w.length > 3).some((w) => blob.includes(w)) &&
        /(path|track|developer|engineer|analyst|کیریئر|पाथ)/.test(q);
    });
    if (pathHit) {
      return say(lang, {
        en: `${pathHit.name}: ${pathHit.role}. Level ${pathHit.level}, about ${pathHit.months} months. Skills: ${(pathHit.skills || []).join(", ")}. Open Paths page for the course list.`,
        "ur-roman": `${pathHit.name}: ${pathHit.role}. Level ${pathHit.level}, ~${pathHit.months} months. Skills: ${(pathHit.skills || []).join(", ")}. Paths page pe course list.`,
        ur: `${pathHit.name} — ${pathHit.role}. لیول ${pathHit.level}، تقریباً ${pathHit.months} مہینے۔`,
        hi: `${pathHit.name}: ${pathHit.role}. स्तर ${pathHit.level}, लगभग ${pathHit.months} महीने।`
      });
    }

    // Course match from catalog (live site data)
    const stop = new Set([
      "what", "how", "the", "is", "are", "about", "course", "courses", "kaise", "kya", "hai", "hain", "batao",
      "tell", "me", "please", "detail", "details", "info", "information", "mujhe", "mera", "meri",
      "this", "that", "with", "from", "have", "does", "can", "want", "need", "site", "lms", "academy",
      "kon", "kaun", "konsa", "konsi", "which", "list", "all", "sare", "saare", "kitne", "kitni", "se", "ke"
    ]);
    const words = q.split(/[^a-z0-9+#.\u0600-\u06ff\u0900-\u097f]+/i).filter((w) => w.length > 2 && !stop.has(w));
    if (words.length) {
      let best = null;
      let bestScore = 0;
      L.courses.forEach((c) => {
        const blob = `${c.id} ${c.title} ${c.desc || ""} ${(c.outcomes || []).join(" ")} ${c.category} ${c.level}`.toLowerCase();
        let s = 0;
        words.forEach((w) => {
          if (blob.includes(w)) s += w.length > 4 ? 3 : 2;
        });
        if (c.title.toLowerCase().split(/\s+/).some((t) => words.includes(t.toLowerCase()))) s += 4;
        if (s > bestScore) {
          bestScore = s;
          best = c;
        }
      });
      if (best && bestScore >= 3) {
        const cat = (L.categories || []).find((x) => x.id === best.category);
        return say(lang, {
          en: `${best.title} — ${best.level}${cat ? `, ${cat.name}` : ""}. ${best.hours || "?"}h · ${best.lectures || "?"} lectures · ${best.price || "Free"}. Instructor: ${best.instructor || "LMS faculty"}. ${best.desc || ""} Open: course.html?id=${best.id}`,
          "ur-roman": `${best.title} — ${best.level}${cat ? `, ${cat.name}` : ""}. ${best.hours || "?"}h · ${best.lectures || "?"} lectures · ${best.price || "Free"}. Instructor: ${best.instructor || "LMS faculty"}. ${best.desc || ""} Open: course.html?id=${best.id}`,
          ur: `${best.title} — ${best.level}۔ ${best.hours || "?"} گھنٹے، ${best.lectures || "?"} لیکچرز۔ ${best.desc || ""}`,
          hi: `${best.title} — ${best.level}. ${best.hours || "?"} घंटे, ${best.lectures || "?"} लेक्चर। ${best.desc || ""}`
        });
      }
    }

    // Level filter ask
    const levelHit = levels.find((lv) => q.includes(lv.toLowerCase()));
    if (levelHit && /(course|kurs|level|لیول|स्तर)/.test(q)) {
      const list = L.courses.filter((c) => c.level === levelHit).slice(0, 8).map((c) => c.title);
      const more = L.courses.filter((c) => c.level === levelHit).length - list.length;
      return say(lang, {
        en: `${levelHit} courses (sample): ${list.join("; ")}${more > 0 ? ` … +${more} more` : ""}. See courses.html?level=${encodeURIComponent(levelHit)}.`,
        "ur-roman": `${levelHit} courses (sample): ${list.join("; ")}${more > 0 ? ` … +${more} aur` : ""}. courses.html?level=${encodeURIComponent(levelHit)}`,
        ur: `${levelHit} کورسز: ${list.join("؛ ")}`,
        hi: `${levelHit} कोर्स: ${list.join("; ")}`
      });
    }

    return null;
  }

  function answerFor(text) {
    const lang = detectReplyLang(text);
    const live = liveFromLMS(text, lang);
    if (live) return live;
    const topic = pickTopic(text) || "fallback";
    const pack = packFor(lang);
    return pack[topic] || pack.fallback || EN.fallback;
  }

  const SEND_ICON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

  function uiForSite() {
    const site = localStorage.getItem("lms-lang") || "en";
    const map = {
      en: { title: "Campus Bot", sub: "Ask anything about this site", ph: "Ask about courses, login, paths…", hi: "Hi — ask any LMS Academy detail: login, desk (max 2), courses, categories, Study Hub, Paths, certificates, teach, profile, or a course name (Python, React…)." },
      ur: { title: "کیمپس بوٹ", sub: "سائٹ کی کوئی بھی تفصیل پوچھیں", ph: "کورس، لاگ اِن، پاتھ…", hi: "السلام علیکم — لاگ اِن، ڈیسک، کورسز، Study Hub، پاتھس یا کوئی کورس نام پوچھیں۔" },
      hi: { title: "कैंपस बॉट", sub: "साइट की कोई भी बात पूछें", ph: "कोर्स, लॉग इन, पाथ…", hi: "नमस्ते — लॉग इन, डेस्क, कोर्स, Study Hub, पाथ या कोर्स नाम पूछें।" },
      zh: { title: "校园助手", sub: "询问本站任何详情", ph: "课程、登录、路径…", hi: "你好——可问登录、书桌、课程、Study Hub、路径或具体课名。" },
      ar: { title: "بوت الحرم", sub: "اسأل عن أي تفصيل في الموقع", ph: "دورات، دخول، مسارات…", hi: "مرحباً — اسأل عن الدخول أو المكتب أو الدورات أو المسارات أو اسم دورة." },
      ja: { title: "キャンパスBot", sub: "このサイトのことなら何でも", ph: "コース、ログイン、パス…", hi: "こんにちは。ログイン、机、コース、Study Hub、パスやコース名を聞いてください。" },
      fr: { title: "Campus Bot", sub: "Tout sur ce site", ph: "Cours, login, parcours…", hi: "Bonjour — login, bureau, cours, Study Hub, parcours ou un nom de cours." },
      es: { title: "Campus Bot", sub: "Pregunta cualquier detalle", ph: "Cursos, login, rutas…", hi: "Hola — login, escritorio, cursos, Study Hub, rutas o un nombre de curso." },
      de: { title: "Campus Bot", sub: "Alles zu dieser Seite", ph: "Kurse, Login, Pfade…", hi: "Hallo — Login, Schreibtisch, Kurse, Study Hub, Pfade oder Kursname." }
    };
    return map[site] || map.en;
  }

  function applyChatLang() {
    const ui = uiForSite();
    const title = document.querySelector(".lms-chat-head strong");
    const sub = document.querySelector(".lms-chat-head span");
    const input = $("#lms-chat-input");
    if (title) title.textContent = ui.title;
    if (sub) sub.textContent = ui.sub;
    if (input) input.placeholder = ui.ph;
  }

  function mountChatbot() {
    if ($("#lms-chatbot")) return;
    const ui = uiForSite();

    const root = document.createElement("div");
    root.id = "lms-chatbot";
    root.innerHTML = `
      <div class="lms-chat-panel" id="lms-chat-panel" hidden aria-hidden="true">
        <header class="lms-chat-head">
          <img src="assets/chatbot-robot.png" alt="" width="36" height="36" />
          <div>
            <strong>${ui.title}</strong>
            <span>${ui.sub}</span>
          </div>
          <button type="button" class="lms-chat-close" id="lms-chat-close" aria-label="Close">×</button>
        </header>
        <div class="lms-chat-body" id="lms-chat-body">
          <div class="lms-chat-msg bot">${ui.hi}</div>
        </div>
        <form class="lms-chat-form" id="lms-chat-form">
          <input id="lms-chat-input" name="message" type="text" placeholder="${ui.ph}" autocomplete="off" enterkeyhint="send" />
          <button class="lms-chat-send" type="submit" aria-label="Send message" title="Send">${SEND_ICON}</button>
        </form>
      </div>
      <button type="button" class="lms-chat-fab" id="lms-chat-fab" aria-label="Open Campus Bot" aria-expanded="false">
        <img src="assets/chatbot-robot.png" alt="" width="50" height="50" />
      </button>`;
    document.body.appendChild(root);

    const panel = $("#lms-chat-panel");
    const body = $("#lms-chat-body");
    const fab = $("#lms-chat-fab");
    const form = $("#lms-chat-form");
    const input = $("#lms-chat-input");

    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");

    const addMsg = (text, who) => {
      const div = document.createElement("div");
      div.className = "lms-chat-msg " + who;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    };

    const openChat = () => {
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      fab.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      setTimeout(() => input.focus(), 50);
    };
    const closeChat = () => {
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
      fab.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    };

    fab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (panel.hidden) openChat();
      else closeChat();
    });
    $("#lms-chat-close")?.addEventListener("click", (e) => {
      e.preventDefault();
      closeChat();
    });

    const sendMessage = () => {
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, "user");
      input.value = "";
      setTimeout(() => addMsg(answerFor(text), "bot"), 160);
      input.focus();
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    window.lmsApplyChatLang = applyChatLang;
  }

  function $(sel) {
    return document.querySelector(sel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountChatbot);
  } else {
    mountChatbot();
  }
})();
