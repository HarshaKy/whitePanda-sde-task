// render all cars when book cars gets loaded

window.onload = function () {
    fetch('/cars').then((response) => {
        response.json().then((data) => {
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
}
