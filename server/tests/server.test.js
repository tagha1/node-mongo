const expect = require('expect');
const request = require('supertest');
const {ObjectID} =  require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first test'
},{
  _id: new ObjectID(),
  text: 'secound test',
  completed: true,
  completedAt: 3333333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create new todo', (done) => {
    let text = 'Test for todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err){
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done()
        }).catch((err) => done(err));
      });
  });

  it('should not create todo invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err){
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done()
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/1234abcd')
      .expect(404)
      .end(done)
  });
});

describe('Delete /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toBeFalsy();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .delete('/todos/1234abcd')
      .expect(404)
      .end(done)
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = 'Text is updated';


    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: true
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBeTruthy();
      expect(res.body.todo.completedAt).toBeTruthy();
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = 'Text is updated';


    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBeFalsy();
      expect(res.body.todo.completedAt).toBeNull();
    })
    .end(done);
  })
});
