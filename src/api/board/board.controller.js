const Joi = require('joi');
const Board = require('models/board');
const { Types: { ObjectId } } = require('mongoose');

//게시글 작성
exports.createBoard = async (ctx) => {


    const {
        title,
        writer,
        contents
    } = ctx.request.body;

    const board = new Board({
        title,
        writer,
        contents,
        //  date
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
            .bodysort({ _id: -1 })
            .exec();
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = boards;
}
//무한스크롤
exports.findBoardForInfiniteScroll = async (ctx) => {
    console.log("tset");
    const { skip_value, limit_value } = ctx.params;
    console.log(skip_value + " //// " + limit_value);
    let boards;

    try {
        boards = await Board.find()
            .sort({ _id: -1 })
            .skip(Number(skip_value))       //몇번쨰부터
            .limit(Number(limit_value))     //몇개
            .exec()
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = boards;
}

//해당 글 불러오기
exports.findBoardById = async (ctx) => {
    const { id } = ctx.params;

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

exports.deleteBoardById = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Board.findByIdAndRemove(id).exec();
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }
    ctx.body = 'delete success';
    ctx.status = 204;   // no content
};

exports.updateBoardById = async (ctx) => {
    const { id } = ctx.params;

    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }

    let board;

    try {
        board = await Board.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        });
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = board;
}