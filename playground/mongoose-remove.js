const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(`All data removed ${res}`);
// });

Todo.findByIdAndRemove('5ae75593f9613d657dd44be7').then((todo) => {
  console.log(`Removed: ${todo}`);
})
