const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');

const host = 'localhost';
const port = 420;

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
  const name = req.body.name;
  const email = req.body.email;
    res.locals.title = 'Submitted';  
  res.send(`Name: ${name}, Email: ${email}`);
});

app.use(function(req, res){
  res.locals.title = 'Error 404';  
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(chalk.green(`Server is running on http://${host}:${port}`));
});
