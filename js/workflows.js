document.addEventListener("DOMContentLoaded", function () {
  var employeeRows = document.querySelector('[data-testid="employee-rows"]');
  if (!employeeRows) return;

  var starterEmployees = [
    { id: 101, name: "Ava Thompson", role: "QA Engineer", department: "Engineering" },
    { id: 102, name: "Liam Chen", role: "SDET", department: "Engineering" },
    { id: 103, name: "Sophia Martinez", role: "Product Analyst", department: "Product" },
    { id: 104, name: "Mason Johnson", role: "UX Designer", department: "Design" }
  ];
  var employees = load("playground_employees", starterEmployees);
  var editingId = null;
  var employeeForm = document.querySelector('[data-testid="employee-form"]');
  var employeeSearch = document.querySelector('[data-testid="employee-search"]');
  var departmentFilter = document.querySelector('[data-testid="employee-department-filter"]');
  var employeeStatus = document.querySelector('[data-testid="employee-status"]');

  function load(key, fallback) {
    try {
      var saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function persistEmployees() {
    localStorage.setItem("playground_employees", JSON.stringify(employees));
  }

  function cell(row, value) {
    var td = document.createElement("td");
    td.textContent = value;
    row.appendChild(td);
  }

  function renderEmployees() {
    var query = employeeSearch.value.trim().toLowerCase();
    var department = departmentFilter.value;
    employeeRows.replaceChildren();
    employees.filter(function (employee) {
      var matchesQuery = (employee.name + " " + employee.role + " " + employee.department).toLowerCase().includes(query);
      return matchesQuery && (!department || employee.department === department);
    }).forEach(function (employee) {
      var row = document.createElement("tr");
      row.setAttribute("data-testid", "employee-row-" + employee.id);
      cell(row, String(employee.id));
      cell(row, employee.name);
      cell(row, employee.role);
      cell(row, employee.department);
      var actions = document.createElement("td");
      var edit = document.createElement("button");
      edit.type = "button";
      edit.className = "btn btn--secondary";
      edit.textContent = "Edit";
      edit.setAttribute("data-testid", "button-edit-employee-" + employee.id);
      edit.addEventListener("click", function () {
        editingId = employee.id;
        employeeForm.querySelector('[data-testid="employee-name"]').value = employee.name;
        employeeForm.querySelector('[data-testid="employee-role"]').value = employee.role;
        employeeForm.querySelector('[data-testid="employee-department"]').value = employee.department;
        employeeForm.querySelector('[data-testid="button-save-employee"]').textContent = "Save changes";
        employeeForm.querySelector('[data-testid="button-cancel-edit"]').hidden = false;
      });
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn btn--danger";
      remove.textContent = "Delete";
      remove.setAttribute("data-testid", "button-delete-employee-" + employee.id);
      remove.addEventListener("click", function () {
        if (window.confirm("Delete " + employee.name + "?")) {
          employees = employees.filter(function (item) { return item.id !== employee.id; });
          persistEmployees();
          renderEmployees();
          employeeStatus.textContent = "Employee deleted.";
        }
      });
      actions.append(edit, remove);
      row.appendChild(actions);
      employeeRows.appendChild(row);
    });
  }

  employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = employeeForm.querySelector('[data-testid="employee-name"]').value.trim();
    var role = employeeForm.querySelector('[data-testid="employee-role"]').value.trim();
    var department = employeeForm.querySelector('[data-testid="employee-department"]').value;
    if (editingId !== null) {
      employees = employees.map(function (employee) {
        return employee.id === editingId ? { id: employee.id, name: name, role: role, department: department } : employee;
      });
      editingId = null;
      employeeStatus.textContent = "Employee updated.";
    } else {
      var nextId = employees.reduce(function (max, employee) { return Math.max(max, employee.id); }, 100) + 1;
      employees.push({ id: nextId, name: name, role: role, department: department });
      employeeStatus.textContent = "Employee added.";
    }
    employeeForm.reset();
    employeeForm.querySelector('[data-testid="button-save-employee"]').textContent = "Add employee";
    employeeForm.querySelector('[data-testid="button-cancel-edit"]').hidden = true;
    persistEmployees();
    renderEmployees();
  });
  employeeForm.querySelector('[data-testid="button-cancel-edit"]').addEventListener("click", function () {
    editingId = null;
    employeeForm.reset();
    employeeForm.querySelector('[data-testid="button-save-employee"]').textContent = "Add employee";
    employeeForm.querySelector('[data-testid="button-cancel-edit"]').hidden = true;
  });
  employeeSearch.addEventListener("input", renderEmployees);
  departmentFilter.addEventListener("change", renderEmployees);
  renderEmployees();

  var products = [
    { id: "book-101", name: "Web Automation Handbook", category: "Books", price: 24.5 },
    { id: "course-201", name: "Browser Testing Workshop", category: "Training", price: 49 },
    { id: "mouse-301", name: "Precision Mouse", category: "Accessories", price: 18.75 },
    { id: "course-202", name: "Reliable Waits Course", category: "Training", price: 32 }
  ];
  var productList = document.querySelector('[data-testid="product-list"]');
  var productSearch = document.querySelector('[data-testid="product-search"]');
  var productCategory = document.querySelector('[data-testid="product-category"]');
  var cart = load("playground_cart", []);

  function money(amount) {
    return "$" + amount.toFixed(2);
  }

  function renderProducts() {
    productList.replaceChildren();
    products.filter(function (product) {
      return product.name.toLowerCase().includes(productSearch.value.trim().toLowerCase()) &&
        (!productCategory.value || product.category === productCategory.value);
    }).forEach(function (product) {
      var card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-testid", "product-" + product.id);
      var name = document.createElement("h3");
      name.textContent = product.name;
      var category = document.createElement("p");
      category.textContent = product.category + " · " + money(product.price);
      var details = document.createElement("button");
      details.type = "button";
      details.className = "btn btn--secondary";
      details.textContent = "Details";
      details.setAttribute("data-testid", "button-product-details-" + product.id);
      details.addEventListener("click", function () {
        document.querySelector('[data-testid="product-details"]').textContent = product.name + " — " + product.category + " — " + money(product.price);
      });
      var add = document.createElement("button");
      add.type = "button";
      add.className = "btn";
      add.textContent = "Add to cart";
      add.setAttribute("data-testid", "button-add-to-cart-" + product.id);
      add.addEventListener("click", function () {
        var existing = cart.find(function (item) { return item.id === product.id; });
        if (existing) existing.quantity += 1;
        else cart.push({ id: product.id, quantity: 1 });
        persistCart();
        renderCart();
      });
      card.append(name, category, details, add);
      productList.appendChild(card);
    });
  }

  function persistCart() {
    localStorage.setItem("playground_cart", JSON.stringify(cart));
  }

  function renderCart() {
    var cartItems = document.querySelector('[data-testid="cart-items"]');
    cartItems.replaceChildren();
    var count = 0;
    var total = 0;
    cart.forEach(function (item) {
      var product = products.find(function (candidate) { return candidate.id === item.id; });
      if (!product) return;
      count += item.quantity;
      total += product.price * item.quantity;
      var row = document.createElement("div");
      row.className = "cart-row";
      row.setAttribute("data-testid", "cart-item-" + item.id);
      var label = document.createElement("span");
      label.textContent = product.name + " · " + money(product.price);
      var quantity = document.createElement("input");
      quantity.type = "number";
      quantity.min = "1";
      quantity.max = "20";
      quantity.value = String(item.quantity);
      quantity.setAttribute("aria-label", "Quantity for " + product.name);
      quantity.setAttribute("data-testid", "input-cart-quantity-" + item.id);
      quantity.addEventListener("change", function () {
        var next = Math.max(1, Math.min(20, Number(quantity.value) || 1));
        item.quantity = next;
        persistCart();
        renderCart();
      });
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn btn--secondary";
      remove.textContent = "Remove";
      remove.setAttribute("data-testid", "button-remove-cart-item-" + item.id);
      remove.addEventListener("click", function () {
        cart = cart.filter(function (candidate) { return candidate.id !== item.id; });
        persistCart();
        renderCart();
      });
      row.append(label, quantity, remove);
      cartItems.appendChild(row);
    });
    document.querySelector('[data-testid="cart-count"]').textContent = String(count);
    document.querySelector('[data-testid="cart-total"]').textContent = money(total);
  }

  productSearch.addEventListener("input", renderProducts);
  productCategory.addEventListener("change", renderProducts);
  document.querySelector('[data-testid="button-place-order"]').addEventListener("click", function (event) {
    event.preventDefault();
    var form = document.querySelector('[data-testid="checkout-form"]');
    if (!form.reportValidity()) return;
    if (cart.length === 0) {
      document.querySelector('[data-testid="order-confirmation"]').textContent = "Add an item before placing an order.";
      document.querySelector('[data-testid="order-confirmation"]').classList.add("is-visible");
      return;
    }
    document.querySelector('[data-testid="order-confirmation"]').textContent = "Order confirmed for " +
      form.querySelector('[data-testid="checkout-name"]').value.trim() + ". Your mock order contains " +
      document.querySelector('[data-testid="cart-count"]').textContent + " item(s).";
    document.querySelector('[data-testid="order-confirmation"]').classList.add("is-visible");
    cart = [];
    persistCart();
    renderCart();
  });
  renderProducts();
  renderCart();
});
