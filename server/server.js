require('./config/config'); //contains the config for mongodb

// import libs
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const path = require('path')
const hbs = require('hbs')

let {mongoose} = require('./db/mongoose')
let {Car} = require('./models/cars')

// set paths for folders that you want to serve up
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

let app = express()
const port = process.env.PORT || 3000;

// initialize the hbs view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// telling the app to recognize both raw json input and input from html
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirPath))

// index 
app.get('', (req, res) => {
    res.render('index', {
        title: "Index"
    })
})

// route for adding new cars
app.get('/addCars', (req, res) => {
    res.render('addCars', {
        title: "Add Cars",
    })
})

// route for booking new cars
app.get('/bookNewCar', (req, res) => {
    let text
    
    res.render('bookCar', {
        title: 'Book Car'
    })
})

// get request to fetch all cars
app.get('/cars', (req, res) => {
    Car.find().then((cars) => {
        if (cars.length === 0) {
            res.send( {err: 'No cars registered'} )
        } else {
            res.send(cars)
        }
    }, (e) => {
        res.status(400).send(e)
    })
})

// get request to fetch filtered results
app.get('/filteredResults', (req, res) => {
    let body = _.pick(req.query, ['make', 'model', 'seatingCapacity', 'rentPerDay', 'issueDateFilter', 'returnDateFilter'])


    let query = {

    }

    if(body.make){
        query['make'] = {'$regex': body.make, $options:'i'}
    }
    if (body.model) {
        query['model'] = {'$regex': body.model, $options:'i'}
    }
    if (body.seatingCapacity) {
        query['seatingCapacity'] = {$gte: body.seatingCapacity}
    }
    if (body.rentPerDay) {
        query['rentPerDay'] = {$lte: body.rentPerDay}
    }

    Car.find({ 
        $and:[
                query
            ] 
    }).then((cars) => {
        if (cars.length === 0) {
            res.send( {err: 'No cars found'} )
        } else {
            res.send(cars)
        }
    }, (e) => {
        res.status(400).send(e)
    })
})

// post request to add new cars
app.post('/cars', (req, res) => {
    let body = _.pick(req.body, ['regNo', 'make', 'model', 'seatingCapacity', 'rentPerDay', 'bookings'])
    let car = new Car(body)

    console.log(body)

    car.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

// post request that gets called when you book a car
app.post('/bookCar', (req, res) => {
    let body = _.pick(req.body, ['customerName', 'customerPhNo', 'issueDate', 'returnDate'])
    let regNo = req.body.regNo

    console.log(regNo)
    console.log(body)

    Car.findOneAndUpdate({"regNo": regNo}, {$push: { bookings: body }}, {new: true}).then((car) => {
        if (car) {
            res.send(car)
        } else {
            res.send(`no car with number ${regNo}`)
        }
    }, (e) => {
        res.send(e)
    })
})

// telling the app to listen on a port
app.listen(port, () => {
    console.log('Listening on port ' + port);
})