const express = require('express')
const app = express()

const bookRoute = express.Router()
let Book = require('../models/Book')

// Add book
bookRoute.route('/add-book').post((req, res, next) => {
  Book.create(req.body, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

// Get all books
bookRoute.route('/').get((req, res) => {
  Book.find((err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

// Get book
bookRoute.route('/read-book/:id').get((req, res, next) => {
  Book.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

// Update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, data) => {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log('Book updated successfully!')
      res.json(data)
    }
  })
})

// Delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = bookRoute