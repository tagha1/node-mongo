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
    return res.send(doc);
  }, (err)=>{
    return res.status(400).send(err);
  })
});

app.listen(3500, () => {
  console.log('Localhost started to run localhost:3500')
})



// // let newTodo = new Todo({
// //   text: 'make food'
// // });
// //
// // newTodo.save().then((doc) => {
// //   console.log('save todo', doc);
// // }, (err) =>{
// //   return console.log('Unable to save todo');
// // });
//
// // let addTodo = new Todo({
// //   text: 'test test'
// // });
// //
// // addTodo.save().then((doc) => {
// //   console.log(JSON.stringify(doc, undefined, 2));
// // }, (err) =>{
// //   return console.log(`Unable to save todo: ${err}`);
// // });
//
// let enterEmail = new User({
//   email: 'testemail'
// });
//
// enterEmail.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) =>{
//    return console.log(`Unable to save User: ${err}`);
// });
