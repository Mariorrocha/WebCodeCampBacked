const usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

usersCtrl.createUser = async (req, res) => {
    const { name, lastname, email } = req.body;
    const newUser = new User({
        name,
        lastname,
        email
    }); 
    await newUser.save();
    res.json({message: 'user saved'})
}

usersCtrl.updateUser = async (req, res) => {
    const { name, lastname, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        name,
        lastname,
        email
    });
    res.json({message: 'user modified'})
}

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'user deleted'})
}

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user)
}

module.exports = usersCtrl;