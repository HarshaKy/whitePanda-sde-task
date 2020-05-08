
const filterForm = document.querySelector('#filterForm')
const cars = document.querySelector('#cars')
const make = document.querySelector('#make')
const model = document.querySelector('#model')
const seatingCapacity = document.querySelector('#seatingCapacity')
const maxRent = document.querySelector('#maxRent')
const bookFormDiv = document.querySelector('#bookingForm')

function bookCar (carRegNo) {
    console.log(carRegNo)
    bookFormDiv.style.display = 'block'
}

window.onload = function () {
    fetch('/cars').then((response) => {
        response.json().then((data) => {
            let car

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    cars.innerHTML += `<p>Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, Rent per day: ${car.rentPerDay}<button onclick='bookCar(${JSON.stringify(car.regNo)})'>Book</button></p>`
                }
            }
        })
    })
}

filterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    bookFormDiv.style.display = 'none'
    cars.textContent = 'Loading ...'

    fetch(`/filteredResults?make=${make.value}`).then((response) => {
        response.json().then((data) => {

            cars.innerHTML = ''
            let car

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    cars.innerHTML += `<p>Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, Rent per day: ${car.rentPerDay}<button onclick='bookCar(${JSON.stringify(car.regNo)})'>Book</button></p>`
                }
            }            
        })
    })

    // fetch('/cars').then((response) => {
    //     response.json().then((data) => {
    //         cars.textContent = JSON.stringify(data)
    //     })
    // })
    // http://localhost:3000/bookNewCar?make=&model=&seatingCapacity=&rentPerDay=
})