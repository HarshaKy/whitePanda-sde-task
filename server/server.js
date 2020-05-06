const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

let {mongoose} = require('./db/mongoose')
let {Car} = require('./models/cars')

let app = express()
const port = 3000

app.use(bodyParser.json())

app.get('', (req, res) => {
    res.send('hello')
})

app.post('/cars', (req, res) => {
    let body = _.pick(req.body, ['regNo', 'make', 'model', 'seatingCapacity', 'rentPerDay'])
    let car = new Car(body)

    car.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})