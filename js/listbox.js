// Custom multi-select dropdown ("list box") - options are plain DOM elements
// rendered into the panel, not a native <select multiple>, so each option is
// independently queryable and clickable like a real component library's would be.

function initListbox(rootId, optionLabels) {
  var root = document.getElementById(rootId);
  if (!root) return;

  var testIdPrefix = root.getAttribute("data-testid-prefix") || "listbox";
  var trigger = root.querySelector('[data-role="trigger"]');
  var triggerLabel = root.querySelector('[data-role="trigger-label"]');
  var optionsContainer = root.querySelector('[data-role="options"]');
  var countLabel = root.querySelector('[data-role="selected-count"]');
  var clearBtn = root.querySelector('[data-role="clear"]');
  var panel = root.querySelector('[data-role="options"]');
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", rootId + "-options");
  panel.id = rootId + "-options";
  panel.setAttribute("role", "listbox");
  panel.setAttribute("aria-multiselectable", "true");

  var selected = {};
  var rowsByValue = {};

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
  }

  function selectedLabels() {
    return optionLabels.filter(function (label) {
      return selected[slugify(label)];
    });
  }

  function updateSummary() {
    var labels = selectedLabels();
    countLabel.textContent = labels.length + " selected";

    if (labels.length === 0) {
      triggerLabel.textContent = "Select tools…";
      triggerLabel.classList.add("listbox__trigger-label--placeholder");
    } else if (labels.length <= 2) {
      triggerLabel.textContent = labels.join(", ");
      triggerLabel.classList.remove("listbox__trigger-label--placeholder");
    } else {
      triggerLabel.textContent = labels.length + " tools selected";
      triggerLabel.classList.remove("listbox__trigger-label--placeholder");
    }
  }

  optionLabels.forEach(function (label) {
    var value = slugify(label);
    var row = document.createElement("div");
    row.className = "listbox__option";
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", "false");
    row.tabIndex = 0;
    row.setAttribute("aria-label", label);
    row.setAttribute("data-testid", testIdPrefix + "-option-" + value);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.tabIndex = -1;
    checkbox.setAttribute("aria-hidden", "true");

    var text = document.createElement("span");
    text.textContent = label;

    row.appendChild(checkbox);
    row.appendChild(text);

    row.addEventListener("click", function () {
      if (selected[value]) {
        delete selected[value];
        checkbox.checked = false;
        row.classList.remove("is-selected");
        row.setAttribute("aria-selected", "false");
      } else {
        selected[value] = true;
        checkbox.checked = true;
        row.classList.add("is-selected");
        row.setAttribute("aria-selected", "true");
      }
      updateSummary();
    });
    row.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });

    rowsByValue[value] = row;
    optionsContainer.appendChild(row);
  });

  function openPanel() {
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    root.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", function () {
    if (root.classList.contains("is-open")) {
      closePanel();
    } else {
      openPanel();
    }
  });

  clearBtn.addEventListener("click", function () {
    selected = {};
    Object.keys(rowsByValue).forEach(function (value) {
      var row = rowsByValue[value];
      row.classList.remove("is-selected");
      row.setAttribute("aria-selected", "false");
      row.querySelector('input[type="checkbox"]').checked = false;
    });
    updateSummary();
  });

  document.addEventListener("click", function (event) {
    if (!root.contains(event.target)) {
      closePanel();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closePanel();
  });

  updateSummary();
}
