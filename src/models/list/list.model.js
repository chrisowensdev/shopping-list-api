const { v4: uuidv4 } = require('uuid');

const listDatabase = require('./list.mongo');

async function deleteListById(listId) {
    const response = await listDatabase.deleteOne({ listId });
    console.log(response);
    return response;
}

async function getList(listId) {
    const foundList = await listDatabase.findOne({ listId }).exec();
    console.log('Found List: ' + foundList);
    return foundList;
}

async function getListsByUserId(userId) {
    const lists = await listDatabase.find({
        userId,
    });
    return lists;
}

async function saveList(list) {
    console.log('saveList Function');
    console.log(list);
    await listDatabase.findOneAndUpdate(
        {
            listId: list.listId,
        },
        list,
        {
            upsert: true,
        }
    );
}

async function updateList(list) {
    console.log('Update List');
    // await saveList(list);
}

async function addNewList(list) {
    console.log('list' + list);

    list.listId = uuidv4();
    list.items = [];
    await saveList(list);
    return { msg: 'List successfully created.', list: list };
}

module.exports = {
    deleteListById,
    getList,
    getListsByUserId,
    addNewList,
    updateList,
    saveList,
};
