(() => {
  const qs = (s, el=document) => el.querySelector(s);

  // Year in footer
  const y = qs("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
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
})();