const Blogs = require('../models/blogModel')
const moment = require('moment');
// const blogs = require('../../blogs.json')


const viewController = () => {
    return {
        index(req, res){
            res.render('index');
        },
        about(req, res){
            res.render('about');
        },
        skills(req, res){
            res.render('skills');
        },
        work(req, res){
            res.render('work');
        },
        contact(req, res){
            res.render('contact');
        },
        async blogs(req, res){
            const blogs = await Blogs.find({}).sort({date: -1}); 
            // console.log(blogs)
            res.render('blogs', { moment, blogs });
        },
        async eachBlog(req, res){
            // console.log(req.params)
            const blogId = req.params.id;
            const blog = await Blogs.findById(blogId).exec();
            // console.log(blog.title)
            return res.render('eachBlog', { moment, blog });
        },
        postBlog(req, res){
            res.render("postBlog")
        }
    }
}

module.exports = viewController;