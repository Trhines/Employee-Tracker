const departmentSeed =[
    {
        department_name: 'R&D'
    },
    {
        department_name: 'Marketing'
    },
    {
        department_name: 'HR'
    },
    {
        department_name: 'Production'
    }
]

const roleSeed = [
    {
        title: 'Data Analyst',
        salary: 40000.00,
        department_id: 1
    },
    {
        title: 'Data Scientist',
        salary: 150000.00,
        department_id: 1
    },
    {
        title: 'Mechanical Enigineer',
        salary: 150000.00,
        department_id: 1
    },
    {
        title: 'Sales Associate',
        salary: 50000.00,
        department_id: 2
    },
    {
        title: 'Sales Lead',
        salary: 75000.00,
        department_id: 2
    },
    {
        title: 'Advertising specialist',
        salary: 100000.00,
        department_id: 2
    },
    {
        title: 'Payroll Director',
        salary: 70000.00,
        department_id: 3
    },
    {
        title: 'Training Director',
        salary: 70000.00,
        department_id: 3
    },
    {
        title: 'Benefits Director',
        salary: 70000.00,
        department_id: 3
    },
    {
        title: 'Floor Supervisor',
        salary: 50000.00,
        department_id: 4
    },
    {
        title: 'Line Worker',
        salary: 50000.00,
        department_id: 4
    },
    {
        title: 'Maintenance Mechanic',
        salary: 50000.00,
        department_id: 4
    },
]
const managerSeed = [
    {
        firstName: "Nikola",
        lastName: "Tesla",
        department_id: 1
    },
    {
        firstName: "Floyd",
        lastName: "Mayweather",
        department_id: 2
    },
    {
        firstName: "William",
        lastName: "Shakespear",
        department_id: 3
    },
    {
        firstName: "Henry",
        lastName: "Ford",
        department_id: 4
    }
]

const employeeSeed = [
    {
        first_name: 'Bob',
        last_name: 'Bobert',
        role_id: 1,
        manager_id:1,
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        role_id: 2,
        manager_id: 1,
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        role_id: 3,
        manager_id: 1,
    },

    {
        first_name: 'Joe',
        last_name: 'Shmo',
        role_id: 4,
        manager_id:2,
    },
    {
        first_name: 'Will',
        last_name: 'I.AM.',
        role_id: 5,
        manager_id: 2,
    },
    {
        first_name: 'George',
        last_name: 'Lucas',
        role_id: 6,
        manager_id: 2,
    },

    {
        first_name: 'Big',
        last_name: 'Johnson',
        role_id: 7,
        manager_id: 3,
    },
    {
        first_name: 'Monique',
        last_name: 'Tomilinson',
        role_id: 8,
        manager_id: 3,
    },
    {
        first_name: 'Hailie',
        last_name: 'Ponce',
        role_id: 9,
        manager_id: 3,
    },

    {
        first_name: 'Tobi',
        last_name: 'Summers',
        role_id: 10,
        manager_id: 4,
    },
    {
        first_name: 'Loui',
        last_name: 'Strickland',
        role_id: 11,
        manager_id: 4,
    },
    {
        first_name: 'George',
        last_name: 'Lucas',
        role_id: 12,
        manager_id: 4,
    },
]

module.exports ={employeeSeed, departmentSeed, roleSeed, managerSeed}