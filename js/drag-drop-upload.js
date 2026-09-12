document.addEventListener("DOMContentLoaded", function () {
  var ITEMS = ["Selenium", "Playwright", "Cypress", "Puppeteer", "WebdriverIO"];

  var sourceList = document.getElementById("dnd-source");
  var targetList = document.getElementById("dnd-target");

  function createItem(text) {
    var li = document.createElement("li");
    li.className = "dnd-item";
    li.textContent = text;
    li.draggable = true;
    li.setAttribute("data-testid", "dnd-item-" + text.toLowerCase());

    li.addEventListener("dragstart", function (event) {
      li.classList.add("is-dragging");
      event.dataTransfer.setData("text/plain", text);
    });

    li.addEventListener("dragend", function () {
      li.classList.remove("is-dragging");
    });

    return li;
  }

  ITEMS.forEach(function (text) {
    sourceList.appendChild(createItem(text));
  });

  [sourceList, targetList].forEach(function (list) {
    list.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    list.addEventListener("drop", function (event) {
      event.preventDefault();
      var text = event.dataTransfer.getData("text/plain");
      var dragging = document.querySelector(".dnd-item.is-dragging");
      if (dragging) {
        list.appendChild(dragging);
      }
    });
  });

  var fileInput = document.getElementById("file-input");
  var fileResult = document.getElementById("file-upload-result");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files.length > 0) {
        var file = fileInput.files[0];
        fileResult.textContent =
          "Selected: " + file.name + " (" + file.size + " bytes). File is not uploaded anywhere.";
      } else {
        fileResult.textContent = "";
      }
    });
  }
});
