const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
var cors = require("cors");
const router = require("./route");

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use(router);


app.use('/', express.static(path.join(__dirname, 'www')));
app.use((req, res, next) => {
  console.log(req.path)
  res.sendFile(path.join(__dirname, '/www/index.html'));
})

app.use((req, res, next) => {
  console.log(req.path);
  res.status(404).send('<h1>Page not found</h1>');
})


const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));