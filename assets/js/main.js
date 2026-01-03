(() => {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // ---------------------------
  // Footer year
  // ---------------------------
  const y = qs("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());

  // ---------------------------
  // Mobile menu toggle
  // ---------------------------
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

    mobileMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setMenuOpen(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") setMenuOpen(false);
    });
  }

  // ---------------------------
  // Tattoo drawer portfolio (patched)

  // ---------------------------
  // Tattoo drawer portfolio (patched)
  // ---------------------------
  const overlay = qs("[data-drawer-overlay]");
  const drawer = qs("[data-drawer]");
  const closeBtn = qs("[data-drawer-close]");
  const titleEl = qs("[data-drawer-title]");
  const subEl = qs("[data-drawer-sub]");
  const chipsWrap = qs("[data-filter-bar]");
  const worksWrap = qs("[data-works]");

  // If drawer markup isn't on this page, safely exit
  if (!overlay || !drawer || !chipsWrap || !worksWrap) return;

  // Ensure starts closed
  overlay.hidden = true;
  document.documentElement.classList.remove("is-locked");

  const CATS = ["黑灰", "细线", "传统", "小图", "字母/文字", "客制"];

  const portfolio = {
    A: {
      name: "A 纹身师",
      subtitle: "选择分类查看 A 纹身师作品。",
      works: [
        { src: "images/TA01.png", cat: CATS[0] },
        { src: "images/TA02.png", cat: CATS[1] },
        { src: "images/TA03.png", cat: CATS[2] },
        { src: "images/TA04.png", cat: CATS[3] },
        { src: "images/TA05.png", cat: CATS[4] },
        { src: "images/TA06.png", cat: CATS[5] },
      ],
    },
    B: {
      name: "B 纹身师",
      subtitle: "选择分类查看 B 纹身师作品。",
      works: [
        { src: "images/TB01.png", cat: CATS[0] },
        { src: "images/TB02.png", cat: CATS[1] },
        { src: "images/TB03.png", cat: CATS[2] },
        { src: "images/TB04.png", cat: CATS[3] },
        { src: "images/TB05.png", cat: CATS[4] },
        { src: "images/TB06.png", cat: CATS[5] },
      ],
    },
  };

  let currentArtist = "A";
  let currentCat = "全部";

  const renderChips = () => {
    const cats = ["全部", ...CATS];
    chipsWrap.innerHTML = "";
    cats.forEach((cat) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("aria-pressed", cat === currentCat ? "true" : "false");
      b.textContent = cat;
      b.addEventListener("click", () => {
        currentCat = cat;
        // update aria-pressed
        Array.from(chipsWrap.children).forEach((n) => n.setAttribute("aria-pressed", n.textContent === currentCat ? "true" : "false"));
        renderWorks();
      });
      chipsWrap.appendChild(b);
    });
  };

  const renderWorks = () => {
    const meta = portfolio[currentArtist];
    const items = currentCat === "全部" ? meta.works : meta.works.filter((w) => w.cat === currentCat);

    worksWrap.innerHTML = "";
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "该分类暂时没有作品。";
      worksWrap.appendChild(empty);
      return;
    }

    items.forEach((w, i) => {
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
  };

  const openDrawer = (artistKey) => {
    currentArtist = artistKey in portfolio ? artistKey : "A";
    currentCat = "全部";

    if (titleEl) titleEl.textContent = "作品集";
    if (subEl) subEl.textContent = portfolio[currentArtist].subtitle || "";

    renderChips();
    renderWorks();

    overlay.hidden = false;
    document.documentElement.classList.add("is-locked");
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    overlay.hidden = true;
    document.documentElement.classList.remove("is-locked");
  };

  // Bind open buttons
  qsa("[data-open-drawer]").forEach((b) => {
    b.addEventListener("click", () => {
      openDrawer(b.getAttribute("data-open-drawer") || "A");
    });
  });

  // Close interactions
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDrawer();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.hidden === false) closeDrawer();
  });

})();
