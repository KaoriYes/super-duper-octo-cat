const express = require('express');
const app = express();
const chalk = require("chalk");

// console.log(chalk.blue('Hello world!'));
// app.get("/", onHome).listen(420, console.log((chalk.backgroundColorNames("yuh"))));
// function onHome(req, rest){
//   rest.send("Jhaallo")
// }
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})