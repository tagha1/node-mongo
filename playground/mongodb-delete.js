const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB error!');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Meal Prep'}).then((res) => {
  //   console.log('res', res);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Meal Prep'}).then((res) => {
  //   console.log('res', res);
  // })

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log('res', res);
  // });

  // deleteMany USERS
  // db.collection('Users').deleteMany({name: 'Ahmed'}).then((res) => {
  //   console.log('res', res);
  // });

  // findOneAndDelete USERS
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5ae0babc4ae533354f3668d1')
  }).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  });

   client.close();
});
