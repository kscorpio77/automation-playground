document.addEventListener("DOMContentLoaded", function () {
  var resultEl = document.getElementById("native-dialog-result");

  var alertButton = document.getElementById("alert-button");
  if (alertButton) {
    alertButton.addEventListener("click", function () {
      alert("Hello from the Automation Testground!");
      resultEl.textContent = "alert() was dismissed.";
    });
  }

  var confirmButton = document.getElementById("confirm-button");
  if (confirmButton) {
    confirmButton.addEventListener("click", function () {
      var result = confirm("Do you confirm this action?");
      resultEl.textContent = "confirm() returned: " + result;
    });
  }

  var promptButton = document.getElementById("prompt-button");
  if (promptButton) {
    promptButton.addEventListener("click", function () {
      var result = prompt("Type something:");
      resultEl.textContent = "prompt() returned: " + (result === null ? "null" : '"' + result + '"');
    });
  }

  var overlay = document.getElementById("custom-modal-overlay");
  var openModalButton = document.getElementById("open-modal-button");
  var cancelButton = document.getElementById("modal-cancel-button");
  var confirmModalButton = document.getElementById("modal-confirm-button");
  var modalResult = document.getElementById("modal-result");

  function closeModal() {
    overlay.classList.remove("is-visible");
  }

  if (openModalButton) {
    openModalButton.addEventListener("click", function () {
      overlay.classList.add("is-visible");
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      modalResult.textContent = "Modal was cancelled.";
      closeModal();
    });
  }

  if (confirmModalButton) {
    confirmModalButton.addEventListener("click", function () {
      modalResult.textContent = "Modal was confirmed.";
      closeModal();
    });
  }
});
