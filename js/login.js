document.addEventListener("DOMContentLoaded", function () {
  var VALID_USERNAME = "student";
  var VALID_PASSWORD = "practice123";

  var form = document.getElementById("login-form");
  if (!form) return;

  var errorBox = document.getElementById("login-error");
  var expiredBox = document.querySelector('[data-testid="login-session-expired"]');
  var passwordInput = document.getElementById("login-password");
  var togglePassword = document.querySelector('[data-testid="button-toggle-password"]');
  if (new URLSearchParams(window.location.search).get("expired") === "1") {
    expiredBox.classList.add("is-visible");
  }
  if (togglePassword) togglePassword.addEventListener("click", function () {
    var visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePassword.textContent = visible ? "Show password" : "Hide password";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("login-username").value.trim();
    var password = document.getElementById("login-password").value;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      errorBox.classList.remove("is-visible");
      expiredBox.classList.remove("is-visible");
      localStorage.setItem("testground_logged_in", "true");
      localStorage.setItem("testground_username", username);
      localStorage.setItem("testground_remembered", String(document.querySelector('[data-testid="checkbox-remember-me"]').checked));
      window.location.href = "dashboard.html";
    } else {
      errorBox.classList.add("is-visible");
    }
  });
});
