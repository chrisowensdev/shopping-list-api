const { v4: uuidv4 } = require('uuid');
const userDatabase = require('./user.mongo');
const { saveList } = require('../list/list.model');

async function getAllUsers() {
    console.log('getAllUsers function');
    return await userDatabase
        .find(
            {},
            {
                __v: 0,
            }
        )
        .sort({ lastName: 1 });
    // .skip(skip)
    // .limit(limit);
}

async function getUser(email) {
    return await userDatabase.findOne({ email });
}

async function getUserById(userId) {
    return await userDatabase.findOne({ userId });
}

async function saveUser(user) {
    await userDatabase.findOneAndUpdate(
        {
            userId: user.userId,
        },
        user,
        {
            upsert: true,
        }
    );
}

async function addNewUser(user) {
    console.log('User' + user);
    const email = user.email;
    user.userId = uuidv4();

    const foundUser = await userDatabase.findOne({ email }).exec();
    if (foundUser) {
        return { msg: 'User already exists.' };
    }

    user.location = '';
    console.log('User: ' + user);
    await saveUser(user);
    return { msg: 'User successfully created.', user: user };
}

async function updateUser(user) {
    await saveUser(user);
}

async function deleteUser(userId) {
    console.log('Delete User Function');
}

module.exports = {
    addNewUser,
    getAllUsers,
    getUser,
    getUserById,
    updateUser,
};
