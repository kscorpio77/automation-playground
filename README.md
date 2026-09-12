# Automation Testground

A small, static practice site for writing browser automation scripts (Selenium, Playwright,
Cypress, Puppeteer, WebdriverIO, etc). Plain HTML/CSS/JS, no backend, no build step.

The problem this solves: real websites change their DOM constantly, breaking scripts you write
against them for practice. This site is versioned instead. Every element carries a stable
`data-testid` attribute, and those attributes will not be renamed or removed within a major
version (see [CHANGELOG.md](CHANGELOG.md)). Build the Docker image once, pin the tag, and your
script keeps working no matter what changes in later versions.

## Running it

```bash
git clone <this-repo-url>
cd automation-testground
docker build -t automation-testground:1.1.0 .
docker run --rm -p 8080:80 automation-testground:1.1.0
```

Then open http://localhost:8080 in your browser.

Always build with an explicit version tag (matching the [VERSION](VERSION) file) rather than
`latest`, and write your scripts against that tag. If you pull updates later, keep running your
old image alongside the new one — your existing scripts will keep passing against it.

## Pages

| Page | Path | What to practice |
| --- | --- | --- |
| Home | `index.html` | Basic navigation |
| Forms & Validation | `pages/forms.html` | Text/email/password inputs, select, checkboxes, radios, client-side validation errors, a custom (non-native) calendar date picker |
| Dynamic Content & Waits | `pages/dynamic-content.html` | Spinners, delayed content, a button that enables after a delay, show/hide toggle, progress bar |
| Tables & Data | `pages/tables.html` | Sortable columns, search filtering, pagination |
| Modals & Alerts | `pages/modals-alerts.html` | Native `alert`/`confirm`/`prompt`, a custom modal dialog, a hover tooltip |
| Drag, Drop & Upload | `pages/drag-drop-upload.html` | HTML5 drag-and-drop between lists, file input, an embedded iframe |
| Mocked Login Flow | `pages/login.html` + `pages/dashboard.html` | Login form, session persisted in `localStorage`, a protected page, logout |

Login credentials for the mocked login flow: username `student`, password `practice123`.

## Selector convention

Every interactive or assertable element has a `data-testid` attribute — prefer that over CSS
classes, element text, or DOM position when writing selectors, since `data-testid` is the only
thing this project guarantees not to change within a major version.

## No backend, no persistence across containers

There is no server-side code and nothing is sent over the network. The only state kept is the
mocked login session, stored in the browser's `localStorage`, which is scoped per-browser and
resets if you clear site data. Each person who runs the Docker image gets their own isolated
instance, so multiple people can use this at the same time without interfering with each other.

## Versioning

This project follows semantic versioning:

- **Patch** (`1.0.x`): bug fixes, no changes to existing `data-testid` attributes or page structure.
- **Minor** (`1.x.0`): new pages or new elements added; existing selectors untouched.
- **Major** (`x.0.0`): breaking changes to existing selectors or page structure, called out in
  [CHANGELOG.md](CHANGELOG.md).
