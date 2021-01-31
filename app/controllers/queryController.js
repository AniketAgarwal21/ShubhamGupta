const Query = require('../models/queryModel')
const Blogs = require('../models/blogModel')
const moment = require('moment');

const queryController = () => {
    return {
        submitQuery(req, res){
            // console.log(req.body)
            const { name, email, message } = req.body;
            if(!name || !email || !message){
                return res.redirect('/contact')
            }
            const query = new Query ({
                name, email, message
            });
            query.save()
            .then(query => {
                return res.redirect("/contact")
            })
            .catch(() => {
                return res.redirect("/contact")
            })
        },
        postBlog(req, res){
            console.log(req.body)
            const { title, content, secret_key } = req.body;
            if(!title || !content || !secret_key){
                return res.redirect('/post-blog')
            }
            if(secret_key == process.env.POST_BLOG_SECRET_KEY){
                const blog = new Blogs ({
                    title,
                    content,
                    date: new Date()
                });
                blog.save()
                .then(blog => {
                    res.redirect('/blogs')
                    // console.log("saved")
                })
                .catch(() => {
                    res.redirect('/post-blog')
                })
            } else {
                return res.redirect("/post-blog")
            }
        }
    }
}

module.exports = queryController;