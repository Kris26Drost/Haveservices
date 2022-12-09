const mongoose = require('mongoose')

const haveserviceSchema = new mongoose.Schema({


    image: {
        type: String,
        default: "photo-on-the-way.png"
    },
    title: {
        type: String,
        required: [true, 'Haveservicet skal udfyldes']
    },
    content: {
        type: String,
        required: [true, 'Haveservicets deskription skal udfyldes']
    }
    
})

module.exports = mongoose.model('Haveservice', haveserviceSchema, 'haveservices')
