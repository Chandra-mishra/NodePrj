const User = require('../services/user');
const utils = require("../utils/util");

module.exports = {
    add: async function (req, res,next) {
        const fileData = req.file.buffer.toString('utf8');
        let result = await User.add(fileData,next);
        utils.sendResponse(result, req, res);
    },

    listAll: async function (req, res,next) {
        let { start, length, searchTxt, searchField } = req.params;
        let result = await User.listAll(parseInt(start), parseInt(length), searchTxt, searchField,next);
        utils.sendResponse(result, req, res);
    },

    getUser: async function (req, res,next) {
        let result = await User.getUser(next);
        utils.sendResponse(result, req, res);
    },
    login: async function (req, res,next) {
        console.log(req.body)
        let result = await User.login(req.body.email,next);
        utils.sendResponse(result, req, res);
    },
}