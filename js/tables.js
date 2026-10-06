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
  var state = { query: "", sortKey: null, sortDir: "asc", page: 1, pageSize: 5 };
  var selectedRows = {};
  var searchInput = document.getElementById("table-search");
  var tableBody = document.getElementById("table-body");
  var resultCount = document.getElementById("table-result-count");
  var pagination = document.getElementById("table-pagination");
  var headers = document.querySelectorAll("[data-sort-key]");
  var selectionCount = document.querySelector('[data-testid="table-selection-count"]');

  function getFilteredSorted() {
    var rows = DATA.filter(function (row) {
      return [row.name, row.role, row.department, String(row.experience)].join(" ").toLowerCase().includes(state.query.toLowerCase());
    });
    if (state.sortKey) rows.sort(function (a, b) {
      var av = a[state.sortKey];
      var bv = b[state.sortKey];
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      if (av < bv) return state.sortDir === "asc" ? -1 : 1;
      if (av > bv) return state.sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }

  function updateSelectionCount() {
    var count = Object.keys(selectedRows).filter(function (id) { return selectedRows[id]; }).length;
    if (selectionCount) selectionCount.textContent = count + " row" + (count === 1 ? "" : "s") + " selected";
  }

  function render() {
    var rows = getFilteredSorted();
    resultCount.textContent = rows.length + " result" + (rows.length === 1 ? "" : "s");
    var totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    state.page = Math.min(state.page, totalPages);
    var startIdx = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(startIdx, startIdx + state.pageSize);
    tableBody.replaceChildren();
    pageRows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.setAttribute("data-testid", "table-row-" + row.id);
      var selectCell = document.createElement("td");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!selectedRows[row.id];
      checkbox.setAttribute("aria-label", "Select " + row.name);
      checkbox.setAttribute("data-testid", "checkbox-table-row-" + row.id);
      checkbox.addEventListener("change", function () { selectedRows[row.id] = checkbox.checked; updateSelectionCount(); });
      selectCell.appendChild(checkbox);
      tr.appendChild(selectCell);
      ["name", "role", "department", "experience"].forEach(function (key) {
        var td = document.createElement("td");
        td.textContent = row[key];
        td.setAttribute("data-testid", "cell-" + key + "-" + row.id);
        tr.appendChild(td);
      });
      var actions = document.createElement("td");
      var edit = document.createElement("button");
      edit.type = "button";
      edit.className = "btn btn--secondary";
      edit.textContent = "Edit";
      edit.setAttribute("data-testid", "button-edit-table-row-" + row.id);
      edit.addEventListener("click", function () {
        var name = window.prompt("Edit employee name:", row.name);
        if (name !== null && name.trim()) { row.name = name.trim(); render(); }
      });
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn btn--secondary";
      remove.textContent = "Remove";
      remove.setAttribute("data-testid", "button-remove-table-row-" + row.id);
      remove.addEventListener("click", function () {
        var index = DATA.findIndex(function (item) { return item.id === row.id; });
        if (index !== -1) DATA.splice(index, 1);
        delete selectedRows[row.id];
        render();
      });
      actions.append(edit, remove);
      tr.appendChild(actions);
      tableBody.appendChild(tr);
    });
    headers.forEach(function (th) {
      var indicator = th.querySelector(".sort-indicator");
      if (th.getAttribute("data-sort-key") === state.sortKey) {
        indicator.textContent = state.sortDir === "asc" ? "▲" : "▼";
        th.setAttribute("aria-sort", state.sortDir === "asc" ? "ascending" : "descending");
      } else {
        indicator.textContent = "";
        th.setAttribute("aria-sort", "none");
      }
    });
    renderPagination(totalPages);
    updateSelectionCount();
  }

  function renderPagination(totalPages) {
    pagination.replaceChildren();
    function addPageButton(label, testId, page, disabled) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("data-testid", testId);
      button.disabled = disabled;
      if (page === state.page && /^pagination-page-/.test(testId)) button.setAttribute("aria-current", "page");
      if (page === state.page && /^pagination-page-/.test(testId)) button.classList.add("is-active");
      button.addEventListener("click", function () { state.page = page; render(); });
      pagination.appendChild(button);
    }
    addPageButton("First", "pagination-first", 1, state.page === 1);
    addPageButton("Prev", "pagination-prev", Math.max(1, state.page - 1), state.page === 1);
    for (var i = 1; i <= totalPages; i++) addPageButton(String(i), "pagination-page-" + i, i, false);
    addPageButton("Next", "pagination-next", Math.min(totalPages, state.page + 1), state.page === totalPages);
    addPageButton("Last", "pagination-last", totalPages, state.page === totalPages);
  }

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.trim();
    state.page = 1;
    render();
  });
  var clearSearch = document.querySelector('[data-testid="button-clear-search"]');
  if (clearSearch) clearSearch.addEventListener("click", function () {
    searchInput.value = "";
    state.query = "";
    state.page = 1;
    render();
  });
  headers.forEach(function (th) {
    function sortByHeader() {
      var key = th.getAttribute("data-sort-key");
      state.sortDir = state.sortKey === key && state.sortDir === "asc" ? "desc" : "asc";
      state.sortKey = key;
      render();
    }
    th.addEventListener("click", sortByHeader);
    th.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); sortByHeader(); }
    });
  });
  var pageSize = document.querySelector('[data-testid="table-page-size"]');
  if (pageSize) pageSize.addEventListener("change", function () {
    state.pageSize = Number(pageSize.value);
    state.page = 1;
    render();
  });
  var addRow = document.querySelector('[data-testid="button-add-table-row"]');
  if (addRow) addRow.addEventListener("click", function () {
    var nextId = DATA.reduce(function (max, row) { return Math.max(max, row.id); }, 0) + 1;
    DATA.push({ id: nextId, name: "New Training Employee " + nextId, role: "QA Engineer", department: "Engineering", experience: 1 });
    render();
  });
  render();
});
