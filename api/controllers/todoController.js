const Todo = require('../models/todoModel')

exports.get = (req, res) => {
  Todo.find().exec()
  .then((doc) => res.status(200).json(doc))
  .catch(() => res.sendStatus(404))
}

exports.post = (req, res) => {
  console.log(req.body)
  if(!req.body || !req.body.payload || !req.body.payload.title) return res.sendStatus(500)
  new Todo({
    title: req.body.payload.title
  })
  .save((err, doc) => {
    if(err) {
      return res.sendStatus(500)
    }
    res.status(200).json({ id: doc._id, title: doc.title })
  })
}