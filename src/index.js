(async function () {
  const data = await fetch("./src/data.json");
  const res = await data.json();
  // console.log(res);

  let employees = res;
  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0].id;
  //   console.log(employees);
  const employeeList = document.querySelector(".employee__names--list");
  const employeeInfo = document.querySelector(".employee__details--single");
  const addEmpbtn = document.querySelector(".addEmployeebtn");
  const addEmp = document.querySelector(".addEmployee");
  const addEmpForm = document.querySelector(".addEmployee_create");

  //   Add Employee Logic
  addEmpbtn.addEventListener("click", (e) => {
    addEmp.style.display = "flex";
  });
  addEmp.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmp.style.display = "none";
    }
  });

  addEmpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmpForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    empData.id = employees[employees.length - 1].id;
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    // console.log(formData);
    employees.push(empData);
    renderEmployees();
    addEmpForm.reset(); //resets the value and the URl too
    addEmp.style.display = "none";
  });
  //Select Employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployees();
      console.log(selectedEmployeeId + " 22" + " " + e.target.value);
      //renderSingleEmployees
    }
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployee = employees[0] || {};
        selectedEmployeeId = employees[0] ? employees[0].id : -1;
        renderSingleEmployees();
      }
      renderEmployees();
    }
  });

  //Rendering the EMployees list
  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee__names--item");

      if (parseInt(selectedEmployeeId, 10) == emp.id) {
        selectedEmployee = emp;
        // selectedEmployeeId = emp.Id;
        employee.classList.add("selected");
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      employeeList.append(employee);
    });
  };

  //render single employees
  const renderSingleEmployees = () => {
    if (selectedEmployeeId == -1) {
      employeeInfo.innerHTML = ``;
      return;
    }
    employeeInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}" />
    <span class="employee--single__heading">${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
    <span>${selectedEmployee.email}</span>
    <span>Contact - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
    `;
  };

  renderEmployees();
})();
