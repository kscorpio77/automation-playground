document.addEventListener("DOMContentLoaded", function () {
  var DATA = [
    { id: 1, name: "Ava Thompson", role: "QA Engineer", department: "Engineering", experience: 4 },
    { id: 2, name: "Liam Chen", role: "SDET", department: "Engineering", experience: 6 },
    { id: 3, name: "Noah Patel", role: "QA Lead", department: "Engineering", experience: 9 },
    { id: 4, name: "Emma Rodriguez", role: "Automation Engineer", department: "Engineering", experience: 3 },
    { id: 5, name: "Olivia Kim", role: "QA Engineer", department: "Engineering", experience: 2 },
    { id: 6, name: "Ethan Nguyen", role: "Product Manager", department: "Product", experience: 7 },
    { id: 7, name: "Sophia Martinez", role: "Product Analyst", department: "Product", experience: 3 },
    { id: 8, name: "Mason Johnson", role: "UX Designer", department: "Design", experience: 5 },
    { id: 9, name: "Isabella Davis", role: "UI Designer", department: "Design", experience: 2 },
    { id: 10, name: "James Wilson", role: "Backend Engineer", department: "Engineering", experience: 8 },
    { id: 11, name: "Mia Garcia", role: "Frontend Engineer", department: "Engineering", experience: 4 },
    { id: 12, name: "Benjamin Lee", role: "DevOps Engineer", department: "Engineering", experience: 6 },
    { id: 13, name: "Charlotte Walker", role: "QA Engineer", department: "Engineering", experience: 1 },
    { id: 14, name: "Lucas Hall", role: "Automation Engineer", department: "Engineering", experience: 5 },
    { id: 15, name: "Amelia Allen", role: "Support Engineer", department: "Support", experience: 3 },
    { id: 16, name: "Henry Young", role: "Support Lead", department: "Support", experience: 8 },
    { id: 17, name: "Evelyn King", role: "Product Manager", department: "Product", experience: 10 },
    { id: 18, name: "Alexander Wright", role: "QA Lead", department: "Engineering", experience: 11 },
    { id: 19, name: "Harper Scott", role: "UX Designer", department: "Design", experience: 4 },
    { id: 20, name: "Daniel Green", role: "SDET", department: "Engineering", experience: 2 },
    { id: 21, name: "Abigail Baker", role: "Backend Engineer", department: "Engineering", experience: 6 },
    { id: 22, name: "Matthew Adams", role: "Frontend Engineer", department: "Engineering", experience: 3 },
    { id: 23, name: "Elizabeth Nelson", role: "Product Analyst", department: "Product", experience: 1 },
    { id: 24, name: "Joseph Carter", role: "DevOps Engineer", department: "Engineering", experience: 9 },
    { id: 25, name: "Sofia Mitchell", role: "Support Engineer", department: "Support", experience: 2 }
  ];

  var ROWS_PER_PAGE = 5;
  var state = {
    query: "",
    sortKey: null,
    sortDir: "asc",
    page: 1
  };

  var searchInput = document.getElementById("table-search");
  var tableBody = document.getElementById("table-body");
  var resultCount = document.getElementById("table-result-count");
  var pagination = document.getElementById("table-pagination");
  var headers = document.querySelectorAll("[data-sort-key]");

  function getFilteredSorted() {
    var rows = DATA.filter(function (row) {
      return row.name.toLowerCase().indexOf(state.query.toLowerCase()) !== -1;
    });

    if (state.sortKey) {
      rows.sort(function (a, b) {
        var av = a[state.sortKey];
        var bv = b[state.sortKey];
        if (typeof av === "string") {
          av = av.toLowerCase();
          bv = bv.toLowerCase();
        }
        if (av < bv) return state.sortDir === "asc" ? -1 : 1;
        if (av > bv) return state.sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return rows;
  }

  function render() {
    var rows = getFilteredSorted();
    resultCount.textContent = rows.length + " result" + (rows.length === 1 ? "" : "s");

    var totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;

    var startIdx = (state.page - 1) * ROWS_PER_PAGE;
    var pageRows = rows.slice(startIdx, startIdx + ROWS_PER_PAGE);

    tableBody.innerHTML = "";
    pageRows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.setAttribute("data-testid", "table-row-" + row.id);

      ["name", "role", "department", "experience"].forEach(function (key) {
        var td = document.createElement("td");
        td.textContent = row[key];
        td.setAttribute("data-testid", "cell-" + key + "-" + row.id);
        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });

    headers.forEach(function (th) {
      var indicator = th.querySelector(".sort-indicator");
      if (th.getAttribute("data-sort-key") === state.sortKey) {
        indicator.textContent = state.sortDir === "asc" ? "▲" : "▼";
      } else {
        indicator.textContent = "";
      }
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.setAttribute("data-testid", "pagination-prev");
    prevBtn.disabled = state.page === 1;
    prevBtn.addEventListener("click", function () {
      state.page -= 1;
      render();
    });
    pagination.appendChild(prevBtn);

    for (var i = 1; i <= totalPages; i++) {
      var pageBtn = document.createElement("button");
      pageBtn.textContent = String(i);
      pageBtn.setAttribute("data-testid", "pagination-page-" + i);
      if (i === state.page) pageBtn.classList.add("is-active");
      pageBtn.addEventListener("click", (function (pageNum) {
        return function () {
          state.page = pageNum;
          render();
        };
      })(i));
      pagination.appendChild(pageBtn);
    }

    var nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.setAttribute("data-testid", "pagination-next");
    nextBtn.disabled = state.page === totalPages;
    nextBtn.addEventListener("click", function () {
      state.page += 1;
      render();
    });
    pagination.appendChild(nextBtn);
  }

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value;
    state.page = 1;
    render();
  });

  headers.forEach(function (th) {
    th.addEventListener("click", function () {
      var key = th.getAttribute("data-sort-key");
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      render();
    });
  });

  render();
});
