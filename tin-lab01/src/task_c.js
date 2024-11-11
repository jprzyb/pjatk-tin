var car ={
    name: "Toyota",
    model: "Avensis",
    motor: "D-4D",
    volune: "2000"
}

for (let key in car) {
    console.log(key + ": " + car[key]);
}