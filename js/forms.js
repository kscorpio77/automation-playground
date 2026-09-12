document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registration-form");
  if (!form) return;

  var successBox = form.querySelector('[data-testid="form-success"]');

  function setError(fieldTestId, isVisible) {
    var el = form.querySelector('[data-testid="error-' + fieldTestId + '"]');
    if (el) el.classList.toggle("is-visible", isVisible);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.classList.remove("is-visible");

    var username = form.querySelector('[data-testid="input-username"]').value.trim();
    var email = form.querySelector('[data-testid="input-email"]').value.trim();
    var password = form.querySelector('[data-testid="input-password"]').value;
    var country = form.querySelector('[data-testid="select-country"]').value;
    var level = form.querySelector('input[name="level"]:checked');

    var isValid = true;

    if (username.length < 3) {
      setError("username", true);
      isValid = false;
    } else {
      setError("username", false);
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("email", true);
      isValid = false;
    } else {
      setError("email", false);
    }

    if (password.length < 6) {
      setError("password", true);
      isValid = false;
    } else {
      setError("password", false);
    }

    if (!country) {
      setError("country", true);
      isValid = false;
    } else {
      setError("country", false);
    }

    if (!level) {
      setError("level", true);
      isValid = false;
    } else {
      setError("level", false);
    }

    if (isValid) {
      successBox.classList.add("is-visible");
    }
  });

  form.addEventListener("reset", function () {
    successBox.classList.remove("is-visible");
    ["username", "email", "password", "country", "level"].forEach(function (id) {
      setError(id, false);
    });
  });
});
