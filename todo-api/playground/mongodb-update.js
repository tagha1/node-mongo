const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB error!');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ae0cbf23a9f24658d4ab6d7')
  // },{
  //   $set: { // need to add update operator in mongodb webpage
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res);
  // });
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ae0baab709b95354dd826bf')
  },{
    $set: { // need to add update operator in mongodb webpage
      name: 'Talha'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  });

   client.close();
});
