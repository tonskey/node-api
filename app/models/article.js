const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

const Article = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Image],
    modified: { type: Date, default: Date.now }
});

Article.path('title').validate(function(v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Article', Article);
