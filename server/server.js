const express = require('express');
const path = require('path');
const app = express();

const toDoRoute = require('./routes/toDoRoute.js');


// global
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());


// toDo route
app.use('/toDo', toDoRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.js'));
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))