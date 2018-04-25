const { MongoClient } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB error!');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   return console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   return console.log('Unable to fetch Todos', err);
  // });

  db.collection('Users').find({name: 'Ahmed'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  },(err) => {
    return console.log('Unable to fetch Users', err);
  });

  db.collection('Users').find().count().then((count) => {
    console.log(`Users count: ${count}`);
  },(err) => {
    return console.log('Unable to fetch Users', err);
  });

  client.close();
});
