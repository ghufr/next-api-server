const data = require('../controllers/todoController')

module.exports = (app) => {
  app.get('/api/todos', data.get)
  app.post('/api/todos', data.post)
}