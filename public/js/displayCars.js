// render all cars when page gets loaded

window.onload = function () {
    fetch('/cars').then((response) => {
        response.json().then((data) => {
            let car
            let i = 1

            if (data.err) {
                cars.innerHTML = data.err
            } else {
                for(car of data) {
                    cars.innerHTML += `<p>${i}. Car name: ${car.make} ${car.model}, Seating: ${car.seatingCapacity}, Rent per day: ${car.rentPerDay}<button onclick='bookCar(${JSON.stringify(car.regNo)}, ${JSON.stringify(car.model)})'>Book</button></p>`
                    i++
                }
            }
        })
    })
}
