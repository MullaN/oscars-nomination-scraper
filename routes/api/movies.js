const express = require('express')
const router = express.Router()
const {movieData} = require('../../oscar-data')

// Get all movies
router.get('/' ,(req, res) => {
    res.json(movieData)
})

// Get single movie
router.get('/:id' ,(req, res) => {
    const found = movieData.some(movie => movie.id === parseInt(req.params.id))
    if (found){
        res.json(movieData.filter(movie => movie.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No movie with the id of ${req.params.id}`})
    }
})

module.exports = router