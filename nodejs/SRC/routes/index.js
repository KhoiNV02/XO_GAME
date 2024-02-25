//trang điều phối chung đến các trang 
const newsRouter = require('./views');
const sitesRouter = require('./site');
const detailRouter = require('./detail');
const meRouter = require('./me');
function route(app) {
    app.use('/views', newsRouter);
    app.use('/me', meRouter);
    app.use('/detail', detailRouter);
    app.use('/', sitesRouter);
}
module.exports = route;
