const mongoose = require('mongoose');
const { Schema } = mongoose;



//게시글
const Board = new Schema({
    title: String,
    contents: String,
    writer: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    delete_chk: {
        type: String,
        defalut: "F"
    }
});

Board.statics.boardRegister = function ({ title, writer, contents }) {
    const board = new this({
        title,
        writer,
        contents
    });
    return board.save();
};

module.exports = mongoose.model('Board', Board);