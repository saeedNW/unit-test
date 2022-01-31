process.env.NODE_ENV = "test"

const should = require("chai").should();
const request = require('supertest');

const app = require("../app");
const {DBConnection, close} = require('../config/db');
const Article = require('../app/models/article');
const chai = require("chai");

describe("API test: database connection", () => {
    it('check connection', (done) => {
        DBConnection()
            .then(() => done())
            .catch((err) => done(err));
    });
})

describe('Article API Routes test', () => {
    before("open database connection", (done) => {
        DBConnection()
            .then(() => done())
            .catch((err) => done(err));
    })

    after("close database connection", (done) => {
        close()
            .then(() => done())
            .catch((err) => done(err));
    })

    const dataArticle = {
        title: 'article one',
        author: 'Saeed Noroozi',
        body: 'this is article one',
        tags: 'article1,article2'
    }

    describe('/POST article', () => {
        it('it should not POST a article without title field', (done) => {
            const article = {
                author: 'Saeed Noroozi',
                body: 'this is article one',
                tags: 'article1,article2'
            }

            request(app).post('/api/article')
                .send(article)
                .then((res) => {
                    res.statusCode.should.be.eql(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('title');
                    res.body.errors.title.should.have.property('kind').eql('required');
                    done();
                })
                .catch((err) => done(err));
        });

        it('it should POST a article', (done) => {
            request(app).post('/api/article')
                .send(dataArticle)
                .then((res) => {
                    res.statusCode.should.be.eql(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Article successfully added!');
                    res.body.article.should.have.property('title');
                    res.body.article.should.have.property('author');
                    res.body.article.should.have.property('body');
                    res.body.article.should.have.property('tags');
                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe('/GET article', () => {
        it('it should GET all the articles', (done) => {
            request(app).get('/api/article')
                .then((res) => {
                    res.statusCode.should.be.eql(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    describe('/GET/:id article', () => {
        it('it should GET a article by the given id', (done) => {
            const article = new Article(dataArticle);

            article.save()
                .then((article) => {
                    request(app).get(`/api/article/${article.id}`)
                        .then((res) => {
                            res.statusCode.should.be.eql(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title');
                            res.body.should.have.property('author');
                            res.body.should.have.property('body');
                            res.body.should.have.property('tags');
                            res.body.should.have.property('_id').eql(article.id);
                            done()
                        })
                        .catch((err) => done(err));

                })
                .catch((err) => done(err));
        });
    });

    describe('/PUT/:id article', () => {
        it('it should UPDATE a article given the id', done => {
            let article = new Article(dataArticle);

            article.save()
                .then((article) => {
                    request(app).put(`/api/article/${article.id}`)
                        .send({title: 'article two', author: 'Ahmadi'})
                        .then((res) => {
                            res.statusCode.should.be.eql(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Article updated!');
                            res.body.result.should.have.property('title').eql('article two');
                            done()
                        })
                        .catch((err) => done(err));

                })
                .catch((err) => done(err));
        });
    });

    describe('/DELETE/:id article', () => {
        it('it should DELETE a article given the id', done => {
            let article = new Article(dataArticle);

            article.save()
                .then((article) => {
                    request(app).delete(`/api/article/${article.id}`)
                        .then((res) => {
                            res.statusCode.should.be.eql(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Article successfully deleted!');
                            res.body.result.should.have.property('deletedCount').eql(1);
                            done()
                        })
                        .catch((err) => done(err));

                })
                .catch((err) => done(err));
        });
    });
});