const Joi = require('joi');
const Board = require('models/board');
const { Types: { objectId } } = require('mongoose');

exports.findAllBoard = async (ctx) => {
    let boards;

    try {
        board = await board.find()
            .exec();
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = boards;
}

