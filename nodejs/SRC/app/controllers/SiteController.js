const Course = require('../models/CourseModel');
const {mutipleMongooseToObject}=require('../../ultil/mongoose');
class SiteController {
  //[get]/news
  index(req, res) {
   Course.find({})
   .then(courses =>
    {
      res.render('home',{
        courses:mutipleMongooseToObject(courses)
      });
    })
   .catch(error => next(error));
    // res.render('home');
  }
}
module.exports = new SiteController();
