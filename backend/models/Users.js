const { m } = require('framer-motion');
const db = require('../config/db'); 
async function register(userdata){
    const {fullname, email, password} = userdata;
    const result  = await db.query('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [fullname, email, password]);
    return result.insertId;  // return the ID of the newly created user
}
async function deleteUser(userId) {
    const result = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    return result.affectedRows > 0;  // return true if the user was deleted
}
async function login(full_name, password) {
    const user = await db.query('SELECT * FROM users WHERE full_name = ? AND password = ?', [full_name, password]);
    if (user.length > 0) {
        return user[0];  // return the user object if found
    } else {
        throw new Error('Invalid full_name or password');  // throw an error if not found
    }
}
module.exports = {
    register,
    deleteUser,
    login
};