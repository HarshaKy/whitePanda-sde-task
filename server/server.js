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

app.use(bodyParser.json())
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
        if (cars.length === 0) {
            res.send('No cars registered')
        } else {
            res.send(cars)
        }
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/bookNewCar', (req, res) => {
    Car.find().then((cars) => {
        if (cars.length === 0) {
            res.render('bookCar', {
                title: "Book Car",
                text: "No cars registered. Register new cars to book"
            })
        } else {
            res.render('bookCar', {
                title: "Book Car",
                text: cars
            })
        }
    })
})

app.post('/cars', (req, res) => {
    let body = _.pick(req.body, ['regNo', 'make', 'model', 'seatingCapacity', 'rentPerDay', 'bookings'])
    let car = new Car(body)

    console.log(body)

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

app.post('/bookCar', (req, res) => {
    let body = _.pick(req.body, ['customerName', 'customerPhNo', 'issueDate', 'returnDate'])
    let regNo = req.body.regNo

    console.log(body)

    Car.findOneAndUpdate({"regNo": regNo}, {$push: { bookings: body }}, {new: true}).then((car) => {
        res.render('bookCar', {
            title: "Book Car",
            text: "Car Booked Successfully"
        })
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})