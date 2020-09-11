const Router = require('koa-router');

const api = new Router();
const board = require('./board');

api.use('/board', board.routes());

module.exports = api;