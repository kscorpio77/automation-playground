(function () {
  var isLoggedIn = localStorage.getItem("testground_logged_in") === "true";
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  var username = localStorage.getItem("testground_username") || "student";
  var welcome = document.getElementById("dashboard-welcome");
  if (welcome) {
    welcome.textContent = "Welcome, " + username + "! You are viewing a protected page.";
  }

  var logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("testground_logged_in");
      localStorage.removeItem("testground_username");
      window.location.href = "login.html";
    });
  }
});
