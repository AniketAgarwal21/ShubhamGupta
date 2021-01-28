const blogs = require('../../blogs.json')

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
        blogs(req, res){
            res.render('blogs', { blogs });
        },
        eachBlog(req, res){
            // console.log(req.params)
            const blogId = req.params.id;
            const blog = blogs.find(blog => blog._id == blogId);

            // console.log(blog)
            return res.render('eachBlog', { blog });
        }
    }
}

module.exports = viewController;