const express = require('express');
const app = express();
const chalk = require("chalk");

const host = "localhost";
const port = 420;

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.get('/about', (req, res) => {
  res.send("About Page");
})
app.get('/contact', (req, res) => {
  res.send("Contact Page");
})

app.use(function(req, res){
  res.status(404).render('404', { path: 'Error'});
})

app.listen(port, () => {
  console.log(chalk.green(`Server is running on http://${host}:${port}`));
})

