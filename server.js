const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()


// Mongo
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true, })
const db = mongoose.connection
db.on('error', (err) => console.log("FEJL" + err))
db.once('open', () => console.log("Databasen kører!"))

// APP indstillinger
// const formData = require('express-form-data')
// app.use(formData.parse())                      // multipart formdata
app.use(express.json())                           // json
app.use(express.urlencoded({ extended: true }))   // urlencoded
app.use(cors({ origin: true }))                   // cors - cross origin resource sharing
app.use(express.static('public'))                 // hvorfra statiske filer må hendes


// ROUTES
app.get('/', async (req, res) => {

    console.log("Serveren svarer")
    return res.status(200).json({ message: "Velkommen til serveren" })
})

// Endpoints
app.use('/haveservices', require('./routes/haveservices.routes'))


// No match
app.get('*', async (req, res) => {
    res.status(404).json({ message: "Siden findes ikke - desværre - prøv fx http://localhost:" + process.env.PORT })
})

// LISTEN 
app.listen(process.env.PORT, () => console.log("Server startet - lytter på port: " + process.env.PORT))