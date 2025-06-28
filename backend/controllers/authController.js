const auth = require('../models/Users'); // adjust path to where your Users.js is located

exports.login = async (req, res) => {
    const { full_name, password } = req.body;
    try {
        const user = await auth.login(full_name, password);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


exports.register = async (req,res) =>{
const {full_name,email,password} = req.body;
try {
    const user = await auth.register(full_name,email,password);
    res.json(user);
} catch (error) {
    res.status(401).json({ error: error.message });
}
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await auth.deleteUser(id);
        if (result) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};