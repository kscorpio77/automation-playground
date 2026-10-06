# Changelog

## 1.3.0 - 2026-10-06

Additive release. Existing 1.x `data-testid` selectors and exercise pages are retained.

- Added categorized beginner, intermediate, advanced, and end-to-end navigation and guidance.
- Added input/button/control, links/images, keyboard/mouse, accessible widget, download, and mock workflow exercises.
- Added predictable dynamic DOM, stale-node, Shadow DOM, nested iframe, bounded scrolling, storage, and delayed-search exercises.
- Expanded registration validation, table selection/editing/page size, file validation, and progress controls.
- Added local sample download files and documented more than 50 framework-neutral practice exercises.
- Updated repository links and quick-start commands to `kscorpio77/automation-playground`.

## 1.2.0 - 2026-09-12

Additive release, no breaking changes to earlier selectors:

- Added a custom multi-select "dropdown list box" to the Drag, Drop & Upload page:
  `section-listbox`, `listbox-trigger`, `listbox-panel`, `listbox-selected-count`,
  `button-listbox-clear`, and `listbox-option-{slug}` for each option (e.g.
  `listbox-option-selenium`, `listbox-option-webdriverio`).
- Fixed the "Available"/"Selected" drag-and-drop columns being different heights when one had
  more items than the other; they now always match.

## 1.1.0 - 2026-09-12

Additive release, no breaking changes to 1.0.0 selectors:

- Dark mode (system-detected, with a manual toggle in the nav) and real SVG icons in place of
  emoji.
- A "Selectors on this page" reference panel on every challenge page, listing the exact
  `data-testid` CSS selectors with a copy-all button.
- A "Quick start" copyable code block on the homepage.
- A custom (non-native) calendar date picker on the Forms & Validation page: `section-date-picker`,
  `date-picker-input`, `date-picker-calendar`, `button-date-picker-prev-month`,
  `date-picker-month-label`, `button-date-picker-next-month`, `button-date-picker-today`,
  `button-date-picker-clear`, and `date-picker-day-{yyyy-mm-dd}` for each day in the visible month.
- Fixed the drag-and-drop "Selected" list, which was a confusing blank box when empty; it now
  shows a placeholder and highlights on drag-over.

## 1.0.0 - 2026-09-12

Initial release. Includes:

- Forms & validation (`pages/forms.html`)
- Dynamic content & waits (`pages/dynamic-content.html`)
- Tables & data (`pages/tables.html`)
- Modals & alerts (`pages/modals-alerts.html`)
- Drag, drop & upload (`pages/drag-drop-upload.html`)
- Mocked login flow (`pages/login.html`, `pages/dashboard.html`)

All `data-testid` attributes on this version are considered stable and will not be renamed or
removed within the `1.x.x` line. New pages/elements may be added in minor releases; breaking
changes to existing selectors will only happen in a new major version.
