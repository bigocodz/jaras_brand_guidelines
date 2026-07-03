const header = document.querySelector("[data-site-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const toast = document.querySelector("[data-toast]");
let toastTimer;

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function activateLink(hash, reveal = false) {
  if (!hash) return;
  const activeLink = navLinks.find((link) => link.hash === hash);
  if (!activeLink) return;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link === activeLink);
  });

  if (reveal) {
    activeLink.scrollIntoView({ block: "nearest", inline: "center" });
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function setActiveLink(entries) {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  activateLink(`#${visible.target.id}`);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("hashchange", () => activateLink(window.location.hash, true));
updateHeader();
activateLink(window.location.hash, true);

navLinks.forEach((link) => {
  link.addEventListener("click", () => activateLink(link.hash, true));
});

const observedSections = navLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(setActiveLink, {
    rootMargin: "-34% 0px -48% 0px",
    threshold: [0.1, 0.35, 0.6],
  });
  observedSections.forEach((section) => observer.observe(section));
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${value} copied`);
    } catch {
      showToast(value);
    }
  });
});
