const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
require('dotenv').config();
console.log(process.env);

const host = 'localhost';
const port = 420;

const { MongoClient, ServerApiVersion } = require('mongodb');

const password = process.env.DB_Key;

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


// app.get('/about', (req, res) => {
//   res.send('About Page');
// });
// app.get('/contact', (req, res) => {
//   res.send('Contact Page');
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.locals.title = 'Homepage';
  res.render('index.ejs');
});

app.get('/form', (req, res) => {
  res.locals.title = 'Form';
  res.render('form.ejs');
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
  const uri = 'mongodb+srv://quintenkok:' + password + '@cluster0.bpcqphd.mongodb.net/?retryWrites=true&w=majority'
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





