const viewController = require('../app/controllers/viewController')();

const initRoutes = (app) => {
    app.get('/', viewController.index)
    app.get('/about', viewController.about)
    app.get('/skills', viewController.skills)
    app.get('/work', viewController.work)
    app.get('/contact', viewController.contact)
    app.get('/blogs', viewController.blogs)
    app.get('/blogs/:id', viewController.eachBlog)
}

module.exports = initRoutes;