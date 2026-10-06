# Automation Coverage Matrix

| Feature | Beginner | Intermediate | Advanced | Page |
| --- | :---: | :---: | :---: | --- |
| Text, email, password, number, telephone, URL, search inputs | ✓ | | | `pages/elements.html` |
| Textarea, read-only, disabled, pre-populated, clear, minlength/maxlength | ✓ | | | `pages/elements.html` |
| Buttons: standard, submit, reset, disabled, dynamic enable, double/right-click | ✓ | ✓ | | `pages/elements.html` |
| Hidden, delayed, disappearing, inserted, and removed elements | | ✓ | ✓ | `pages/elements.html`, `pages/advanced.html` |
| Single, multiple, preselected, disabled, select-all, indeterminate, dynamic checkboxes | ✓ | | | `pages/elements.html` |
| Radio groups, disabled option, preselected option | ✓ | | | `pages/elements.html` |
| Native select, multiselect, searchable combo, autocomplete | ✓ | | | `pages/elements.html` |
| Dependent and delayed dropdowns | | ✓ | | `pages/elements.html`, `pages/forms.html` |
| Native dates, date range, time, date-time, custom calendar navigation | ✓ | ✓ | | `pages/elements.html`, `pages/forms.html` |
| Links: internal, external, same/new tab, email, phone, anchor, broken, generated | ✓ | ✓ | | `pages/links-images.html` |
| Images: alt, responsive, clickable, delayed, tooltip, broken | ✓ | ✓ | | `pages/links-images.html` |
| Registration form, input validation, file, terms, confirmation summary | ✓ | ✓ | | `pages/forms.html` |
| Native alert, confirm, prompt | | ✓ | | `pages/modals-alerts.html` |
| Custom, warning, nested modal and tooltip | | ✓ | ✓ | `pages/modals-alerts.html` |
| Success, warning, error, information, auto-dismiss toast | | ✓ | | `pages/interactions.html` |
| Loading spinner, delayed enable, deterministic progress, stop/reset | | ✓ | | `pages/dynamic-content.html` |
| Horizontal/vertical sliders and numeric range outputs | ✓ | | | `pages/elements.html` |
| Page, horizontal container, independent DIV, reveal, back-to-top scrolling | | ✓ | ✓ | `pages/advanced.html` |
| Bounded infinite scrolling (10 to 30 records) | | | ✓ | `pages/advanced.html` |
| Single/multiple upload, drop upload, type/size validation, remove | | ✓ | | `pages/drag-drop-upload.html` |
| Direct and generated TXT, CSV, JSON, HTML downloads | | ✓ | | `pages/interactions.html` |
| Static, searchable, sortable, selectable, editable, dynamic tables | ✓ | ✓ | | `pages/tables.html` |
| Pagination, first/last, configurable page size | | ✓ | | `pages/tables.html` |
| Rowspan, colspan, nested table cell content | | ✓ | | `pages/tables.html` |
| Simple drag/drop, reorder, Kanban, invalid drop target | | ✓ | | `pages/drag-drop-upload.html`, `pages/interactions.html` |
| Single/double/right-click, hover, mouse enter/leave | ✓ | ✓ | | `pages/elements.html`, `pages/interactions.html` |
| Enter, Tab, Escape, Space, arrows, Ctrl/Cmd shortcuts, Shift+Tab | | ✓ | | `pages/interactions.html` |
| Basic, sibling, and nested iframes | | ✓ | ✓ | `pages/drag-drop-upload.html`, `pages/advanced.html` |
| New tab, named window, multiple tabs, child close, parent return | | ✓ | | `pages/interactions.html`, `pages/window-child.html` |
| Open and nested Shadow DOM | | | ✓ | `pages/advanced.html` |
| Dynamic IDs/classes/attributes/text and stable test id | | | ✓ | `pages/advanced.html` |
| Stale element after DOM node replacement | | | ✓ | `pages/advanced.html` |
| Explicit waits for appearance, disappearance, text, skeleton, and progress | | ✓ | ✓ | `pages/dynamic-content.html`, `pages/advanced.html` |
| Enabled, disabled, hidden, visible, read-only, inserted, removed | ✓ | ✓ | ✓ | `pages/elements.html`, `pages/advanced.html` |
| Accordion with `aria-expanded`; tabs with `aria-selected` | | ✓ | | `pages/interactions.html` |
| Navigation, dropdown, nested, hamburger, and context menu | | ✓ | | `pages/interactions.html` |
| Case-insensitive and delayed search, clear, suggestions, no results, special characters | ✓ | ✓ | ✓ | `pages/elements.html`, `pages/tables.html`, `pages/advanced.html`, `pages/workflows.html` |
| Mock login, invalid credentials, protected route, remember, logout, expiry | ✓ | ✓ | | `pages/login.html`, `pages/dashboard.html` |
| Cookies, localStorage, sessionStorage create/read/update/delete | | | ✓ | `pages/advanced.html` |
| Responsive layout and keyboard navigation | ✓ | ✓ | | All pages |
| Accessible labels, roles, names, focus, ARIA states | ✓ | ✓ | ✓ | All pages |
| Stable versus brittle selector challenges and challenging DOM | | | ✓ | `pages/advanced.html` |
| Locator types, dynamic ID/class, roles/names, label, link text, XPath relationships | | | ✓ | `pages/locator-playground.html` |
| Intentional broken link/image/resource, disabled element, valid unusual text | ✓ | ✓ | | `pages/broken-elements.html` |
| Employee CRUD and confirmation | | ✓ | | `pages/workflows.html` |
| Product search/filter/cart/checkout/order confirmation | | ✓ | | `pages/workflows.html` |
