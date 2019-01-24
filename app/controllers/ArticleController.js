const { Article } = require('../models');
const log = require('../log')(module);

const getAll = (req, res) => {
    Article.find()
        .then(articles => {
            res.json(articles);
        })
        .catch(e => {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, e.message);

            return res.json({
                error: 'Server error'
            });
        });
};

const create = (req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save().catch(err => {
        if (!err) {
            log.info('New article created with id: %s', article.id);
            return res.json({
                status: 'OK',
                article: article
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error(
                    'Internal error(%d): %s',
                    res.statusCode,
                    err.message
                );

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
};

const getOne = (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            if (!article) {
                res.statusCode = 404;

                return res.json({
                    error: 'Not found'
                });
            }
            return res.json({
                status: 'OK',
                article: article
            });
        })
        .catch(e => {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, e.message);

            return res.json({
                error: 'Server error'
            });
        });
};

const update = (req, res) => {
    const articleId = req.params.id;

    Article.findById(articleId)
        .then(article => {
            if (!article) {
                res.statusCode = 404;
                log.error('Article with id: %s Not Found', articleId);
                return res.json({
                    error: 'Not found'
                });
            }

            article.title = req.body.title;
            article.description = req.body.description;
            article.author = req.body.author;
            article.images = req.body.images;

            article
                .save()
                .then(() => {
                    log.info('Article with id: %s updated', article.id);
                    return res.json({
                        status: 'OK',
                        article: article
                    });
                })
                .catch(e => {
                    log.error(
                        'Internal error (%d): %s',
                        res.statusCode,
                        e.message
                    );
                    if (e.name === 'ValidationError') {
                        res.statusCode = 400;
                        return res.json({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;

                        return res.json({
                            error: 'Server error'
                        });
                    }
                });
        })
        .catch(e => {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, e.message);

            return res.json({
                error: 'Server error'
            });
        });
};

module.exports = {
    getAll,
    getOne,
    create,
    update
};
