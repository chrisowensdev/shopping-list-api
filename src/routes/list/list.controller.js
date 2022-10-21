const {
    deleteListById,
    getList,
    getListsByUserId,
    addNewList,
    updateList,
} = require('../../models/list/list.model');

async function httpDeleteListById(req, res) {
    const listId = req.params.listId;
    // return res.status()
    const response = await deleteListById(listId);
    return res.status(204).json(response);
}

async function httpGetList(req, res) {
    const listId = req.params.listId;
    const list = await getList(listId);
    return res.status(200).json({
        list: list,
    });
}

async function httpGetListsByUserId(req, res) {
    const userId = req.params.userId;
    console.log(userId);
    const lists = await getListsByUserId(userId);
    return res.status(200).json({
        lists: lists,
    });
}

async function httpAddNewList(req, res) {
    console.log('HTTP Add New List');
    const list = req.body;
    await addNewList(list);
    // await addNewUser(user);
    return res.status(201).json({
        msg: 'Save List',
        data: list,
    });
}

async function httpUpdateList(req, res) {
    console.log('Http Update list');
}

module.exports = {
    httpDeleteListById,
    httpGetList,
    httpGetListsByUserId,
    httpAddNewList,
    httpUpdateList,
};
