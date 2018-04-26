const express = require('express');
const bodyParser = require('body-parser');

const { Mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc)=>{
   res.send(doc);
  }, (err)=>{
   res.status(400).send(err);
  })
});

app.get('/todos', (req, res) => (
  Todo.find().then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  })
));

app.listen(3500, () => {
  console.log('Localhost started to run port:3500')
});

module.exports = {app};
