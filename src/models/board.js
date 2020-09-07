const mongoose = require('mongoose');
const { Schema } = mongoose;

//작성자
const Writer = new Schema({
    name: String,
    email: String
});


//게시글
const Board = new Schema({
    title: String,
    contents: String,
    writer: { Writer },
    createAt: {
        type: Date,
        default: Date.now
    },
    delete_chk: String
});
