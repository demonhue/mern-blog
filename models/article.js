const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
    author: {
        type: String,
        default: "default userid"
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: "default title"
    },
    body: {
        type: String,
        default: "default body"
    }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;