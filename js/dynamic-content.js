document.addEventListener("DOMContentLoaded", function () {
  var startLoadingBtn = document.getElementById("start-loading");
  var spinner = document.getElementById("loading-spinner");
  var loadedContent = document.getElementById("loaded-content");

  if (startLoadingBtn) {
    startLoadingBtn.addEventListener("click", function () {
      loadedContent.classList.remove("is-visible");
      spinner.classList.remove("hidden");
      startLoadingBtn.disabled = true;
      setTimeout(function () {
        spinner.classList.add("hidden");
        loadedContent.classList.add("is-visible");
        startLoadingBtn.disabled = false;
      }, 2000);
    });
  }

  var delayedEnableButton = document.getElementById("delayed-enable-button");
  if (delayedEnableButton) {
    setTimeout(function () {
      delayedEnableButton.disabled = false;
    }, 3000);
  }

  var togglePanelButton = document.getElementById("toggle-panel-button");
  var togglePanel = document.getElementById("toggle-panel");
  if (togglePanelButton) {
    togglePanelButton.addEventListener("click", function () {
      var isHidden = togglePanel.style.display === "none" || !togglePanel.style.display;
      togglePanel.style.display = isHidden ? "block" : "none";
    });
  }

  var startProgressButton = document.getElementById("start-progress-button");
  var progressFill = document.getElementById("progress-fill");
  var progressStatus = document.getElementById("progress-status");
  if (startProgressButton) {
    startProgressButton.addEventListener("click", function () {
      startProgressButton.disabled = true;
      var pct = 0;
      progressFill.style.width = "0%";
      progressStatus.textContent = "0%";
      var interval = setInterval(function () {
        pct += 10;
        progressFill.style.width = pct + "%";
        progressStatus.textContent = pct + "%";
        if (pct >= 100) {
          clearInterval(interval);
          startProgressButton.disabled = false;
        }
      }, 300);
    });
  }
});
