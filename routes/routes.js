const viewController = require('../app/controllers/viewController')();
const queryController = require('../app/controllers/queryController')();

const initRoutes = (app) => {
    app.get('/', viewController.index)
    app.get('/about', viewController.about)
    app.get('/skills', viewController.skills)
    app.get('/work', viewController.work)
    app.get('/contact', viewController.contact)
    app.get('/blogs', viewController.blogs)
    app.get('/blogs/:id', viewController.eachBlog)
    app.get('/post-blog', viewController.postBlog)
    app.post('/contact/submit-query', queryController.submitQuery)
    app.post('/post-blog', queryController.postBlog)
}

module.exports = initRoutes;