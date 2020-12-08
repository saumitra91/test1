const parentRoutes = require('./parent')
const childRoutes = require('./child')

const appRouter = (app) => {

  app.get('/', (req, res) => {
    res.send('welcome')
  })

  parentRoutes(app)
  childRoutes(app)
};

module.exports = appRouter;