// Custom calendar date picker (not the native <input type="date">).
// Every rendered day in the visible month gets a data-testid of
// "<prefix>-day-YYYY-MM-DD"; days from the adjacent month are shown muted
// and are not interactive, so they carry no testid.

function initDatePicker(rootId) {
  var root = document.getElementById(rootId);
  if (!root) return;

  var testIdPrefix = root.getAttribute("data-testid-prefix") || "date-picker";
  var input = root.querySelector('[data-role="input"]');
  var calendar = root.querySelector('[data-role="calendar"]');
  var monthLabel = root.querySelector('[data-role="month-label"]');
  var daysGrid = root.querySelector('[data-role="days-grid"]');
  var prevBtn = root.querySelector('[data-role="prev"]');
  var nextBtn = root.querySelector('[data-role="next"]');
  var todayBtn = root.querySelector('[data-role="today"]');
  var clearBtn = root.querySelector('[data-role="clear"]');

  var MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();
  var selectedDate = null;

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function formatDate(d) {
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function isSameDay(a, b) {
    return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function openCalendar() {
    calendar.classList.add("is-open");
  }

  function closeCalendar() {
    calendar.classList.remove("is-open");
  }

  function render() {
    monthLabel.textContent = MONTH_NAMES[viewMonth] + " " + viewYear;
    daysGrid.innerHTML = "";

    var firstOfMonth = new Date(viewYear, viewMonth, 1);
    var startWeekday = firstOfMonth.getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (var i = 0; i < startWeekday; i++) {
      var pad = document.createElement("span");
      pad.className = "date-picker__day date-picker__day--muted";
      daysGrid.appendChild(pad);
    }

    var _loop = function (day) {
      var cellDate = new Date(viewYear, viewMonth, day);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "date-picker__day";
      btn.textContent = String(day);
      btn.setAttribute("data-testid", testIdPrefix + "-day-" + formatDate(cellDate));
      if (isSameDay(cellDate, today)) btn.classList.add("date-picker__day--today");
      if (selectedDate && isSameDay(cellDate, selectedDate)) btn.classList.add("date-picker__day--selected");
      btn.addEventListener("click", function () {
        selectedDate = cellDate;
        input.value = formatDate(cellDate);
        closeCalendar();
        render();
      });
      daysGrid.appendChild(btn);
    };

    for (var day = 1; day <= daysInMonth; day++) {
      _loop(day);
    }
  }

  input.addEventListener("click", function () {
    if (calendar.classList.contains("is-open")) {
      closeCalendar();
    } else {
      openCalendar();
    }
  });

  prevBtn.addEventListener("click", function () {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    render();
  });

  nextBtn.addEventListener("click", function () {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    render();
  });

  todayBtn.addEventListener("click", function () {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    selectedDate = new Date(today);
    input.value = formatDate(selectedDate);
    render();
    closeCalendar();
  });

  clearBtn.addEventListener("click", function () {
    selectedDate = null;
    input.value = "";
    render();
  });

  document.addEventListener("click", function (event) {
    if (!root.contains(event.target)) {
      closeCalendar();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeCalendar();
  });

  render();
}
