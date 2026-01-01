(() => {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Expose helpers for page-specific scripts (eg. contact.html)
  const MENG_LI = (window.MENG_LI = window.MENG_LI || {});

  // -----------------------------
  // Footer year
  // -----------------------------
  const y = qs("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // -----------------------------
  // Mobile menu toggle
  // -----------------------------
  const btn = qs("[data-menu-button]");
  const menu = qs("[data-mobile-menu]");

  if (btn && menu) {
    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      document.documentElement.style.overflow = open ? "hidden" : "";
    };

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    // Close when clicking a link
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setOpen(false);
    });

    // Esc to close
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") setOpen(false);
    });
  }

  // -----------------------------
  // i18n
  // -----------------------------
  const STORAGE_KEY = "mengli_lang";
  const supported = ["zh", "en", "ms"];

  const dict = {
    zh: {
      nav_home: "首页",
      nav_tattoo: "纹身",
      nav_barber: "理发",
      nav_artists: "创办人",
      nav_about: "关于",
      nav_contact: "联系",
      nav_advice: "建议",
      cta_book_now: "立即预约",
      cta_open_booking: "打开预约",
      cta_view_more: "查看更多",
      cta_learn_more: "了解更多",
      cta_view_tattoo: "查看纹身作品",
      cta_view_barber: "查看理发作品",
      cta_send_whatsapp: "发送到 WhatsApp",

      contact_title: "联系与咨询",
      contact_lead: "填写表单后将直接跳转 WhatsApp 发送给我们，亦可通过下方信息找到工作室。",
      studio_info: "工作室信息",
      studio_hours: "周一至周日 • 10:00–20:00",
      studio_social_note: "社媒：IG / FB / 小红书（链接放在页脚，这里也可更显眼）",

      form_name: "姓名",
      form_name_ph: "你的姓名",
      form_contact: "联系方式",
      form_contact_ph: "电话 / 微信 / IG / Email",
      form_service: "服务类型",
      form_message: "需求说明",
      form_message_ph: "想做的风格、部位、预算、时间",

      service_barber: "理发",
      service_tattoo: "纹身",
      service_both: "理发 + 纹身",

      footer_studio: "工作室",
      footer_nav: "导航",
      footer_follow: "关注我们",
      footer_rights: "保留所有权利。",
      brand_name: "梦鲤 Meng Li Hair&Tattoo",
    },
    en: {
      nav_home: "Home",
      nav_tattoo: "Tattoo",
      nav_barber: "Barber",
      nav_artists: "Founders",
      nav_about: "About",
      nav_contact: "Contact",
      nav_advice: "Advice",
      cta_book_now: "Book Now",
      cta_open_booking: "Open WhatsApp",
      cta_view_more: "View More",
      cta_learn_more: "Learn More",
      cta_view_tattoo: "View Tattoo Works",
      cta_view_barber: "View Barber Works",
      cta_send_whatsapp: "Send to WhatsApp",

      contact_title: "Contact & Enquiry",
      contact_lead: "After submitting the form, you'll be redirected to WhatsApp to send us your message. You can also reach us using the details below.",
      studio_info: "Studio Information",
      studio_hours: "Mon–Sun • 10:00–20:00",
      studio_social_note: "Social: IG / FB / Xiaohongshu (links in the footer — can be highlighted here too)",

      form_name: "Name",
      form_name_ph: "Your name",
      form_contact: "Contact",
      form_contact_ph: "Phone / WeChat / IG / Email",
      form_service: "Service",
      form_message: "Message",
      form_message_ph: "Style, placement, budget, preferred time",

      service_barber: "Barber",
      service_tattoo: "Tattoo",
      service_both: "Barber + Tattoo",

      footer_studio: "Studio",
      footer_nav: "Navigation",
      footer_follow: "Follow Us",
      footer_rights: "All rights reserved.",
      brand_name: "Meng Li Hair & Tattoo",
    },
    ms: {
      nav_home: "Laman Utama",
      nav_tattoo: "Tatu",
      nav_barber: "Dandan Rambut",
      nav_artists: "Pengasas",
      nav_about: "Tentang",
      nav_contact: "Hubungi",
      nav_advice: "Panduan",
      cta_book_now: "Tempah Sekarang",
      cta_open_booking: "Buka WhatsApp",
      cta_view_more: "Lihat Lagi",
      cta_learn_more: "Ketahui Lagi",
      cta_view_tattoo: "Lihat Hasil Tatu",
      cta_view_barber: "Lihat Hasil Dandan",
      cta_send_whatsapp: "Hantar ke WhatsApp",

      contact_title: "Hubungi & Pertanyaan",
      contact_lead: "Selepas hantar borang, anda akan dibawa ke WhatsApp untuk menghantar mesej kepada kami. Anda juga boleh hubungi kami melalui maklumat di bawah.",
      studio_info: "Maklumat Studio",
      studio_hours: "Isn–Ahd • 10:00–20:00",
      studio_social_note: "Media sosial: IG / FB / Xiaohongshu (pautan di footer — boleh ditonjolkan di sini juga)",

      form_name: "Nama",
      form_name_ph: "Nama anda",
      form_contact: "Maklumat Hubungan",
      form_contact_ph: "Telefon / WeChat / IG / Emel",
      form_service: "Jenis Perkhidmatan",
      form_message: "Butiran",
      form_message_ph: "Gaya, lokasi, bajet, masa pilihan",

      service_barber: "Dandan Rambut",
      service_tattoo: "Tatu",
      service_both: "Dandan + Tatu",

      footer_studio: "Studio",
      footer_nav: "Navigasi",
      footer_follow: "Ikuti Kami",
      footer_rights: "Hak cipta terpelihara.",
      brand_name: "Meng Li Hair & Tattoo",
    },
  };

  const guessLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("ms")) return "ms";
    if (nav.startsWith("en")) return "en";
    return (document.documentElement.getAttribute("data-default-lang") || "zh");
  };

  const setActiveButtons = (lang) => {
    qsa(".lang-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
  };

  const applyLang = (lang) => {
    if (!supported.includes(lang)) lang = "zh";
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setActiveButtons(lang);

    // Text nodes
    qsa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = dict[lang]?.[key];
      if (typeof v === "string") el.textContent = v;
    });

    // Placeholders
    qsa("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const v = dict[lang]?.[key];
      if (typeof v === "string") el.setAttribute("placeholder", v);
    });

    // WhatsApp links should follow language
    updateWhatsAppLinks(lang);
  };

  // Bind language buttons
  qsa(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });

  // -----------------------------
  // WhatsApp: booking + message templates
  // -----------------------------
  const PHONE_E164 = "60176775237"; // Malaysia number without "+"
  const baseWa = `https://wa.me/${PHONE_E164}`;

  const defaultMessage = (lang) => {
    if (lang === "en") return "Hi, I’d like to book an appointment. Please advise availability. Thanks!";
    if (lang === "ms") return "Hai, saya ingin membuat tempahan. Boleh maklumkan waktu yang sesuai? Terima kasih!";
    return "你好，我想预约（理发/纹身）。请问近期还有空档吗？谢谢！";
  };

  const createWhatsAppUrl = (lang, message) => {
    const text = encodeURIComponent(message || defaultMessage(lang));
    return `${baseWa}?text=${text}`;
  };

  const getCurrentLang = () => localStorage.getItem(STORAGE_KEY) || guessLang();

  const updateWhatsAppLinks = (lang) => {
    qsa('a[data-whatsapp="book"], a[data-whatsapp="wa"]').forEach((a) => {
      a.setAttribute("href", createWhatsAppUrl(lang));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  };

  // expose for inline scripts
  MENG_LI.getLang = getCurrentLang;
  MENG_LI.createWhatsAppUrl = createWhatsAppUrl;

  // Tag footer WA button too
  qsa('a[href^="https://wa.me/"]').forEach((a) => {
    if (!a.dataset.whatsapp) a.dataset.whatsapp = "wa";
  });

  // Init
  applyLang(guessLang());
})();
