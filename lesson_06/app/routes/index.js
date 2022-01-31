const articleRoute = require('./article');


exports.initializeRoutes = (app) => {
    app.use(articleRoute);
}



