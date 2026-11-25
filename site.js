(() => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const header = document.querySelector(".site-header");
  const mobile = window.matchMedia("(max-width: 820px)");

  function setMenuOpen(open) {
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  menu.hidden = false;
  header.classList.add("js-nav");
  menu.addEventListener("click", () => {
    setMenuOpen(menu.getAttribute("aria-expanded") === "false");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menu.focus();
    }
  });
  mobile.addEventListener("change", () => setMenuOpen(false));

  const inbox = window.helpingHandsConfig.tutoringEmail.trim();
  if (inbox) {
    const link = document.createElement("a");
    link.href = "mailto:" + inbox;
    link.textContent = inbox;
    document.querySelector("[data-contact-address]").replaceWith(link);
    document.querySelector("[data-placeholder-label]").hidden = true;

    const note = document.querySelector("[data-handoff-note]");
    if (note) {
      note.textContent = "After reviewing your details, open an email draft addressed to the tutoring team. You can also save or copy your request.";
    }
  }
})();
