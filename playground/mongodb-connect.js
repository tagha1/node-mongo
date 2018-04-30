const { MongoClient } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB error!');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'homedepot',
  //   completed: false
  // }, (err, res)=> {
  //   if(err){
  //     return console.log('Unable to insert TODO', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Talha',
    age: 30,
    location: 'Austin'
  }, (err, res) => {
    if(err) {
      return console.log('Unable to insert Users', err);
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  });

  client.close();
});
