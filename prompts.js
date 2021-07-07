const Prompts = {
    addRolePrompts: [
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
            choices: ['R&D', 'Marketing', 'HR', 'Production']
        },
    ],
}

module.exports = Prompts;