document.addEventListener("DOMContentLoaded", function () {
  var buttonResult = document.querySelector('[data-testid="button-result"]');
  var setResult = function (text) {
    if (buttonResult) buttonResult.textContent = text;
  };

  var delayedValue = document.querySelector('[data-testid="input-dynamic-value"]');
  if (delayedValue) window.setTimeout(function () { delayedValue.value = "Loaded after 1 second"; }, 1000);

  var delayedEnable = document.querySelector('[data-testid="button-dynamic-enable"]');
  var delayedAppearance = document.querySelector('[data-testid="button-appears"]');
  if (delayedEnable) window.setTimeout(function () { delayedEnable.disabled = false; }, 2000);
  if (delayedAppearance) window.setTimeout(function () { delayedAppearance.classList.remove("hidden"); }, 2000);
  var buttonDemoForm = document.querySelector('[data-testid="button-demo-form"]');
  if (buttonDemoForm) {
    buttonDemoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      setResult("Submit button activated.");
    });
    buttonDemoForm.addEventListener("reset", function () {
      window.setTimeout(function () { setResult("Demo field reset to its original value."); }, 0);
    });
  }

  document.querySelectorAll('[data-testid^="button-"]').forEach(function (button) {
    var id = button.getAttribute("data-testid");
    if (id === "button-standard") button.addEventListener("click", function () { setResult("Standard button clicked."); });
    if (id === "button-double-click") button.addEventListener("dblclick", function () { setResult("Double-click detected."); });
    if (id === "button-context") button.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      setResult("Right-click detected.");
    });
    if (id === "button-changing-text") button.addEventListener("click", function () {
      button.textContent = button.textContent === "Change my text" ? "Text changed" : "Change my text";
      setResult("Button text is now: " + button.textContent);
    });
    if (id === "button-disappear") button.addEventListener("click", function () {
      button.remove();
      setResult("The button was removed from the DOM.");
    });
  });

  var selectAll = document.querySelector('[data-testid="checkbox-select-all"]');
  var choices = Array.from(document.querySelectorAll('[data-testid^="checkbox-choice-"]'));
  if (selectAll) {
    selectAll.indeterminate = true;
    selectAll.addEventListener("change", function () {
      choices.forEach(function (checkbox) { checkbox.checked = selectAll.checked; });
      selectAll.indeterminate = false;
    });
    choices.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        selectAll.checked = choices.every(function (choice) { return choice.checked; });
        selectAll.indeterminate = !selectAll.checked && choices.some(function (choice) { return choice.checked; });
      });
    });
  }
  var addCheckbox = document.querySelector('[data-testid="button-add-checkbox"]');
  if (addCheckbox) {
    var checkboxNumber = 0;
    addCheckbox.addEventListener("click", function () {
      checkboxNumber += 1;
      var label = document.createElement("label");
      label.className = "checkbox-row";
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.setAttribute("data-testid", "checkbox-generated-" + checkboxNumber);
      label.append(checkbox, document.createTextNode("Generated option " + checkboxNumber));
      document.querySelector('[data-testid="dynamic-checkbox-list"]').appendChild(label);
      choices.push(checkbox);
      checkbox.addEventListener("change", function () {
        selectAll.checked = choices.every(function (choice) { return choice.checked; });
        selectAll.indeterminate = !selectAll.checked && choices.some(function (choice) { return choice.checked; });
      });
    });
  }

  var autocomplete = document.querySelector('[data-testid="input-country-autocomplete"]');
  var suggestions = document.querySelector('[data-testid="country-suggestions"]');
  if (autocomplete && suggestions) {
    var countries = [
      { value: "United Kingdom", slug: "uk" },
      { value: "United States", slug: "us" },
      { value: "United Arab Emirates", slug: "uae" },
      { value: "India", slug: "india" },
      { value: "Australia", slug: "australia" }
    ];
    autocomplete.addEventListener("input", function () {
      suggestions.replaceChildren();
      var query = autocomplete.value.trim().toLowerCase();
      if (!query) {
        autocomplete.setAttribute("aria-expanded", "false");
        return;
      }
      countries.filter(function (country) { return country.value.toLowerCase().includes(query); }).forEach(function (country) {
        var option = document.createElement("button");
        option.type = "button";
        option.setAttribute("role", "option");
        option.setAttribute("data-testid", "country-suggestion-" + country.slug);
        option.textContent = country.value;
        option.addEventListener("click", function () {
          autocomplete.value = country.value;
          autocomplete.setAttribute("aria-expanded", "false");
          suggestions.replaceChildren();
        });
        suggestions.appendChild(option);
      });
      autocomplete.setAttribute("aria-expanded", String(suggestions.childElementCount > 0));
    });
  }

  var dependentCountry = document.querySelector('[data-testid="select-dependent-country"]');
  var dependentState = document.querySelector('[data-testid="select-dependent-state"]');
  var dependentCity = document.querySelector('[data-testid="select-dependent-city"]');
  if (dependentCountry && dependentState && dependentCity) {
    var locations = {
      uk: { states: ["England", "Scotland"], cities: { England: ["London", "Manchester"], Scotland: ["Edinburgh", "Glasgow"] } },
      us: { states: ["California", "New York"], cities: { California: ["San Francisco", "Los Angeles"], "New York": ["New York City", "Buffalo"] } },
      in: { states: ["Karnataka", "Maharashtra"], cities: { Karnataka: ["Bengaluru", "Mysuru"], Maharashtra: ["Mumbai", "Pune"] } }
    };
    dependentCountry.addEventListener("change", function () {
      dependentState.replaceChildren(new Option("Choose a state", ""));
      dependentCity.replaceChildren(new Option("Choose a city", ""));
      var location = locations[dependentCountry.value];
      dependentState.disabled = !location;
      dependentCity.disabled = true;
      if (location) location.states.forEach(function (state) { dependentState.add(new Option(state, state)); });
    });
    dependentState.addEventListener("change", function () {
      dependentCity.replaceChildren(new Option("Choose a city", ""));
      var location = locations[dependentCountry.value];
      var cities = location && location.cities[dependentState.value];
      dependentCity.disabled = !cities;
      if (cities) cities.forEach(function (city) { dependentCity.add(new Option(city, city)); });
    });
  }

  var delayedSelect = document.querySelector('[data-testid="select-delayed"]');
  if (delayedSelect) window.setTimeout(function () {
    delayedSelect.replaceChildren(new Option("Choose a loaded option", ""), new Option("Option Alpha", "alpha"), new Option("Option Beta", "beta"));
    delayedSelect.disabled = false;
  }, 1000);

  [
    ["slider-horizontal", "slider-horizontal-value"],
    ["slider-volume", "slider-volume-value"],
    ["slider-vertical", "slider-vertical-value"]
  ].forEach(function (ids) {
    var slider = document.querySelector('[data-testid="' + ids[0] + '"]');
    var output = document.querySelector('[data-testid="' + ids[1] + '"]');
    if (slider && output) slider.addEventListener("input", function () { output.value = slider.value; output.textContent = slider.value; });
  });
  var rangeMin = document.querySelector('[data-testid="slider-range-min"]');
  var rangeMax = document.querySelector('[data-testid="slider-range-max"]');
  var rangeOutput = document.querySelector('[data-testid="slider-range-value"]');
  if (rangeMin && rangeMax && rangeOutput) {
    function updateRange() {
      if (Number(rangeMin.value) > Number(rangeMax.value)) {
        if (document.activeElement === rangeMin) rangeMax.value = rangeMin.value;
        else rangeMin.value = rangeMax.value;
      }
      rangeOutput.textContent = rangeMin.value + " – " + rangeMax.value;
    }
    rangeMin.addEventListener("input", updateRange);
    rangeMax.addEventListener("input", updateRange);
  }
  var dateOfBirth = document.querySelector('[data-testid="input-date-of-birth"]');
  var rangeStart = document.querySelector('[data-testid="input-start-date"]');
  var rangeEnd = document.querySelector('[data-testid="input-end-date"]');
  var dateToday = new Date();
  var todayString = dateToday.getFullYear() + "-" + String(dateToday.getMonth() + 1).padStart(2, "0") + "-" + String(dateToday.getDate()).padStart(2, "0");
  if (dateOfBirth) dateOfBirth.max = todayString;
  if (rangeStart && rangeEnd) {
    rangeStart.min = todayString;
    rangeEnd.min = todayString;
    rangeStart.addEventListener("change", function () { rangeEnd.min = rangeStart.value || todayString; });
    rangeEnd.addEventListener("change", function () { rangeStart.max = rangeEnd.value || ""; });
  }

  var delayedImage = document.querySelector('[data-testid="image-delayed"]');
  if (delayedImage) window.setTimeout(function () { delayedImage.classList.remove("hidden"); }, 1000);
  var locatorDynamic = document.querySelector('[data-testid="locator-dynamic-id"]');
  if (locatorDynamic) {
    locatorDynamic.id = "target-" + Date.now();
    locatorDynamic.className = "btn changing-selector-class-" + (Date.now() % 10);
  }
  var linkGenerator = document.querySelector('[data-testid="button-generate-link"]');
  if (linkGenerator) linkGenerator.addEventListener("click", function () {
    var link = document.createElement("a");
    link.href = "forms.html";
    link.textContent = "Generated Forms link";
    link.setAttribute("data-testid", "link-dynamic-generated");
    document.querySelector('[data-testid="dynamic-link-container"]').replaceChildren(link);
  });

  var mouseResult = document.querySelector('[data-testid="mouse-result"]');
  document.querySelectorAll('[data-testid="mouse-click"], [data-testid="mouse-double-click"], [data-testid="mouse-context"], [data-testid="mouse-hover"]').forEach(function (element) {
    element.addEventListener("click", function () {
      if (mouseResult) mouseResult.textContent = "Single click detected.";
    });
    element.addEventListener("dblclick", function () {
      if (mouseResult) mouseResult.textContent = "Double-click detected.";
    });
    element.addEventListener("mouseenter", function () {
      if (mouseResult) mouseResult.textContent = "Mouse entered the " + element.textContent.trim() + " control.";
    });
    element.addEventListener("mouseleave", function () {
      if (mouseResult) mouseResult.textContent = "Mouse left the control.";
    });
  });
  var contextTarget = document.querySelector('[data-testid="mouse-context"]');
  function showContextMenu(event) {
    event.preventDefault();
    var menu = document.querySelector('[data-testid="context-menu"]');
    menu.classList.remove("hidden");
    menu.style.left = (event.offsetX || 0) + "px";
    menu.style.top = (event.offsetY || 0) + "px";
    if (mouseResult) mouseResult.textContent = "Context menu opened.";
  }
  if (contextTarget) {
    contextTarget.addEventListener("contextmenu", showContextMenu);
    contextTarget.addEventListener("keydown", function (event) {
      if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) showContextMenu(event);
    });
  }
  var contextItem = document.querySelector('[data-testid="context-menu-item"]');
  if (contextItem) contextItem.addEventListener("click", function () {
    document.querySelector('[data-testid="context-menu"]').classList.add("hidden");
    if (mouseResult) mouseResult.textContent = "Context action selected.";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var menu = document.querySelector('[data-testid="context-menu"]');
      if (menu) menu.classList.add("hidden");
    }
  });

  var draggedTask = null;
  document.querySelectorAll("[data-drag-item]").forEach(function (item) {
    item.addEventListener("dragstart", function (event) {
      draggedTask = item.getAttribute("data-drag-item");
      event.dataTransfer.setData("text/plain", draggedTask);
      item.classList.add("is-dragging");
    });
    item.addEventListener("dragend", function () {
      item.classList.remove("is-dragging");
      document.querySelectorAll(".is-drag-over").forEach(function (zone) { zone.classList.remove("is-drag-over"); });
    });
  });
  document.querySelectorAll("[data-testid='reorder-list'], [data-drop-zone]").forEach(function (zone) {
    zone.addEventListener("dragover", function (event) { event.preventDefault(); });
    zone.addEventListener("dragenter", function (event) {
      event.preventDefault();
      zone.classList.add("is-drag-over");
    });
    zone.addEventListener("dragleave", function (event) {
      if (!zone.contains(event.relatedTarget)) zone.classList.remove("is-drag-over");
    });
    zone.addEventListener("drop", function (event) {
      event.preventDefault();
      zone.classList.remove("is-drag-over");
      var taskId = event.dataTransfer.getData("text/plain") || draggedTask;
      var task = Array.from(document.querySelectorAll("[data-drag-item]")).find(function (item) {
        return item.getAttribute("data-drag-item") === taskId;
      });
      if (!task) return;
      if (zone.getAttribute("data-drop-zone") === "invalid") {
        document.querySelector('[data-testid="drag-result"]').textContent = "Drop rejected: this is an invalid target.";
        return;
      }
      zone.appendChild(task);
      document.querySelector('[data-testid="drag-result"]').textContent = "Moved " + task.textContent.trim() + " to " + (zone.getAttribute("data-drop-zone") || "the reordered list") + ".";
    });
  });

  var keyboardInput = document.querySelector('[data-testid="keyboard-input"]');
  var keyboardResult = document.querySelector('[data-testid="keyboard-result"]');
  if (keyboardInput && keyboardResult) keyboardInput.addEventListener("keydown", function (event) {
    var action = event.key;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") action = "Ctrl/Cmd + A";
    else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") action = "Ctrl/Cmd + C";
    else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") action = "Ctrl/Cmd + V";
    else if (event.shiftKey && event.key === "Tab") action = "Shift + Tab";
    keyboardResult.textContent = "Last key: " + action;
  });

  var copyButton = document.querySelector('[data-testid="button-copy-clipboard"]');
  if (copyButton) copyButton.addEventListener("click", function () {
    var source = document.querySelector('[data-testid="clipboard-source"]');
    var output = document.querySelector('[data-testid="clipboard-result"]');
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      output.textContent = "Clipboard access is unavailable in this browser context; select and copy the source manually.";
      return;
    }
    navigator.clipboard.writeText(source.value).then(function () {
      output.textContent = "Copied to clipboard.";
    }, function () {
      output.textContent = "Clipboard permission was denied; select and copy the source manually.";
    });
  });
  var pasteTarget = document.querySelector('[data-testid="clipboard-target"]');
  if (pasteTarget) pasteTarget.addEventListener("paste", function () {
    document.querySelector('[data-testid="clipboard-result"]').textContent = "Paste detected.";
  });

  var jsTooltipTrigger = document.querySelector('[data-testid="tooltip-js-trigger"]');
  if (jsTooltipTrigger) {
    var tooltipTimer;
    var jsTooltip = jsTooltipTrigger.querySelector('[data-testid="tooltip-js-message"]');
    function showDelayedTooltip() {
      window.clearTimeout(tooltipTimer);
      tooltipTimer = window.setTimeout(function () { jsTooltip.classList.remove("hidden"); }, 600);
    }
    function hideDelayedTooltip() {
      window.clearTimeout(tooltipTimer);
      jsTooltip.classList.add("hidden");
    }
    jsTooltipTrigger.addEventListener("mouseenter", showDelayedTooltip);
    jsTooltipTrigger.addEventListener("focus", showDelayedTooltip);
    jsTooltipTrigger.addEventListener("mouseleave", hideDelayedTooltip);
    jsTooltipTrigger.addEventListener("blur", hideDelayedTooltip);
  }

  var tabs = Array.from(document.querySelectorAll('[role="tab"][data-testid^="tab-"]'));
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (item) {
        var active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls")).hidden = !active;
      });
    });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var offset = event.key === "ArrowRight" ? 1 : -1;
      var next = tabs[(index + offset + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
  var menuToggle = document.querySelector('[data-testid="button-mobile-menu"]');
  if (menuToggle) menuToggle.addEventListener("click", function () {
    var menu = document.getElementById(menuToggle.getAttribute("aria-controls"));
    var expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });
  var mobileMenu = document.querySelector('[data-testid="responsive-menu"]');
  if (mobileMenu) mobileMenu.hidden = true;

  var toastTimer;
  var toastMessages = { success: "Success: changes saved.", warning: "Warning: review this value.", error: "Error: the action could not be completed.", info: "Information: this is a mock notification." };
  var toast = document.querySelector('[data-testid="toast-message"]');
  document.querySelectorAll("[data-toast]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!toast) return;
      window.clearTimeout(toastTimer);
      toast.className = "toast toast--" + button.getAttribute("data-toast");
      toast.textContent = toastMessages[button.getAttribute("data-toast")];
      toastTimer = window.setTimeout(function () { toast.classList.add("hidden"); }, 3000);
    });
  });

  document.querySelectorAll('[data-testid="button-open-tab"], [data-testid="button-open-window"], [data-testid="button-open-multiple-tabs"], [data-testid="button-open-child-window"]').forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-testid");
      var count = id === "button-open-multiple-tabs" ? 3 : 1;
      for (var i = 0; i < count; i++) {
        window.open("window-child.html", id === "button-open-window" ? "playground-window-" + Date.now() : "_blank");
      }
    });
  });
  var delayedDownloadButton = document.querySelector('[data-testid="button-download-delayed"]');
  if (delayedDownloadButton) window.setTimeout(function () { delayedDownloadButton.disabled = false; }, 2000);
  var generateDownload = document.querySelector('[data-testid="button-download-generated"]');
  var delayedDownloadAppears = document.querySelector('[data-testid="button-download-appears"]');
  if (delayedDownloadAppears) window.setTimeout(function () { delayedDownloadAppears.classList.remove("hidden"); }, 2000);
  function createDownload() {
    var blob = new Blob(["Generated locally by Automation Playground.\n"], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "playground-generated.txt";
    anchor.setAttribute("data-testid", "download-generated-link");
    anchor.textContent = "Download generated text";
    document.querySelector('[data-testid="download-result"]').replaceChildren(anchor);
    anchor.click();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  if (generateDownload) generateDownload.addEventListener("click", createDownload);
  if (delayedDownloadButton) delayedDownloadButton.addEventListener("click", createDownload);
  if (delayedDownloadAppears) delayedDownloadAppears.addEventListener("click", createDownload);

  var dynamicId = document.querySelector('[data-testid="dynamic-id-value"]');
  if (dynamicId) dynamicId.textContent = "user-" + Date.now();
  var delayedSearch = document.querySelector('[data-testid="input-delayed-search"]');
  var delayedSearchResult = document.querySelector('[data-testid="delayed-search-result"]');
  if (delayedSearch && delayedSearchResult) {
    var searchTimer;
    var trainingRecords = ["Selenium waits", "Playwright selectors", "Cypress fixtures", "Special characters: [brackets] ?"];
    delayedSearch.addEventListener("input", function () {
      window.clearTimeout(searchTimer);
      delayedSearchResult.textContent = "Searching…";
      searchTimer = window.setTimeout(function () {
        var query = delayedSearch.value.trim().toLowerCase();
        var matches = trainingRecords.filter(function (record) { return record.toLowerCase().includes(query); });
        delayedSearchResult.textContent = query ? (matches.length ? matches.join(", ") : "No results") : "Type to search the local training records.";
      }, 500);
    });
  }
  var dynamicContainer = document.querySelector('[data-testid="dynamic-container"]');
  var insertDynamic = document.querySelector('[data-testid="button-insert-dynamic"]');
  if (insertDynamic) insertDynamic.addEventListener("click", function () {
    var item = document.createElement("button");
    item.className = "btn dynamic-changing-class";
    item.id = "inserted-" + Date.now();
    item.textContent = "Inserted element";
    item.setAttribute("data-testid", "dynamic-inserted-element");
    dynamicContainer.replaceChildren(item);
  });
  var changeDynamic = document.querySelector('[data-testid="button-change-dynamic-text"]');
  if (changeDynamic) changeDynamic.addEventListener("click", function () {
    var item = dynamicContainer.querySelector('[data-testid="dynamic-inserted-element"]');
    if (item) {
      item.textContent = "Updated dynamic text";
      item.setAttribute("aria-label", "Updated accessible name");
      item.className = "btn dynamic-changing-class--updated";
    }
  });
  var removeDynamic = document.querySelector('[data-testid="button-remove-dynamic"]');
  if (removeDynamic) removeDynamic.addEventListener("click", function () { dynamicContainer.replaceChildren(); });
  var refreshComponent = document.querySelector('[data-testid="button-refresh-component"]');
  if (refreshComponent) refreshComponent.addEventListener("click", function () {
    var oldComponent = document.querySelector('[data-testid="stale-card"]');
    var newComponent = oldComponent.cloneNode(true);
    newComponent.querySelector("span").textContent = "Component version " + (Number(oldComponent.getAttribute("data-version") || "1") + 1);
    newComponent.setAttribute("data-version", String(Number(oldComponent.getAttribute("data-version") || "1") + 1));
    oldComponent.replaceWith(newComponent);
    document.querySelector('[data-testid="stale-component-status"]').textContent = "A new DOM node replaced the old component.";
  });

  var waitAppearButton = document.querySelector('[data-testid="button-wait-appear"]');
  if (waitAppearButton) waitAppearButton.addEventListener("click", function () {
    var notice = document.querySelector('[data-testid="wait-appears"]');
    notice.classList.add("hidden");
    waitAppearButton.disabled = true;
    window.setTimeout(function () { notice.classList.remove("hidden"); waitAppearButton.disabled = false; }, 2000);
  });
  var waitDisappearButton = document.querySelector('[data-testid="button-wait-disappear"]');
  var waitDisappearTimer;
  if (waitDisappearButton) waitDisappearButton.addEventListener("click", function () {
    var notice = document.querySelector('[data-testid="wait-disappears"]');
    window.clearTimeout(waitDisappearTimer);
    notice.classList.remove("hidden");
    waitDisappearTimer = window.setTimeout(function () { notice.classList.add("hidden"); }, 3000);
  });
  var waitTextButton = document.querySelector('[data-testid="button-wait-text"]');
  if (waitTextButton) waitTextButton.addEventListener("click", function () {
    window.setTimeout(function () { document.querySelector('[data-testid="wait-changing-text"]').textContent = "Text changed after 1 second"; }, 1000);
  });
  var skeletonButton = document.querySelector('[data-testid="button-skeleton-load"]');
  var skeletonTimer;
  if (skeletonButton) skeletonButton.addEventListener("click", function () {
    var skeleton = document.querySelector('[data-testid="skeleton-loading"]');
    var content = document.querySelector('[data-testid="skeleton-content"]');
    content.classList.add("hidden");
    skeleton.classList.remove("hidden");
    window.clearTimeout(skeletonTimer);
    skeletonTimer = window.setTimeout(function () { skeleton.classList.add("hidden"); content.classList.remove("hidden"); }, 2000);
  });

  function attachShadowContent(host, nested) {
    if (!host || host.shadowRoot) return;
    var root = host.attachShadow({ mode: "open" });
    var label = document.createElement("label");
    label.textContent = nested ? "Nested shadow input " : "Shadow input ";
    var input = document.createElement("input");
    input.setAttribute("data-testid", nested ? "nested-shadow-input" : "shadow-input");
    input.setAttribute("aria-label", nested ? "Nested shadow input" : "Shadow input");
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-testid", nested ? "nested-shadow-button" : "shadow-button");
    button.textContent = nested ? "Nested shadow action" : "Shadow action";
    button.addEventListener("click", function () {
      var result = document.querySelector('[data-testid="shadow-result"]');
      result.textContent = (nested ? "Nested " : "") + "open Shadow DOM button clicked.";
    });
    label.appendChild(input);
    root.append(label, button);
  }
  attachShadowContent(document.querySelector('[data-testid="shadow-host"]'), false);
  attachShadowContent(document.querySelector('[data-testid="nested-shadow-host"]'), true);

  var scrollPanel = document.querySelector('[data-testid="scroll-panel"]');
  var scrollItems = document.querySelector('[data-testid="scroll-items"]');
  var scrollCount = document.querySelector('[data-testid="scroll-count"]');
  if (scrollPanel && scrollItems) {
    var loadedRecords = 0;
    function appendRecords() {
      var nextLimit = Math.min(loadedRecords + 10, 30);
      while (loadedRecords < nextLimit) {
        loadedRecords += 1;
        var record = document.createElement("p");
        record.textContent = "Infinite-scroll record " + loadedRecords;
        record.setAttribute("data-testid", "infinite-record-" + loadedRecords);
        scrollItems.appendChild(record);
      }
      scrollCount.textContent = loadedRecords + " records loaded";
    }
    appendRecords();
    scrollPanel.addEventListener("scroll", function () {
      if (loadedRecords < 30 && scrollPanel.scrollTop + scrollPanel.clientHeight >= scrollPanel.scrollHeight - 20) appendRecords();
    });
  }
  var backToTop = document.querySelector('[data-testid="button-back-to-top"]');
  var scrollReveal = document.querySelector('[data-testid="scroll-reveal"]');
  window.addEventListener("scroll", function () {
    if (backToTop) backToTop.classList.toggle("hidden", window.scrollY < 300);
    if (scrollReveal && window.scrollY > 200) scrollReveal.classList.remove("hidden");
  });
  if (backToTop) backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  var storageInput = document.querySelector('[data-testid="input-storage-preference"]');
  var storageOutput = document.querySelector('[data-testid="storage-result"]');
  document.querySelectorAll("[data-storage-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.getAttribute("data-storage-action");
      var key = "playground_preference";
      if (action === "save") {
        localStorage.setItem(key, storageInput.value);
        sessionStorage.setItem(key, storageInput.value);
        document.cookie = "playground_preference=" + encodeURIComponent(storageInput.value) + "; SameSite=Lax; path=/";
        storageOutput.textContent = "Preference saved in localStorage and sessionStorage.";
        document.querySelector('[data-testid="cookie-result"]').textContent = "Training cookie: " + storageInput.value;
      } else if (action === "read") {
        storageOutput.textContent = "localStorage: " + (localStorage.getItem(key) || "not set") + "; sessionStorage: " + (sessionStorage.getItem(key) || "not set");
      } else {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
        document.cookie = "playground_preference=; Max-Age=0; SameSite=Lax; path=/";
        storageOutput.textContent = "Preference cleared from localStorage and sessionStorage.";
        document.querySelector('[data-testid="cookie-result"]').textContent = "Training cookie: not set";
      }
    });
  });
});
