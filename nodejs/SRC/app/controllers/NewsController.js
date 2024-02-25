class NewsController {
  //[get]/news
  index(req, res) {
    res.render('views');
  }
  show(req, res) {
    res.send('trang con ở trong nè');
  }
}
module.exports = new NewsController();
