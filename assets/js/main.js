(() => {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* =========================
     Footer year
  ========================= */
  const y = qs("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());

  /* =========================
     Mobile menu
  ========================= */
  const menuBtn = qs("[data-menu-button]");
  const mobileMenu = qs("[data-mobile-menu]");

  if (menuBtn && mobileMenu) {
    const setMenuOpen = (open) => {
      menuBtn.setAttribute("aria-expanded", String(open));
      mobileMenu.hidden = !open;
      document.documentElement.style.overflow = open ? "hidden" : "";
    };

    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      setMenuOpen(!open);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  /* =========================
     Tattoo drawer portfolio
  ========================= */
  const overlay   = qs("[data-drawer-overlay]");
  const drawer    = qs("[data-drawer]");
  const closeBtn  = qs("[data-drawer-close]");
  const titleEl   = qs("[data-drawer-title]");
  const subEl     = qs("[data-drawer-sub]");
  const chipsWrap = qs("[data-filter-bar]");
  const worksWrap = qs("[data-works]");

  if (!overlay || !drawer || !chipsWrap || !worksWrap) return;

  overlay.hidden = true;
  document.documentElement.classList.remove("is-locked");

  const CATS = ["黑灰", "细线", "传统", "小图", "字母/文字", "客制"];

  const portfolio = {
    A: {
      name: "A 纹身师",
      subtitle: "选择分类查看 A 纹身师作品。",
      works: [
        { src: "images/TA01.png", cat: "黑灰" },
        { src: "images/TA02.png", cat: "细线" },
        { src: "images/TA03.png", cat: "传统" },
        { src: "images/TA04.png", cat: "小图" },
        { src: "images/TA05.png", cat: "字母/文字" },
        { src: "images/TA06.png", cat: "客制" },
      ],
    },
    B: {
      name: "B 纹身师",
      subtitle: "选择分类查看 B 纹身师作品。",
      works: [
        { src: "images/TB01.png", cat: "传统" },
        { src: "images/TB02.png", cat: "小图" },
        { src: "images/TB03.png", cat: "字母/文字" },
        { src: "images/TB04.png", cat: "传统" },
        { src: "images/TB05.png", cat: "小图" },
        { src: "images/TB06.png", cat: "字母/文字" },
      ],
    },
  };

  let currentArtist = "A";
  let currentCat = "全部";

  function renderChips() {
    const cats = ["全部", ...CATS];
    chipsWrap.innerHTML = "";

    cats.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", cat === currentCat ? "true" : "false");

      btn.addEventListener("click", () => {
        currentCat = cat;
        qsa(".chip", chipsWrap).forEach(b =>
          b.setAttribute("aria-pressed", b.textContent === cat ? "true" : "false")
        );
        renderWorks();
      });

      chipsWrap.appendChild(btn);
    });
  }

  function renderWorks() {
    const meta = portfolio[currentArtist];
    const list = currentCat === "全部"
      ? meta.works
      : meta.works.filter(w => w.cat === currentCat);

    worksWrap.innerHTML = "";

    if (!list.length) {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "该分类暂无作品。";
      worksWrap.appendChild(p);
      return;
    }

    list.forEach((w, i) => {
      const fig = document.createElement("figure");
      fig.className = "work-item";

      const img = document.createElement("img");
      img.src = w.src;
      img.alt = `${meta.name} 作品 ${i + 1}`;
      img.loading = "lazy";

      const cap = document.createElement("div");
      cap.className = "work-cap";
      cap.innerHTML = `<p class="cap-meta">${w.cat}</p>`;

      fig.appendChild(img);
      fig.appendChild(cap);
      worksWrap.appendChild(fig);
    });
  }

  function openDrawer(key) {
    currentArtist = portfolio[key] ? key : "A";
    currentCat = "全部";

    titleEl.textContent = "作品集";
    subEl.textContent = portfolio[currentArtist].subtitle;

    renderChips();
    renderWorks();

    overlay.hidden = false;
    document.documentElement.classList.add("is-locked");
  }

  function closeDrawer() {
    overlay.hidden = true;
    document.documentElement.classList.remove("is-locked");
  }

  qsa("[data-open-drawer]").forEach(btn => {
    btn.addEventListener("click", () => {
      openDrawer(btn.getAttribute("data-open-drawer"));
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDrawer();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeDrawer();
  });

})();
