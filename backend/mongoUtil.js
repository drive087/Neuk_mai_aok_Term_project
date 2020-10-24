`use strict`;

const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

// ENV configuration
dotenv.config({
  path: './config.env'
});

var user_database

connection = (callback) => {
  const uri = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
  const client = new MongoClient(uri, { keepAlive: 1,useUnifiedTopology: true,useNewUrlParser: true });
  client.connect((err,client) => {
      console.log("Successful connect to database")
      // perform actions on the collection object
      user_database = client.db('User')
      return callback(err)
  })     
}

module.exports.connectToServer = connection
module.exports.getUserDb = ()=>{return user_database}
