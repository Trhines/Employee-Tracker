const mysql =require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Greeksaregeeks1!',
    database: 'employee_trackerDB'
})

module.exports = connection