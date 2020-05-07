const filterForm = document.querySelector('#filterForm')
const cars = document.querySelector('#cars')
const make = document.querySelector('#make')
const model = document.querySelector('#model')
const seatingCapacity = document.querySelector('#seatingCapacity')
const maxRent = document.querySelector('#maxRent')

filterForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let body = {
        make: make.value,
        model: model.value,
        seatingCapacity: seatingCapacity.value,
        maxRent: maxRent.value
    }

    cars.textContent = JSON.stringify(body)

    fetch(`/filteredResults?make=${make.value}`).then((response) => {
        response.json().then((data) => {
            cars.textContent = JSON.stringify(data)
        })
    })

    // fetch('/cars').then((response) => {
    //     response.json().then((data) => {
    //         cars.textContent = JSON.stringify(data)
    //     })
    // })
    // http://localhost:3000/bookNewCar?make=&model=&seatingCapacity=&rentPerDay=
})