const cars = document.querySelector('#allCars')

function deleteCar(regNo) {
    console.log(regNo)

    let URL = `/delete?regNo=${regNo}`

    fetch(URL).then((response) => {
        response.json().then((data) => {
            console.log(JSON.stringify(data))
            location.reload()
        })
    })
}

window.onload = function () {
    fetch('/cars').then((response) => {
        response.json().then((data) => {
            let car
            let i = 1

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    if(car.bookings.length === 0) {
                        cars.innerHTML += `<p>${i}. Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, 
                            Rent per day: ${car.rentPerDay}</p><p>Bookings: ${JSON.stringify(car.bookings)} <button onClick='deleteCar(${JSON.stringify(car.regNo)})'>Delete</button></p>`
                        i++
                    }
                }
            }
        })
    })
}