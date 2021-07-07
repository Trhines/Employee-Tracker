const connection = require('../config/connection.js')

const Procs = {

    getDepartments: ()=>{
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM departments', (err, res) => {
                if (err) throw err;
                if(res){
                    resolve(res)
                }
                else {reject(console.log(console.log('getDepartments rejected')))}
            })
        })
    },

    getRoles: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM roles', (err, res) => {
                if (err) throw err;
                if(res){resolve(res)}
                else {reject(console.log('getRoles rejected'))}
            })
        })
    },

    getManagers: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM managers', (err, res) => {
                if (err) throw err;
                if(res){
                    resolve(res)
                }
                else {reject(console.log('getManagers rejected'))}
            })
        })
    },

    getEmployees: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM employees', (err, res) => {
                if (err) throw err;
                if(res){
                    resolve(res)
                }
                else {reject(console.log('getEmployees rejected'))}
            })
        })
    }



}

module.exports = Procs;