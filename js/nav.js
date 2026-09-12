// Shared site chrome: top navigation and footer.
// data-testid values here are part of the stable contract for this major version.

var APP_VERSION = "1.0.0";
var REPO_URL = "https://github.com/developerpreetiverma/automation-testground";

var NAV_LINKS = [
  { href: "index.html", label: "Home", testId: "nav-home" },
  { href: "pages/forms.html", label: "Forms", testId: "nav-forms" },
  { href: "pages/dynamic-content.html", label: "Dynamic Content", testId: "nav-dynamic-content" },
  { href: "pages/tables.html", label: "Tables", testId: "nav-tables" },
  { href: "pages/modals-alerts.html", label: "Modals & Alerts", testId: "nav-modals-alerts" },
  { href: "pages/drag-drop-upload.html", label: "Drag, Drop & Upload", testId: "nav-drag-drop-upload" },
  { href: "pages/login.html", label: "Login", testId: "nav-login" }
];

var BRAND_ICON_SVG =
  '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
  '<defs><linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#8b7ff0"/></linearGradient></defs>' +
  '<rect width="32" height="32" rx="8" fill="url(#brandGradient)"/>' +
  '<path d="M9 21l4-10 4 10M10.5 17.5h5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
  '<path d="M20 21l3-6 3 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.85"/>' +
  "</svg>";

var GITHUB_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.78.12 3.07.74.8 1.19 1.83 1.19 3.09 0 4.44-2.7 5.42-5.27 5.7.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>' +
  "</svg>";

var SUN_ICON_SVG =
  '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">' +
  '<circle cx="12" cy="12" r="4.5"/>' +
  '<path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>' +
  "</svg>";

var MOON_ICON_SVG =
  '<svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M20.7 14.6A8.6 8.6 0 0 1 9.4 3.3a.7.7 0 0 0-.9-.9A10 10 0 1 0 21.6 15.5a.7.7 0 0 0-.9-.9Z"/>' +
  "</svg>";

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var currentlyDark = current === "dark" || (!current && prefersDark);
  var next = currentlyDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("testground_theme", next);
  } catch (e) {
    /* localStorage unavailable, theme just won't persist */
  }
}

function renderSiteNav(basePath, activeTestId) {
  var mount = document.getElementById("site-nav-mount");
  if (!mount) return;

  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("data-testid", "site-nav");

  var brand = document.createElement("a");
  brand.className = "site-nav__brand";
  brand.href = basePath + "index.html";
  brand.setAttribute("data-testid", "nav-brand");
  brand.innerHTML = '<span class="site-nav__brand-icon">' + BRAND_ICON_SVG + "</span><span>Automation Testground</span>";
  nav.appendChild(brand);

  var linksWrap = document.createElement("div");
  linksWrap.className = "site-nav__links";

  NAV_LINKS.forEach(function (link) {
    var a = document.createElement("a");
    a.className = "site-nav__link";
    if (link.testId === activeTestId) {
      a.className += " is-active";
    }
    a.href = basePath + link.href;
    a.textContent = link.label;
    a.setAttribute("data-testid", link.testId);
    linksWrap.appendChild(a);
  });

  nav.appendChild(linksWrap);

  var right = document.createElement("div");
  right.className = "site-nav__right";

  var themeButton = document.createElement("button");
  themeButton.type = "button";
  themeButton.className = "icon-btn";
  themeButton.setAttribute("data-testid", "button-theme-toggle");
  themeButton.setAttribute("aria-label", "Toggle dark mode");
  themeButton.innerHTML = SUN_ICON_SVG + MOON_ICON_SVG;
  themeButton.addEventListener("click", toggleTheme);
  right.appendChild(themeButton);

  var githubLink = document.createElement("a");
  githubLink.className = "icon-btn";
  githubLink.href = REPO_URL;
  githubLink.target = "_blank";
  githubLink.rel = "noopener noreferrer";
  githubLink.setAttribute("data-testid", "link-github");
  githubLink.setAttribute("aria-label", "View source on GitHub");
  githubLink.innerHTML = GITHUB_ICON_SVG;
  right.appendChild(githubLink);

  nav.appendChild(right);
  mount.appendChild(nav);
}

function renderSiteFooter() {
  var mount = document.getElementById("site-footer-mount");
  if (!mount) return;

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.setAttribute("data-testid", "site-footer");
  footer.innerHTML =
    '<div class="site-footer__links">' +
    '<a href="' +
    REPO_URL +
    '" target="_blank" rel="noopener noreferrer">' +
    GITHUB_ICON_SVG +
    " Source on GitHub</a>" +
    "</div>" +
    'Automation Testground &mdash; version <span data-testid="app-version">' +
    APP_VERSION +
    "</span>. DOM structure and data-testid attributes are stable within this version.";
  mount.appendChild(footer);
}
