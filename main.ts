import inquirer from 'inquirer';

interface Employee {
  id: number;
  name: string;
  position: string;
  status: string; // Active or Left
  salary: number;
}

let employees: Employee[] = [];
let empId = 10001;

async function addEmployee() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter employee name:' },
    { type: 'input', name: 'position', message: 'Enter employee position:' },
    { type: 'number', name: 'salary', message: 'Enter employee salary:' }

  ]);

  const newEmployee: Employee = {
    id: empId++,
    name: answers.name,
    position: answers.position,
    salary: answers.salary,
    status: 'Active'
  };

  employees.push(newEmployee);
  console.log('Employee added successfully!');
}

async function editEmployee() {
  if (employees.length === 0) {
    console.log('No employees to edit.');
    return;
  }

  const { id } = await inquirer.prompt([
    { type: 'number', name: 'id', message: 'Enter employee ID to edit:' }
  ]);

  const employee = employees.find(emp => emp.id === id);
  if (!employee) {
    console.log('Employee not found!');
    return;
  }

  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: `Enter new name (${employee.name}):`, default: employee.name },
    { type: 'input', name: 'position', message: `Enter new position (${employee.position}):`, default: employee.position },
    { type: 'number', name: 'salary', message: `Enter new salary (${employee.salary}):`, default: employee.salary }
  ]);

  employee.name = answers.name;
  employee.position = answers.position;
  employee.salary = answers.salary;

  console.log('Employee details updated successfully!');
}

async function markEmployeeLeft() {
  if (employees.length === 0) {
    console.log('No employees to mark as left.');
    return;
  }

  const { id } = await inquirer.prompt([
    { type: 'number', name: 'id', message: 'Enter employee ID to mark as left:' }
  ]);

  const employee = employees.find(emp => emp.id === id);
  if (!employee) {
    console.log('Employee not found!');
    return;
  }

  if (employee.status === 'Left') {
    console.log('Employee is already marked as left.');
    return;
  }

  employee.status = 'Left';
  console.log('Employee marked as left.');
}

async function mainMenu() {
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Add Employee', 'Edit Employee', 'Mark Employee as Left', 'Employees Status', 'Exit']
      }
    ]);

    switch (answers.action) {
      case 'Add Employee':
        await addEmployee();
        break;
      case 'Edit Employee':
        await editEmployee();
        break;
      case 'Mark Employee as Left':
        await markEmployeeLeft();
        break;
      case 'Employees Status':
        console.log(employees);
        break;
      case 'Exit':
        console.log("Exiting...");
            process.exit();
    }
  }
}

mainMenu();
