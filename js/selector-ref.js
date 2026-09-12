// Renders a collapsible "selectors used on this page" panel with a copy-all button.
// Purely informational/decorative - adds no data-testid values to the page under test,
// only its own controls (button-copy-selectors) which are not part of any challenge.

var COPY_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
  '<rect x="9" y="9" width="12" height="12" rx="2"/>' +
  '<path d="M5 15V5a2 2 0 0 1 2-2h10"/>' +
  "</svg>";

function renderSelectorReference(mountId, testIds, note) {
  var mount = document.getElementById(mountId);
  if (!mount) return;

  var selectorLines = testIds.map(function (id) {
    return '[data-testid="' + id + '"]';
  });

  var details = document.createElement("details");
  details.className = "selector-ref";

  var summary = document.createElement("summary");
  summary.innerHTML =
    "<span>Selectors on this page</span>" +
    '<span class="badge">' +
    testIds.length +
    " data-testid" +
    (testIds.length === 1 ? "" : "s") +
    "</span>";
  details.appendChild(summary);

  var body = document.createElement("div");
  body.className = "selector-ref__body";

  var hint = document.createElement("p");
  hint.className = "selector-ref__hint";
  hint.textContent =
    "Every element below is queryable with the CSS selectors listed here, and they will not change within v1.x.x.";
  body.appendChild(hint);

  if (note) {
    var noteEl = document.createElement("p");
    noteEl.className = "selector-ref__hint";
    noteEl.textContent = note;
    body.appendChild(noteEl);
  }

  var codeBlock = document.createElement("div");
  codeBlock.className = "code-block";

  var header = document.createElement("div");
  header.className = "code-block__header";

  var label = document.createElement("span");
  label.className = "code-block__label";
  label.textContent = "CSS selectors";
  header.appendChild(label);

  var copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "copy-btn";
  copyBtn.setAttribute("data-testid", "button-copy-selectors");
  copyBtn.innerHTML = COPY_ICON_SVG + "<span>Copy all</span>";
  copyBtn.addEventListener("click", function () {
    var text = selectorLines.join("\n");
    var span = copyBtn.querySelector("span");
    var original = span.textContent;
    var showCopied = function () {
      span.textContent = "Copied!";
      setTimeout(function () {
        span.textContent = original;
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied, function () {});
    }
  });
  header.appendChild(copyBtn);
  codeBlock.appendChild(header);

  var pre = document.createElement("pre");
  var code = document.createElement("code");
  code.textContent = selectorLines.join("\n");
  pre.appendChild(code);
  codeBlock.appendChild(pre);

  body.appendChild(codeBlock);
  details.appendChild(body);
  mount.appendChild(details);
}
