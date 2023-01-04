const mongoose= require('mongoose');
// const env=require('./environment')
// const dbAddress=process.env.MONGO_URI || store_api_db;
mongoose.set('useNewUrlParser', true);
// connect to the database
main().catch(err => console.log(err)); //from documentation geting started
async function main() {
  // await mongoose.connect('mongodb://localhost/codeial_dev_db'); //removed for using env
  await mongoose.connect(`mongodb://localhost/store_api_db`); //used backtick instead of quotes
  
  
}

mongoose.connect(`mongodb://localhost/store_api_db`).catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});
module.exports=db;