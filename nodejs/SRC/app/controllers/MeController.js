const Course = require('../models/CourseModel');
const {mongooseToObject, mutipleMongooseToObject}=require('../../ultil/mongoose');
class MeController {
  //[get]/news

  storeCourses(req, res) {
   Course.find({})
   .then(courses=>res.render('me/store_course',{
    courses:mutipleMongooseToObject(courses)
   }))
   .catch((error)=>next(error))
  }



}
module.exports = new MeController();
