const mongoose = require('mongoose');
const { Schema } = mongoose;

//댓글
const Comment = new Schema({
    board_key: String,
    content: String,
    writer: { Writer },
    createAt: {
        type: Date,
        default: Date.now
    },
    delete_chk: {
        type: String,
        defalut: "F"
    }
});


module.exports = mongoose.model('Comment', Comment);