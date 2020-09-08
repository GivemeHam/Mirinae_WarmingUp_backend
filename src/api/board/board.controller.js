const Joi = require('joi');
const Board = require('models/board');
const { Types: { objectId } } = require('mongoose');


//게시글 작성
exports.createBoard = async (ctx) => {
    console.log("createBoard");
    const {
        title,
        writer,
        contents
    } = ctx.request.body;

    const board = new Board({
        title,
        writer,
        contents
    });
    try {
        await board.save();
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = board;
}

//전체 불러오기
exports.findAllBoard = async (ctx) => {
    let boards;

    try {
        boards = await Board.find()
            .exec();
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = boards;
}

//해당 글 불러오기
exports.findBoardById = async (ctx) => {
    let board;

    try {
        board = await Board.findById(id).exec();
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
        return ctx.throw(500, e);
    }

    if (!board) {
        ctx.status = 404;
        ctx.body = { message: 'board not found' };
        return;
    }
    ctx.body = board;
}
