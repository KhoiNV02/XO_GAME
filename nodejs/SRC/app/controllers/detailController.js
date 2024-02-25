const Course = require('../models/CourseModel');
const {mongooseToObject}=require('../../ultil/mongoose');
class detailController {
  //[get]/news

  show(req, res,next) {
    Course.findOne({slug:req.params.slug})
    .then(course=>{
      res.render('./detail/detail',{
        course:mongooseToObject(course)
      });
    })
    .catch(error=>next(error));
  }

  create(req,res,next)
  {
    res.render('detail/create');
  }

  store(req,res,next)
  {
    const formData=req.body;
    formData.image='https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png';
    const course=new Course(formData);
    course.save()
    .then(()=>{
      res.redirect('/');})
    .catch((error)=>{
     res.send(error);
    })
    }

    edit(req,res,next)
    {
    Course.findById(req.params.id)
    .then(course=>res.render('detail/edit',{
      course:mongooseToObject(course)
    }))
    .catch(error=>next(error))
    }

    update(req,res,next)
    {
      Course.updateOne({_id:req.params.id},req.body)
      .then(()=>res.redirect('/me/store/courses'))
      .catch(error=>next(error))
    }
    
    delete(req,res,next)
    {
      Course.deleteOne({_id:req.params.id})
      .then(()=>res.redirect('back'))
      .catch(error=>next(error))
    }
}
module.exports = new detailController();
