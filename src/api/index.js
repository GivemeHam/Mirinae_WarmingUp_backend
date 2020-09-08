const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const board = require('./board');

api.use('/auth', auth.routes());
api.use('/board', board.routes());

module.exports = api;