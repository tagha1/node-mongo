const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5ae362c74915fa521d4fa164';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// };

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('No Id');
//   }
//   console.log('Todo Find By ID', todo);
// }).catch((err) => console.log(err));

let userID = '5ae21b53672769406d9e7641';

if(!ObjectID.isValid(userID)){
  console.log('User ID not Found');
}

User.findById(userID).then((user) => {
  if(!user) {
    return console.log('No Users Found');
  }
  console.log(JSON.stringify(user,undefined, 2));
}).catch((err) => console.log(err));
