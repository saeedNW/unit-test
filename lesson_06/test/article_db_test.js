process.env.NODE_ENV = "test"

const should = require("chai").should();


const {DBConnection, close} = require('../config/db')
const Article = require('../app/models/article');

describe("database test: database connection", () => {
    it('check connection', (done) => {
        DBConnection()
            .then(() => done())
            .catch((err) => done(err));
    });
})

describe('database article collection tests', () => {
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


    it('save a article', async () => {
        const article = await Article.create(dataArticle);

        article.should.be.a('object');
        article.should.have.property('title').to.be.equal('article one');
        article.should.have.property('author').to.be.equal('Saeed Noroozi');
        article.should.have.property('body').to.be.equal('this is article one');
        article.should.have.property('tags').to.be.equal('article1,article2');
    });

    it('find all articles', async () => {
        const articles = await Article.find({})

        articles.should.be.a('array');
        articles.length.should.be.eql(1);
    });

    it('find an article', async () => {
        const article = await Article.findOne({title: dataArticle.title});

        article.title.should.be.eql(dataArticle.title);
        article.body.should.be.eql(dataArticle.body);
        article.author.should.be.eql(dataArticle.author);
        article.tags.should.be.eql(dataArticle.tags);
    });

    it('update a article', async () => {
        await Article.findOneAndUpdate({title: dataArticle.title}, {'title': 'article two'});

        const article = await Article.findOne({title: 'article two'});

        article.should.be.a('object');
        article.should.have.property('title');
        article.title.should.be.eql('article two');
    });

    it('remove one article', async () => {
        const result = await Article.deleteOne({title: 'article two'});

        result.should.have.property('deletedCount');
        result.deletedCount.should.be.eql(1);

        const findArticle = await Article.find({title: 'article two'});

        findArticle.should.be.a('array');
        findArticle.length.should.be.eql(0);
    })


});