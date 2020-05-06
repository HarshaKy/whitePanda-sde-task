const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const path = require('path')
const hbs = require('hbs')

let {mongoose} = require('./db/mongoose')
let {Car} = require('./models/cars')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

let app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Index"
    })
})

app.get('/addCars', (req, res) => {
    res.render('addCars', {
        title: "Add Cars",
    })
})

app.get('/cars', (req, res) => {
    Car.find().then((cars) => {
        res.send(cars)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.post('/cars', (req, res) => {
    let body = _.pick(req.body, ['regNo', 'make', 'model', 'seatingCapacity', 'rentPerDay'])
    let car = new Car(body)

    car.save().then((doc) => {
        res.render('addCars', {
            title: "Add Cars",
            text: "Added Car",
            car: doc
        })
    }, (e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})