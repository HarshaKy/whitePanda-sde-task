const cars = document.querySelector('#cars')
const searchCar = document.querySelector('#searchCar')
const make = document.querySelector('#make')
const model = document.querySelector('#model')
const updateFormDiv = document.querySelector('#updateFormDiv')
const regNo = document.querySelector('#regNo')

window.onload = function () {
    fetch('/cars').then((response) => {
        response.json().then((data) => {
            let car
            let i = 1

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    if(car.bookings.length === 0){
                        cars.innerHTML += `<p>${i}. Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, 
                        Rent per day: ${car.rentPerDay}<button onclick='updateCar(${JSON.stringify(car.regNo)})'>Update</button></p>`
                        i++
                    }
                }
            }
        })
    })
}

function updateCar (carRegNo) {
    regNo.value = carRegNo

    updateFormDiv.style.display = 'block'
}

searchCar.addEventListener('submit', (event) => {
    event.preventDefault()

    updateFormDiv.style.display = 'none'
    cars.textContent = 'Loading ...'

    let URL = `/filteredResults?make=${make.value}&model=${model.value}`


    fetch(URL).then((response) => {
        response.json().then((data) => {

            cars.innerHTML = ''
            let car
            let i = 1

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    if (car.bookings.length === 0) {
                        cars.innerHTML += `<p>${i}. Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, Rent per day: ${car.rentPerDay}<button onclick='updateCar(${JSON.stringify(car.regNo)})'>Update</button></p>`
                        i++   
                    }
                }
            }            
        })
    })
})