const { MongoClient } = require('mongodb');



let dbConnection;
const uri = "mongodb+srv://Serhii:NDqcfarzp3fqDYIp@cluster0.vxtbj.mongodb.net/messager?retryWrites=true&w=majority";

module.exports = {
   connectToDB : (callBack) => {
   MongoClient.connect('mongodb+srv://Serhii:NDqcfarzp3fqDYIp@cluster0.vxtbj.mongodb.net/messager?retryWrites=true&w=majority')
   .then(client => {
    dbConnection = client.db("messager");
    return callBack();
   })
   .catch(error => {
       console.log(error)
       return callBack(error);
   })
   },
   getDB : () => dbConnection,
}

