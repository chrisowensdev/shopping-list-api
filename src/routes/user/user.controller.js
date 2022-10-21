const {
    getAllUsers,
    addNewUser,
    getUser,
    getUserById,
    updateUser,
} = require('../../models/user/user.model');

async function httpGetAllUsers(req, res) {
    const users = await getAllUsers();
    return res.status(200).json(users);
}

async function httpGetUser(req, res) {
    const email = req.body.email;
    const user = await getUser(email);
    console.log(`HTTP Get User: ${email}`);
    return res.status(200).json(user);
}

async function httpGetUserById(req, res) {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    if (!user) {
        console.log('No User');
        return res.status(404).json({ msg: 'No User Found' });
    }
    return res.status(200).json(user);
}

async function httpUpdateUser(req, res) {
    const user = req.body;
    // console.log('httpUpdateUser ' + user);
    const updatedUser = await updateUser(user);
    console.log(updatedUser);
    return res.status(200).json(updatedUser);
}

async function httpDeleteUser(req, res) {
    console.log('HTTP Delete User');
    const userId = req.params.id;
    console.log(userId);
}

async function httpAddUser(req, res) {
    console.log('HTTP Add User');
    const user = req.body;

    const response = await addNewUser(user);
    return res.status(201).json(response);
}

module.exports = {
    httpAddUser,
    httpDeleteUser,
    httpGetAllUsers,
    httpGetUser,
    httpGetUserById,
    httpUpdateUser,
};
