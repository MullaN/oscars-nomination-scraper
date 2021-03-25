const express = require('express')
const router = express.Router()
const Saved = require('../../models/saved')

router.get('/:id', async (req, res) => {
    try{
        const saved = await Saved.findById(req.params.id)
        res.json(saved)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const saved = new Saved({
        movies: req.body.movies,
        shorts: req.body.shorts
    })
    try{
        const newSaved = await saved.save()
        res.status(201).json(newSaved)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const saved = await Saved.findById(req.params.id)
        saved.movies = req.body.movies
        saved.shorts = req.body.shorts
        saved.save()
        res.json(saved)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router