const Router = require('koa-router');
const board = new Router();
const boardCtrl = require('./board.controller');

//글 작성
board.post('/register', boardCtrl.createBoard);
board.get('/boardList', boardCtrl.findAllBoard);
board.get('/boardView/:id', boardCtrl.findBoardById);
board.delete('/boardDelete/:id', boardCtrl.deleteBoardById);
board.patch('/boardUpdate/:id', boardCtrl.updateBoardById);
board.get('/findBoardForInfiniteScroll/:skip_value/:limit_value', boardCtrl.findBoardForInfiniteScroll);
module.exports = board;