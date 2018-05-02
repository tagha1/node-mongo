const {ObjectID} =  require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: 'userOne@test.io',
  password: 'userPassOne',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoID,
  email: 'userTwo@test.io',
  password: 'userPassTwo',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, access: 'auth'}, 'abc123').toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: 'first test',
  _creator: userOneID
},{
  _id: new ObjectID(),
  text: 'secound test',
  completed: true,
  completedAt: 3333333,
  _creator: userTwoID
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers}
