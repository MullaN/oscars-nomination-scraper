require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(
    cors({
      origin: ["http://localhost:3000", "http://192.168.50.119:3000", "https://oscars-checklist.web.app"]
    })
)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/movies', require('./routes/api/movies'))
app.use('/api/shorts', require('./routes/api/shorts'))
app.use('/api/saved', require('./routes/api/saved'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))