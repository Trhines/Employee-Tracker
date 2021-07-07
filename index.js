
const inquirer = require("inquirer")
const connection =  require('./config/connection.js')
const Procs = require('./dbFuncs/db_funcs.js')

const inquirerPromts = {

    //main menu function. all other command line funciton route back here
    selectAction: ()=>{
        inquirer.prompt(
            {
                name: 'selection',
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'Add new role',
                    'Add new department',
                    'Add new employee',
                    'View roles',
                    'View depatments',
                    'View a departemnts budget',
                    'View employees',
                    "Update employee's role",
                    "Update employee's manager",
                    "Find employee by manager",
                    "Delete role",
                    "Delete department",
                    "Delete employee",
                ]
            }
        ).then(function (response){
            switch (response.selection){
                case 'Add new role':
                    inquirerPromts.addRole()
                    break;
                
                case 'Add new department':
                    inquirerPromts.addDepartment()
                    break;

                case "Add new employee":
                    inquirerPromts.addEmployee()
                    break;

                case "View roles":
                    inquirerPromts.viewRoles()
                    break;

                case "View depatments":
                    inquirerPromts.viewDepartments()
                    break;

                case "View a departemnts budget":
                    inquirerPromts.viewBudget()
                    break;
                
                case "View employees":
                    inquirerPromts.viewEmployees()
                    break;

                case "Update employee's role":
                    inquirerPromts.updateEmployeeRole()
                    break;

                case "Update employee's manager":
                    inquirerPromts.updateManager()
                    break; 

                case "Find employee by manager":
                    inquirerPromts.getEmployeeByManager()

                case "Delete role":
                    inquirerPromts.deleteRole()
                    break;
                
                case "Delete department":
                    inquirerPromts.deleteDepartment()
                    break;

                case "Delete employee":
                    inquirerPromts.deleteEmployee()
                    break;
            }
        })
    },

    addRole: async function (){
        //creates array of all department names from db
        let allDepartments = await Procs.getDepartments()
        let departments = [];
        for(i=0; i<allDepartments.length; i++){
            departments.push(allDepartments[i].department_name)
        }

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role? $'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the new role belong in?',
                choices: departments
            },
        ]).then(async(answer)=>{
            console.log(typeof answer.department)
            await new Promise((resolve, reject)=>{
                connection.query(`SELECT department_id FROM departments WHERE ?`,
                    {
                        department_name: `${answer.department}`
                    },
                    (err, res) => {
                    if (err) throw err;
                    if(res){
                        console.log(res[0].department_id)                
                        answer.department = res[0].department_id
                        resolve(answer.department)
                    }
                    })
            })
            await new Promise ((resolve, reject)=>{
                connection.query('INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                (err, res)=>{
                    if (err) throw (err)
                    //console.log(query.sql)
                    if(res){
                        resolve(console.log(`${answer.title} added`))
                    }
                }
            )
            })
        inquirerPromts.selectAction()
        })
        
    },

    addDepartment: ()=>{
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the new department called?'
            }
        ]).then((res)=>{
            console.log(res.departmentName)
            const query = connection.query(
                'INSERT INTO departments SET ?',
                {
                    department_name: res.departmentName
                },
                (err, res)=>{
                    if (err) throw (err)
                    console.log(query.sql)
                }
            )
        inquirerPromts.selectAction()   
        })

    },

    addEmployee: async ()=>{
        //creates array of roles
        let allRoles = await Procs.getRoles()
        let roles =[]
        for(i=0; i<allRoles.length; i++){
            roles.push(allRoles[i].title)
        }
        //creates array of managers
        let allManagers = await Procs.getManagers()
        let managers =[]
        for(i=0; i<allManagers.length; i++){
            managers.push(allManagers[i].firstName)
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter new first name.'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter new last name.'
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the new employee's job title?",
                choices: roles
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is this employee's manager?",
                choices: managers
            },
        ]).then( async(answer)=>{
            //gets role id
            await new Promise((resolve, reject)=>{
                connection.query(`SELECT role_id FROM roles WHERE ?`,
                    {
                        title: `${answer.role}`
                    },
                    (err, res) => {
                    if (err) throw err;
                    if(res){               
                        answer.role = res[0].role_id
                        resolve(answer.role)
                    }
                    })
            })
            //gets manager id
            await new Promise((resolve, reject)=>{
                connection.query(`SELECT manager_id FROM managers WHERE ?`,
                    {
                        firstName: `${answer.manager}`
                    },
                    (err, res) => {
                    if (err) throw err;
                    if(res){               
                        answer.manager = res[0].manager_id
                        resolve(answer.manager)
                    }
                    })
            })

            await new Promise((resolve, reject)=>{
                connection.query('INSERT INTO employees SET ?', 
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                (err,res)=>{
                    if (err) throw err;
                    if(res){
                        resolve(console.log(`Employee ${answer.first_name} ${answer.last_name} added`))
                    }
                })
            })
            inquirerPromts.selectAction()
        })
    },

    viewRoles: async ()=>{
        console.log('------------------')
        await new Promise ((resolve,reject)=>{
            let query = 'SELECT roles.title, roles.salary, departments.department_name '
            query += 'FROM roles LEFT JOIN departments ON (roles.department_id = departments.department_id)'
            connection.query(query, (err, res) => {
                if (err) throw err;
                if(res){
                    console.table(res)
                    resolve()
                }
                else {reject(console.log(console.log('getDepartments rejected')))}
            })
        })

        inquirerPromts.selectAction()
    },

    viewDepartments: async ()=>{
        let deps = await Procs.getDepartments()
        let names =[]
        for(i=0; i<deps.length; i++){
            names.push(deps[i].department_name)
        }
        console.table(names)
        inquirerPromts.selectAction()
    },

    viewBudget: async ()=>{
        let allDepartments = await Procs.getDepartments()
        let departments = [];
        for(i=0; i<allDepartments.length; i++){
            departments.push(allDepartments[i].department_name)
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: "Which department's budget would you like to see?",
                choices: departments
            }
        ]).then( async(response)=>{
            let depId = await new Promise ((resolve,reject)=>{
                connection.query('SELECT department_id FROM departments WHERE ?',
                {
                    department_name: response.department
                },
                (err,res)=>{
                    if (err) throw err;
                    if(res){resolve(res[0].department_id)}
                    else{reject(console.log('viewBudget rejected'))}
                })
            })

            let salaries = await new Promise ((resolve, reject)=>{
                connection.query('SELECT salary FROM roles WHERE ?',
                {
                    department_id: depId
                },
                (err, res)=>{
                    if (err) throw err;
                    if(res){
                        let array =[]
                        for(i=0; i<res.length; i++){
                            array.push(res[i].salary)
                        }
                        resolve(array)
                    }
                })
            })

            const reducer = (accumulator, item) => accumulator + item;
            let budget = salaries.reduce(reducer, 0)
            console.log(`${response.department} has a budget of ${budget}\n`)
            inquirerPromts.selectAction()
        })

    },

    viewEmployees: async ()=>{
        let employees = await new Promise((resolve,reject)=>{
            let query = 'SELECT employees.first_name, employees.last_name, roles.title, managers.firstName AS Manager '
            query += 'FROM employees '
            query += 'INNER JOIN roles on employees.role_id = roles.role_id '
            query += 'INNER JOIN managers on employees.manager_id = managers.manager_id '
            connection.query(query, (err, res)=>{
                if (err) throw err;
                if (res){
                    resolve(res)
                }
            })
        })
        console.table(employees)
        inquirerPromts.selectAction()
    },

    updateEmployeeRole: async ()=>{
        let newEmployeeRole = {
            name:'',
            role:'',
            roleId: null
        }
        let allEmployees = await Procs.getEmployees()
        let employees = [];
        for(i=0; i<allEmployees.length; i++){
            fullName = `${allEmployees[i].first_name} ${allEmployees[i].last_name}`
            employees.push(fullName)
        }
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message:'Whose role would you like to change?',
                choices: employees
            }

        ]).then( async(answer)=>{
            newEmployeeRole.name = answer.choice
            let allRoles = await Procs.getRoles()
            let roles =[]
            for(i=0; i<allRoles.length; i++){
                roles.push(allRoles[i].title)
            }

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Select a new role',
                    choices: roles
                }
            ]).then( async(answer)=>{
                newEmployeeRole.role = answer.newRole

                await new Promise((resolve, reject)=>{
                    connection.query(`SELECT role_id FROM roles WHERE ?`,
                    {
                        title: newEmployeeRole.role
                    },
                    (err,res)=>{
                        if (err) throw err;
                        if(res){
                            newEmployeeRole.roleId = res[0].role_id
                            resolve()
                        }
                    })
                })
                let splitName = newEmployeeRole.name.split(" ")
                console.log(splitName[0])
                await new Promise((resolve,reject)=>{
                    connection.query(`UPDATE employees SET role_id = '${newEmployeeRole.roleId}' WHERE first_name = '${splitName[0]}'`,

                    (err,res)=>{
                        if (err) throw err;
                        if(res){
                            console.log("Role updated \n")
                            resolve(res)
                        }
                    })
                })
                inquirerPromts.selectAction()
            })
        })

        
    },

    updateManager: async ()=>{
        let newEmployeeManager = {
            name:'',
            manager:'',
            managerId: null
        }
        let allEmployees = await Procs.getEmployees()
        let employees = [];
        for(i=0; i<allEmployees.length; i++){
            fullName = `${allEmployees[i].first_name} ${allEmployees[i].last_name}`
            employees.push(fullName)
        }
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message:'Whose manager would you like to change?',
                choices: employees
            }

        ]).then( async(answer)=>{
            newEmployeeManager.name = answer.choice
            let allManagers = await Procs.getManagers()
            let managers =[]
            for(i=0; i<allManagers.length; i++){
                managers.push(allManagers[i].firstName)
            }

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'newManager',
                    message: 'Select a new Manager',
                    choices: managers
                }
            ]).then( async(answer)=>{
                newEmployeeManager.manager = answer.newManager

                await new Promise((resolve, reject)=>{
                    connection.query(`SELECT manager_id FROM managers WHERE ?`,
                    {
                        firstName: newEmployeeManager.manager
                    },
                    (err,res)=>{
                        if (err) throw err;
                        if(res){
                            newEmployeeManager.managerId = res[0].manager_id
                            resolve(res)
                        }
                    })
                })
                let splitName = newEmployeeManager.name.split(" ")
                console.log(splitName[0])
                await new Promise((resolve,reject)=>{
                    connection.query(`UPDATE employees SET manager_id = '${newEmployeeManager.managerId}' WHERE first_name = '${splitName[0]}'`,

                    (err,res)=>{
                        if (err) throw err;
                        if(res){
                            console.log("Manager updated \n")
                            resolve(res)
                        }
                    })
                })
                inquirerPromts.selectAction()
            })
        })
    },
    
    getEmployeeByManager: async ()=>{
        console.log("hit")
        let allManagers = await Procs.getManagers()
        let managers =[]
        for(i=0; i<allManagers.length; i++){
            managers.push(allManagers[i].firstName)
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: 'Whose employees would you like to see?',
                choices: managers
            }
        ]).then( async(answer)=>{
            console.log(answer.manager)
            await new Promise((resolve,reject)=>{
                let query = 'SELECT employees.first_name, employees.last_name, roles.title '
                query += 'FROM managers '
                query += 'INNER JOIN employees ON managers.manager_id = employees.manager_id '
                query += 'INNER JOIN roles ON roles.role_id = employees.role_id '
                query += `WHERE firstName = '${answer.manager}'`
                connection.query(query, (err, res)=>{
                    if (err) console.log(err);
                    if(res){
                        console.table(res)
                        resolve()
                    }
                })
            })
            inquirerPromts.selectAction()
        })

    },

    deleteDepartment: async ()=>{
        let allDepartments = await Procs.getDepartments()
        let departments = [];
        for(i=0; i<allDepartments.length; i++){
            departments.push(allDepartments[i].department_name)
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: departments
            },
        ]).then( async(answer)=>{
            await new Promise((resolve,reject)=>{
                connection.query('DELETE FROM departments WHERE ?',
                {
                    department_name: answer.department
                },
                (err,res)=>{
                    if(err) throw err;
                    if(res){
                        console.log(`${answer.department} has been deleted`)
                        resolve()
                    }
                })
            })
            inquirerPromts.selectAction()
        })
    },

    deleteEmployee: async ()=>{
        console.log('hit')
        let allEmployees = await Procs.getEmployees()
        let employees = [];
        for(i=0; i<allEmployees.length; i++){
            fullName = `${allEmployees[i].first_name}`
            employees.push(fullName)
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: employees
            },
        ]).then( async(answer)=>{
            console.log(answer.employee)
            await new Promise((resolve,reject)=>{
                connection.query('DELETE FROM employees WHERE ?',
                {
                    first_name: answer.employee
                },
                (err,res)=>{
                    if(err) throw err;
                    if(res){
                        console.log(`${answer.employee} has been deleted`)
                        resolve()
                    }
                })
            })
            inquirerPromts.selectAction()
        })
    },

    deleteRole: async ()=>{
        let allRoles = await Procs.getRoles()
        let roles =[]
        for(i=0; i<allRoles.length; i++){
            roles.push(allRoles[i].title)
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Which employee would you like to delete?',
                choices: roles
            },
        ]).then( async(answer)=>{
            console.log(answer.role)
            await new Promise((resolve,reject)=>{
                connection.query('DELETE FROM roles WHERE ?',
                {
                    title: answer.role
                },
                (err,res)=>{
                    if(err) throw err;
                    if(res){
                        console.log(`${answer.role} has been deleted`)
                        resolve()
                    }
                })
            })
            inquirerPromts.selectAction()
        })
    },
}

inquirerPromts.selectAction()