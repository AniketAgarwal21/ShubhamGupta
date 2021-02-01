const Query = require('../models/queryModel')
const Blogs = require('../models/blogModel')
const moment = require('moment');

const queryController = () => {
    return {
        submitQuery(req, res) {
            // console.log(req.body)
            const {
                name,
                email,
                message
            } = req.body;
            if (!name || !email || !message) {
                req.flash('error', 'All fields are required!')
                return res.redirect('/contact')
            }
            const query = new Query({
                name,
                email,
                message
            });
            query.save()
                .then(query => {
                    req.flash('error', 'Your query was submitted!')
                    return res.redirect("/contact")
                })
                .catch(() => {
                    req.flash('error', 'Something went wrong!')
                    return res.redirect("/contact")
                })
        },
        postBlog(req, res) {
            console.log(req.body)
            const {
                title,
                content,
                secret_key
            } = req.body;
            if (!title || !content || !secret_key) {
                req.flash('error', 'All fields are required!')
                return res.redirect('/post-blog')
            }
            if (secret_key == process.env.POST_BLOG_SECRET_KEY) {
                const blog = new Blogs({
                    title,
                    content,
                    date: new Date()
                });
                blog.save()
                    .then(blog => {
                        req.flash('error', 'Blog Created Successfully')
                        res.redirect('/post-blogs')
                        // console.log("saved")
                    })
                    .catch(() => {
                        req.flash('error', 'Some error occured!')
                        res.redirect('/post-blog')
                    })
            } else {
                req.flash('error', 'Wrong Secret Key!')
                return res.redirect("/post-blog")
            }
        }
    }
}

module.exports = queryController;