class Car{
    constructor(name, volume, isTankFull){
        this.name = name;
        this.volume = volume;
        this.isTankFull = isTankFull;
    }

     reserve(){
         if(!this.isTankFull) return "Please fill up the tank in " + this.name + "!";
         return "You are good to go " + this.name + "!";
     }
}

const toyota = new Car("Toyota Avensis", 2.0, true)
const bmw = new Car("BMW E36", 1.0, false)

console.log(toyota.reserve())
console.log(bmw.reserve())
