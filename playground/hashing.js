const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = '$2a$10$Tp5IOnhxO0f92eqPF4ZbruqtSK76tvXOQbepbpINqy/9pf2aK59o2';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})


// let data = {
//   id: 10
// }
//
// let token = jwt.sign(data, 'abc1222');
// console.log('token:', token);
//
// let decoded = jwt.verify(token, 'abc1222');
// console.log('decoded', decoded);

// let message = 'Im a user';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//   id: 4
// };
//
// let token = {
//   data,
//   hash : SHA256(JSON.stringify(data) + 'saltsecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'saltsecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do NOT trust!');
// }
