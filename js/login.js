document.addEventListener("DOMContentLoaded", function () {
  var VALID_USERNAME = "student";
  var VALID_PASSWORD = "practice123";

  var form = document.getElementById("login-form");
  if (!form) return;

  var errorBox = document.getElementById("login-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("login-username").value.trim();
    var password = document.getElementById("login-password").value;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      errorBox.classList.remove("is-visible");
      localStorage.setItem("testground_logged_in", "true");
      localStorage.setItem("testground_username", username);
      window.location.href = "dashboard.html";
    } else {
      errorBox.classList.add("is-visible");
    }
  });
});
