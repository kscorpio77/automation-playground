document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registration-form");
  if (!form) return;

  var successBox = form.querySelector('[data-testid="form-success"]');
  var summary = form.querySelector('[data-testid="form-summary"]');
  var countrySelect = form.querySelector('[data-testid="select-country"]');
  var stateSelect = form.querySelector('[data-testid="select-state"]');
  var citySelect = form.querySelector('[data-testid="select-city"]');
  var locationOptions = {
    in: { states: { Karnataka: ["Bengaluru", "Mysuru"], Maharashtra: ["Mumbai", "Pune"] } },
    us: { states: { California: ["San Francisco", "Los Angeles"], "New York": ["New York City", "Buffalo"] } },
    gb: { states: { England: ["London", "Manchester"], Scotland: ["Edinburgh", "Glasgow"] } },
    de: { states: { Bavaria: ["Munich", "Nuremberg"], Berlin: ["Berlin"] } },
    au: { states: { Victoria: ["Melbourne", "Geelong"], "New South Wales": ["Sydney", "Newcastle"] } }
  };

  function value(testId) {
    var input = form.querySelector('[data-testid="' + testId + '"]');
    return input ? input.value.trim() : "";
  }

  function setError(fieldTestId, isVisible) {
    var el = form.querySelector('[data-testid="error-' + fieldTestId + '"]');
    if (el) el.classList.toggle("is-visible", isVisible);
  }

  function resetSelect(select, placeholder) {
    select.replaceChildren(new Option(placeholder, ""));
  }

  function updateLocations() {
    resetSelect(stateSelect, countrySelect.value ? "Select a state" : "Select a country first");
    resetSelect(citySelect, "Select a state first");
    var location = locationOptions[countrySelect.value];
    stateSelect.disabled = !location;
    citySelect.disabled = true;
    if (location) Object.keys(location.states).forEach(function (state) {
      stateSelect.add(new Option(state, state));
    });
  }

  countrySelect.addEventListener("change", updateLocations);
  stateSelect.addEventListener("change", function () {
    resetSelect(citySelect, "Select a city");
    var location = locationOptions[countrySelect.value];
    var cities = location && location.states[stateSelect.value];
    citySelect.disabled = !cities;
    if (cities) cities.forEach(function (city) { citySelect.add(new Option(city, city)); });
  });

  var dob = form.querySelector('[data-testid="input-registration-dob"]');
  var today = new Date();
  dob.max = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.classList.remove("is-visible");
    summary.textContent = "";

    var firstName = value("input-first-name");
    var lastName = value("input-last-name");
    var username = value("input-username");
    var email = value("input-email");
    var password = form.querySelector('[data-testid="input-password"]').value;
    var confirmPassword = form.querySelector('[data-testid="input-confirm-password"]').value;
    var phone = value("input-phone");
    var dateOfBirth = dob.value;
    var experience = form.querySelector('input[name="level"]:checked');
    var gender = form.querySelector('input[name="gender"]:checked');
    var terms = form.querySelector('[data-testid="checkbox-terms"]');
    var profile = form.querySelector('[data-testid="input-profile-picture"]').files[0];
    var validName = /^[\p{L}][\p{L} '-]*$/u;
    var isValid = true;
    var checks = {
      "first-name": !!firstName && validName.test(firstName),
      "last-name": !!lastName && validName.test(lastName),
      username: username.length >= 3,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length >= 6,
      "confirm-password": password === confirmPassword,
      phone: /^\+?[0-9 ()-]{7,20}$/.test(value("input-phone")) && phone.replace(/\D/g, "").length >= 7,
      "date-of-birth": !!dateOfBirth && dateOfBirth <= dob.max,
      country: !!countrySelect.value,
      state: !!stateSelect.value,
      city: !!citySelect.value,
      gender: !!gender,
      level: !!experience,
      terms: terms.checked,
      "profile-picture": !profile || (/^image\/(png|jpeg)$/.test(profile.type) && profile.size <= 1024 * 1024)
    };

    Object.keys(checks).forEach(function (id) {
      setError(id, !checks[id]);
      if (!checks[id]) isValid = false;
    });
    if (!isValid) return;

    var skills = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(function (input) { return input.value; });
    var lines = [
      "Name: " + firstName + " " + lastName,
      "Username: " + username,
      "Email: " + email,
      "Phone: " + phone,
      "Date of birth: " + dateOfBirth,
      "Gender: " + gender.value,
      "Country: " + countrySelect.selectedOptions[0].textContent,
      "State: " + stateSelect.value,
      "City: " + citySelect.value,
      "Experience: " + experience.value,
      "Skills: " + (skills.join(", ") || "None selected"),
      "Newsletter: " + (form.querySelector('[data-testid="checkbox-newsletter"]').checked ? "Yes" : "No"),
      "Profile picture: " + (profile ? profile.name : "None"),
      "Comments: " + value("input-comments")
    ];
    summary.textContent = lines.join("\n");
    successBox.firstChild.textContent = "Registration submitted successfully.\n";
    successBox.classList.add("is-visible");
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      successBox.classList.remove("is-visible");
      summary.textContent = "";
      ["first-name", "last-name", "username", "email", "password", "confirm-password", "phone", "date-of-birth", "country", "state", "city", "gender", "level", "terms", "profile-picture"].forEach(function (id) {
        setError(id, false);
      });
      updateLocations();
    }, 0);
  });
});
