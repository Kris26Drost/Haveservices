const Haveservice = require('../models/haveservices.model') // mongoose-schema

const express = require('express')
const router = express.Router()

//MULTER til håndtering af filer fx images
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            // 2 eksempler
            // første
            // cb(null, Date.now() + '-' + file.originalname)
            // anden
            cb(null, file.originalname)
        }
    })
})

// GET ALL til endpoint haveservice
router.get('/', async (req, res) => {

    console.log("route haveservice GET")

    try {
        let haveservices = await Haveservice.find()
        return res.status(200).json(haveservices)

    } catch { error } {
        return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
    }
})


// GET BY ID til endpoint haveservice
router.get('/:id', async (req, res) => {

    console.log("route haveservice GET BY ID")
    try {
        let product = await Haveservice.findById(req.params.id)
        if (haveservice == null) return res.status(404).json({ message: "Der findes ike en 'haveservice' som matcher den medsendte id" })

        return res.status(200).json(haveservice)

    } catch (error) {
        return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
    }

})


// POST til endpoint haveservice
router.post('/', upload.single("image"), async (req, res) => {

    // Skal kunne modtage fil/image
    console.log("route product POST")

    try {
        let haveservice = new Haveservice(req.body)
        haveservice.image = req.file.filename;

        await haveservice.save()
        return res.status(201).json({ message: 'Ny er oprettet', created: haveservice })

    } catch (error) {
        return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
    }

})


// PUT til endpoint haveservice - https://mongoosejs.com/docs/validation.html#update-validators
router.put('/:id', upload.single("image"), async (req, res) => {

    console.log("route haveservice PUT")

    try {
        // håndter at der muligvis IKKE skal rettes i billedet (else-delen)
        if(req.file) {
            req.body.image = req.file.filename
        } 
        
        // else {
        //     let p = await Haveservice.findById(req.params.id)
        //     req.body.image = p.image //bevar det nuværende imagenavn/image
        // }

        let haveservice = await Haveservice.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (haveservice == null) return res.status(404).json({ message: "Data kunne ikke findes/rettes" })
        return res.status(201).json({ message: 'Der er rettet', updated: haveservice })

    } catch (error) {
        return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
    }


})


// DELETE til endpoint haveservice
router.delete('/:id', async (req, res) => {

    console.log("route haveservice DELETE")

    try {
        let haveservice = await Haveservice.findByIdAndDelete(req.params.id)

        if (haveservice == null) return res.status(404).json({ message: "Data kunne ikke findes/slettes" })

        return res.status(200).json({ message: "Haveservicet er slettet" })

    } catch (error) {
        return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
    }
})


module.exports = router;