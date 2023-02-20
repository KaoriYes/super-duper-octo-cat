// index.js
const express = require('express');
const app = express();
const chalk = require('chalk');
const Handlebars = require('handlebars');
const exphbs = require('handlebars')
const PORT = process.env.PORT || 420;

// // Set Handlebars middelware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// Set handlears routes
app.get('/', function(req, res){
    res.render('home');
});

// Set static folder
// app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Sever listening on port ' + PORT) );

