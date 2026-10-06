document.addEventListener("DOMContentLoaded", function () {
  var controls = [
    { button: "frame-one-button", result: "frame-one-result", message: "Level one clicked." },
    { button: "frame-two-button", result: "frame-two-result", message: "Nested frame clicked." }
  ];
  controls.forEach(function (control) {
    var button = document.querySelector('[data-testid="' + control.button + '"]');
    var result = document.querySelector('[data-testid="' + control.result + '"]');
    if (button && result) button.addEventListener("click", function () { result.textContent = control.message; });
  });
});
