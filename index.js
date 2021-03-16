const express = require('express')
const path = require('path')
const oscarData = require('./oscar-data')

const app = express()

// Get all movies
app.get('/api/movies', (req, res) => {
    res.json(oscarData)
})

// Get single movie
app.get('/api/movies/:id', (req, res) => {
    const found = oscarData.some(movie => movie.id === parseInt(req.params.id))
    if (found){
        res.json(oscarData.filter(movie => movie.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No movie with the id of ${req.params.id}`})
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))