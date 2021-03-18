const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/movies', require('./routes/api/movies'))
app.use('/api/shorts', require('./routes/api/shorts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))