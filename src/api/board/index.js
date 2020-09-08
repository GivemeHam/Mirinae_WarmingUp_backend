const Router = require('koa-router');
const board = new Router();
const boardCtrl = require('./board.controller');

//글 작성
board.post('/register', boardCtrl.createBoard);

module.exports = board;