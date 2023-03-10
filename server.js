const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
require('dotenv').config();


const host = 'localhost';
const port = 420;

const { MongoClient, ServerApiVersion } = require('mongodb');

const dburi = process.env.DB_uri;

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.locals.title = 'Homepage';
  res.locals.body = '';
  res.render('index.ejs');
});

app.get('/register', (req, res) => {
  res.locals.title = 'Register';
  res.render('register.ejs');
});

app.post('/submit', (req, res) => {
  const name = req.body. name;
  const email = req.body.email;
    res.locals.title = 'Submitted';  
  res.send(`Name: ${name}, Email: ${email}`);
});

app.use(function(req, res){
  res.locals.title = 'Error 404';  
  res.status(404).render('404');
});


async function connectDB(){ 
  console.log('connecting') 
  const uri = dburi;
  const client = new MongoClient(uri, {
   useNewUrlParser: true, useUnifiedTopology: true,
 });
  try { 
    console.log('awaiting connect'); 
  await client.connect(); 
  console.log('connected!');
   db = client.db('Userdb'); 
  }  
  catch (error) {
     console.error(error);
    throw error; 
  }
}

  //server configurations
  app.listen(port, async () => {
  console.log('Server started on port 1900');
  let databaseConnection = await connectDB();
  let theData = await db.collection('Users').find({}).toArray();
  console.log(theData);
});





