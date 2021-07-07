const connection = require('../config/connection.js')
const seedData = require('./data.js')

const seeds = {

    seedDepartments: ()=>{
        for(i=0; i<seedData.departmentSeed.length; i++){
          const query = connection.query(
            'INSERT INTO departments SET ?',
            {
              department_name: `${seedData.departmentSeed[i].department_name}`
            },
            (err, res) => {
              if (err) throw err;
            }
          );
        
          // logs the actual query being run
          console.log(query.sql);
          }
          seeds.seedRoles()
        },

        seedRoles: ()=>{
          for(i=0; i<seedData.roleSeed.length; i++){
            const query = connection.query(
              'INSERT INTO roles SET ?',
              {
                title: `${seedData.roleSeed[i].title}`,
                salary: `${seedData.roleSeed[i].salary}`,
                department_id: `${seedData.roleSeed[i].department_id}`
              },
              (err, res) => {
                if (err) throw err;
              }
            );
          
            // logs the actual query being run
            console.log(query.sql);
            }
            seeds.seedManagers()
          },

          seedManagers: ()=>{
            for(i=0; i<seedData.managerSeed.length; i++){
              const query = connection.query(
                'INSERT INTO managers SET ?',
                {
                  firstName: `${seedData.managerSeed[i].firstName}`,
                  lastName: `${seedData.managerSeed[i].lastName}`,
                  department_id: `${seedData.managerSeed[i].department_id}`
                },
                (err, res) => {
                  if (err) throw err;
                }
              );
            
              // logs the actual query being run
              console.log(query.sql);
              }
              seeds.seedEmployees()
            },

            seedEmployees: ()=>{
              for(i=0; i<seedData.employeeSeed.length; i++){
                const query = connection.query(
                  'INSERT INTO employees SET ?',
                  {
                    first_name: `${seedData.employeeSeed[i].first_name}`,
                    last_name: `${seedData.employeeSeed[i].last_name}`,
                    role_id: `${seedData.employeeSeed[i].role_id}`,
                    manager_id: `${seedData.employeeSeed[i].manager_id}`
                  },
                  (err, res) => {
                    if (err) throw err;
                  }
                );
              
                // logs the actual query being run
                console.log(query.sql);
                }
                connection.end()
              },
}

seeds.seedDepartments()