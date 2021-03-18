const express = require('express')
const router = express.Router()
const cors = require('cors')
const {shortsData} = require('../../oscar-data')

const corsOptions = {
    origin: ['http://localhost:3000','http://192.168.50.119:3000'],
    optionsSuccessStatus: 200
}

// Get all movies
router.get('/', cors(corsOptions),(req, res) => {
    res.json(shortsData)
})

// Get single movie
router.get('/:id', cors(corsOptions),(req, res) => {
    const found = shortsData.some(movie => movie.id === parseInt(req.params.id))
    if (found){
        res.json(shortsData.filter(movie => movie.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No movie with the id of ${req.params.id}`})
    }
})

module.exports = router