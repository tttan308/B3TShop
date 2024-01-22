const db = require('../models');
const User = db.users;

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = userController;