const filterForm = document.querySelector('#filterForm')
const cars = document.querySelector('#cars')
const make = document.querySelector('#make')
const model = document.querySelector('#model')
const seatingCapacity = document.querySelector('#seatingCapacity')
const maxRent = document.querySelector('#maxRent')
const bookFormDiv = document.querySelector('#bookingForm')
const regNo = document.querySelector('#regNo')

function bookCar (carRegNo, carModel) {
    console.log(carModel)

    regNo.value = carRegNo

    bookFormDiv.style.display = 'block'
}

filterForm.addEventListener('submit', (event) => {
    event.preventDefault()

    bookFormDiv.style.display = 'none'
    cars.textContent = 'Loading ...'

    let URL = `/filteredResults?make=${make.value}&model=${model.value}&seatingCapacity=${seatingCapacity.value}&rentPerDay=${maxRent.value}`


    fetch(URL).then((response) => {
        response.json().then((data) => {

            cars.innerHTML = ''
            let car

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    cars.innerHTML += `<p>Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, Rent per day: ${car.rentPerDay}<button onclick='bookCar(${JSON.stringify(car.regNo)}, ${JSON.stringify(car.model)})'>Book</button></p>`
                }
            }            
        })
    })
})