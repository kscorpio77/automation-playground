// Shared site chrome: top navigation and footer.
// data-testid values here are part of the stable contract for this major version.

var APP_VERSION = "1.0.0";

var NAV_LINKS = [
  { href: "index.html", label: "Home", testId: "nav-home" },
  { href: "pages/forms.html", label: "Forms", testId: "nav-forms" },
  { href: "pages/dynamic-content.html", label: "Dynamic Content", testId: "nav-dynamic-content" },
  { href: "pages/tables.html", label: "Tables", testId: "nav-tables" },
  { href: "pages/modals-alerts.html", label: "Modals & Alerts", testId: "nav-modals-alerts" },
  { href: "pages/drag-drop-upload.html", label: "Drag, Drop & Upload", testId: "nav-drag-drop-upload" },
  { href: "pages/login.html", label: "Login", testId: "nav-login" }
];

function renderSiteNav(basePath, activeTestId) {
  var mount = document.getElementById("site-nav-mount");
  if (!mount) return;

  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("data-testid", "site-nav");

  var brand = document.createElement("a");
  brand.className = "site-nav__brand";
  brand.href = basePath + "index.html";
  brand.textContent = "Automation Testground";
  brand.setAttribute("data-testid", "nav-brand");
  nav.appendChild(brand);

  NAV_LINKS.forEach(function (link) {
    var a = document.createElement("a");
    a.className = "site-nav__link";
    if (link.testId === activeTestId) {
      a.className += " is-active";
    }
    a.href = basePath + link.href;
    a.textContent = link.label;
    a.setAttribute("data-testid", link.testId);
    nav.appendChild(a);
  });

  mount.appendChild(nav);
}

function renderSiteFooter() {
  var mount = document.getElementById("site-footer-mount");
  if (!mount) return;

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.setAttribute("data-testid", "site-footer");
  footer.innerHTML =
    'Automation Testground &mdash; version <span data-testid="app-version">' +
    APP_VERSION +
    "</span>. DOM structure and data-testid attributes are stable within this version.";
  mount.appendChild(footer);
}
