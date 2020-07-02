const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const toDoModel = require('../models/toDoModel.js');

mongoose.connect('', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// http://localhost:3000/todo
// view all to dos - get 
// GET http://localhost:3000/todo
router.get('/', async (req, res) => {
  console.log('GET http://localhost:3000/todo')
  const result = await toDoModel.find();
  if (result.length === 0) {
    return res.status(400).json({
      error: 'No results found'
    });
  };

  res.status(200).json({
    todos: result
  });
})
// add a todo - post
// POST http://localhost:3000/todo
router.post('/', async (req, res) => {
  console.log('POST http://localhost:3000/todo')
  console.log(req.body)
  // front end will pass req.body = {title: '', date: '', description: '', boolean: false}
  if (req.body.title === '' || req.body.descripton === '') {
    return res.status(400).json({
      error: 'Please fill out all fields'
    })
  }

  const result = await toDoModel.create(req.body);
  res.status(200).json(result)
})

// get one specific todo - get
// GET http://localhost:3000/todo/:id
router.get('/:id', async (req, res) => {
  console.log('GET http://localhost:3000/todo/:id')
  try {
    const result = await toDoModel.findById(req.params.id)
    if (!result) {
      return res.status(400).json({
        error: 'No results found'
      });
    };

    res.status(200).json({
      todo: result
    });
  } catch (err) {
    return res.status(400).json({
      error: 'No todo found with that id'
    });
  }
})

// modify a todo - put/patch
// PUT/PATCH http://localhost:3000/todo/:id
router.put('/:id', async (req, res) => {
  console.log('PUT / PATCH http: //localhost:3000/todo/:id')
  try {
    const result = await toDoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!result) {
      return res.status(400).json({
        error: 'No results found'
      });
    };

    res.status(200).json({
      todo: result
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Could not replace that todo'
    });
  }
})

// delete a todo - delete
// DELETE http://localhost:3000/todo/:id
router.delete('/:id', async (req, res) => {
  console.log('DELETE http://localhost:3000/todo/:id')
  try {
    const result = await toDoModel.findOneAndDelete({
      _id: req.params.id
    })
    if (!result) {
      return res.status(400).json({
        error: 'No results found'
      });
    };

    res.status(200).json({
      message: 'DELETED FOREVER!'
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Could not delete todo with that id'
    });
  }
})

module.exports = router;