const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const xss = require('xss');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();


const host = 'localhost';
const port = 420;

const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

const dburi = process.env.DB_uri;

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.locals.title = 'Homepage';
  res.locals.body = '';
  res.render('index.ejs');
});

app.get('/register', (req, res) => {
  res.locals.title = 'Register';
  res.locals.subtitle = '';
  res.render('register.ejs');


});

app.post('/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const secondpassword = req.body.confirm_password;
  const birthday = req.body.dob;
  const gender = req.body.gender;

  const {
    latitude,
    longitude
  } = req.body;

  connectDB();
  if (password !== secondpassword) {
    res.locals.subtitle = 'Password does NOT match';
    res.render('register.ejs');
  } else {
    res.locals.title = "Registratie voltooien";
    res.locals.name = name;
    res.locals.email = email;
    res.locals.dob = birthday;
    res.locals.gender = gender;
    res.render('submitted.ejs');

    const hashedpw = await bcrypt.hash(password, saltRounds);
    var userdata = {
      name: name,
      pwd: hashedpw,
      email: email,
      birthday: birthday,
      gender: gender,
      latitude: latitude,
      longtitude: longitude
    }
    db.collection('Users').insertOne(userdata, function (err, collection) {
      if (err) throw err;
      console.log('Record inserted Successfully');
    })

  }
});


app.post('/deleteuser', async (req, res) => {
  try {
    // Haal de naam van de te verwijderen gebruiker op uit de POST request
    const username = req.body.kaas.trim(); // use trim() to remove extra spaces
    console.log(`Deleting user with name: "${username}"`);

    // Verwijder de gebruiker met de opgegeven naam uit de "Users" collectie
    const result = await db.collection('Users').deleteOne({
      name: username
    });
    if (result.deletedCount === 0) {
      res.status(404).send('Gebruiker niet gevonden');
      return;
    }
    // Redirect terug naar de accountpagina
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Er is een fout opgetreden bij het verwijderen van de gebruiker');
  }
});




app.use(function (req, res) {
  res.locals.title = 'Error 404';
  res.status(404).render('404');
});


async function connectDB() {
  console.log('connecting')
  const uri = dburi;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    console.log('awaiting connection');
    await client.connect();
    console.log('connected!');
    db = client.db('Userdb');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//server configurations
app.listen(port, async () => {
  let databaseConnection = await connectDB();
  let theData = await db.collection('Users').find({
    age: 30
  }).toArray();
  console.log(theData);
});