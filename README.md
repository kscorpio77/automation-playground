# Automation Playground

Automation Playground is a small, static website for practising browser automation on repeatable UI examples. It uses plain HTML, CSS, and JavaScript served by nginx; it has no application backend, database, build step, or required third-party service.

## Who is it for?

- Manual testers learning browser automation
- Freshers and QA engineers building confidence with locators and waits
- SDETs comparing automation approaches
- Trainers preparing classroom demonstrations

The exercises work with Selenium WebDriver, Playwright, Cypress, WebdriverIO, Puppeteer, Robot Framework, and other browser automation tools.

## Run locally with Docker

```bash
git clone https://github.com/kscorpio77/automation-playground.git
cd automation-playground
docker build -t automation-playground:1.3.0 .
docker run --rm -p 8080:80 automation-playground:1.3.0
```

Open <http://localhost:8080>. The static site and sample files are included in the image, so runtime use does not require internet access. Stop the container with `Ctrl+C`.

## Exercises

| Page | Difficulty | Concepts |
| --- | --- | --- |
| `index.html` | All levels | Category overview, Docker quick start, stable navigation |
| `pages/elements.html` | Beginner | Text/number/date inputs, buttons, checkboxes, radios, dropdowns, autocomplete, sliders |
| `pages/forms.html` | Beginner | Registration, field validation, dependent country/state/city selects, native and custom calendars |
| `pages/links-images.html` | Beginner | Internal/external links, targets, downloads, alt text, delayed and intentionally broken images |
| `pages/broken-elements.html` | Intermediate | Labelled broken link/image/resource, disabled control, malformed-looking valid input |
| `pages/locator-playground.html` | Advanced | Stable versus brittle locators, accessible names, dynamic IDs/classes, DOM relationships |
| `pages/tables.html` | Intermediate | Sorting, all-column search, selection, edit/remove, page-size controls, pagination, merged cells |
| `pages/dynamic-content.html` | Intermediate | Spinner, delayed enable, hidden/visible content, deterministic progress with stop/reset |
| `pages/interactions.html` | Intermediate | Mouse/keyboard actions, clipboard, tabs, accordion, menus, toasts, drag-and-drop, windows, downloads |
| `pages/modals-alerts.html` | Intermediate | Browser alert/confirm/prompt, custom and nested modals, delayed warning dialog, tooltip |
| `pages/drag-drop-upload.html` | Intermediate | Drag-and-drop, multiselect, multiple file selection, validation, iframe |
| `pages/advanced.html` | Advanced | Dynamic IDs, stale references, explicit waits, open Shadow DOM, infinite scrolling, nested frames, storage |
| `pages/login.html` + `pages/dashboard.html` | Intermediate | Mock login, protected route, localStorage persistence, logout, simulated expiry |
| `pages/workflows.html` | Intermediate / E2E | Employee CRUD and mock product search-to-checkout journey |
| `pages/frame-one.html` + `pages/frame-two.html` | Advanced | Sibling and nested iframe switching |
| `pages/window-child.html` | Intermediate | Unique child-window identity and close action |

Every challenge page includes a short skills prompt. The exercise list in [AUTOMATION_EXERCISES.md](AUTOMATION_EXERCISES.md) provides more than 50 framework-neutral tasks, and [AUTOMATION_COVERAGE.md](AUTOMATION_COVERAGE.md) maps concepts to difficulty.

## Mock login credentials

Use username `student` and password `practice123`. Authentication is only a browser-side teaching fixture. Do not enter real credentials.

## Locator strategy

Important controls expose descriptive, stable `data-testid` attributes (for example, `input-first-name`, `button-submit`, and `table-employees`). Existing selector values from earlier 1.x releases are retained. Prefer accessible labels, roles, and names where appropriate, then use stable test IDs for deterministic examples. Avoid positional selectors and changing IDs when a stable locator is available.

## Intentional automation challenges

Some fixtures deliberately make automation harder: a broken link and image, dynamic element IDs and classes, delayed content, a bounded infinite list, nested iframes, and a DOM node replaced by the stale-element exercise. They are labelled in the UI and are not accidental application defects. Dynamic IDs may change, but their stable `data-testid` remains available.

## State and privacy

No form, file, or order is sent to a server. File examples are validated locally in the browser. Login, theme, employee, and cart demonstrations may use browser storage; clear site data to reset persisted examples. All training datasets are local and deterministic, and the infinite-scroll list stops after 30 records.

## Versioning

The project follows semantic versioning. Version 1.3.0 is an additive minor release: earlier `data-testid` contracts remain available. Patch releases fix defects; minor releases add exercises without removing old selectors; major releases are reserved for documented breaking changes.
