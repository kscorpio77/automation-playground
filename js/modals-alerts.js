document.addEventListener("DOMContentLoaded", function () {
  var resultEl = document.getElementById("native-dialog-result");
  var alertButton = document.getElementById("alert-button");
  if (alertButton) alertButton.addEventListener("click", function () {
    window.alert("Hello from the Automation Playground!");
    resultEl.textContent = "alert() was dismissed.";
  });

  var confirmButton = document.getElementById("confirm-button");
  if (confirmButton) confirmButton.addEventListener("click", function () {
    resultEl.textContent = "confirm() returned: " + window.confirm("Do you confirm this action?");
  });

  var promptButton = document.getElementById("prompt-button");
  if (promptButton) promptButton.addEventListener("click", function () {
    var result = window.prompt("Type something:");
    resultEl.textContent = "prompt() returned: " + (result === null ? "null" : '"' + result + '"');
  });

  var overlay = document.getElementById("custom-modal-overlay");
  var nestedOverlay = document.querySelector('[data-testid="nested-modal-overlay"]');
  var openModalButton = document.getElementById("open-modal-button");
  var warningButton = document.querySelector('[data-testid="button-open-warning-modal"]');
  var cancelButton = document.getElementById("modal-cancel-button");
  var confirmModalButton = document.getElementById("modal-confirm-button");
  var modalResult = document.getElementById("modal-result");
  var modalTitle = document.getElementById("custom-modal-title");
  var modalDescription = overlay.querySelector(".modal > p");
  var lastFocusedElement = null;

  function closeModal() {
    overlay.classList.remove("is-visible");
    nestedOverlay.classList.remove("is-visible");
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function openModal(title, description, trigger) {
    lastFocusedElement = trigger;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    overlay.classList.add("is-visible");
    confirmModalButton.focus();
  }

  if (openModalButton) openModalButton.addEventListener("click", function () {
    openModal("Confirm action", "Are you sure you want to continue?", openModalButton);
  });
  if (warningButton) warningButton.addEventListener("click", function () {
    warningButton.disabled = true;
    window.setTimeout(function () {
      warningButton.disabled = false;
      openModal("Warning", "This warning dialog appeared after a deterministic delay.", warningButton);
    }, 1000);
  });
  if (cancelButton) cancelButton.addEventListener("click", function () {
    modalResult.textContent = "Modal was cancelled.";
    closeModal();
  });
  if (confirmModalButton) confirmModalButton.addEventListener("click", function () {
    modalResult.textContent = "Modal was confirmed.";
    closeModal();
  });
  var openNested = document.querySelector('[data-testid="button-open-nested-modal"]');
  var closeNested = document.querySelector('[data-testid="button-close-nested-modal"]');
  if (openNested) openNested.addEventListener("click", function () {
    nestedOverlay.classList.add("is-visible");
    closeNested.focus();
  });
  if (closeNested) closeNested.addEventListener("click", function () {
    nestedOverlay.classList.remove("is-visible");
    openNested.focus();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nestedOverlay.classList.contains("is-visible")) {
      nestedOverlay.classList.remove("is-visible");
      openNested.focus();
    } else if (event.key === "Escape" && overlay.classList.contains("is-visible")) {
      closeModal();
    } else if (event.key === "Tab" && nestedOverlay.classList.contains("is-visible")) {
      event.preventDefault();
      closeNested.focus();
    } else if (event.key === "Tab" && overlay.classList.contains("is-visible")) {
      var focusable = Array.from(overlay.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeModal();
  });
});
