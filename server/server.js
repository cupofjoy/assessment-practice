const express = require('express');
const path = require('path');
const app = express();

const toDoRoute = require('./routes/toDoRoute.js');


// global
app.use(express.json());


// toDo route
app.use('/toDo', toDoRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))