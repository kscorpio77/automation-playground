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
      sourceList.classList.remove("is-drag-over");
      targetList.classList.remove("is-drag-over");
    });

    return li;
  }

  ITEMS.forEach(function (text) {
    sourceList.appendChild(createItem(text));
  });

  [sourceList, targetList].forEach(function (list) {
    var dragEnterCount = 0;

    list.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    list.addEventListener("dragenter", function (event) {
      event.preventDefault();
      dragEnterCount += 1;
      list.classList.add("is-drag-over");
    });

    list.addEventListener("dragleave", function () {
      dragEnterCount -= 1;
      if (dragEnterCount <= 0) {
        dragEnterCount = 0;
        list.classList.remove("is-drag-over");
      }
    });

    list.addEventListener("drop", function (event) {
      event.preventDefault();
      dragEnterCount = 0;
      list.classList.remove("is-drag-over");
      var dragging = document.querySelector(".dnd-item.is-dragging");
      if (dragging) {
        list.appendChild(dragging);
      }
    });
  });

  var fileInput = document.getElementById("file-input");
  var fileResult = document.getElementById("file-upload-result");
  var dropZone = document.querySelector('[data-testid="file-drop-zone"]');
  if (fileInput) {
    function showFiles(files) {
      var invalid = Array.from(files).find(function (file) {
        var allowed = /\.(txt|csv|json|png|jpe?g|pdf)$/i.test(file.name);
        return !allowed || file.size > 1024 * 1024;
      });
      if (invalid) {
        fileResult.textContent = "Rejected " + invalid.name + ": choose a supported type no larger than 1 MB.";
        fileInput.value = "";
        return;
      }
      fileResult.replaceChildren();
      Array.from(files).forEach(function (file, index) {
        var row = document.createElement("div");
        row.className = "uploaded-file";
        var name = document.createElement("span");
        name.textContent = file.name + " (" + file.size + " bytes)";
        var remove = document.createElement("button");
        remove.type = "button";
        remove.className = "btn btn--secondary";
        remove.textContent = "Remove";
        remove.setAttribute("data-testid", "button-remove-upload-" + (index + 1));
        remove.addEventListener("click", function () {
          fileInput.value = "";
          fileResult.replaceChildren();
        });
        row.append(name, remove);
        fileResult.appendChild(row);
      });
      if (files.length) {
        var note = document.createElement("p");
        note.textContent = "Selected locally; no upload request was sent.";
        fileResult.appendChild(note);
      }
    }
    fileInput.addEventListener("change", function () { showFiles(fileInput.files || []); });
    if (dropZone) {
      ["dragenter", "dragover"].forEach(function (eventName) {
        dropZone.addEventListener(eventName, function (event) {
          event.preventDefault();
          dropZone.classList.add("is-drag-over");
        });
      });
      ["dragleave", "drop"].forEach(function (eventName) {
        dropZone.addEventListener(eventName, function (event) {
          event.preventDefault();
          dropZone.classList.remove("is-drag-over");
        });
      });
      dropZone.addEventListener("drop", function (event) { showFiles(event.dataTransfer.files); });
    }
  }
});
