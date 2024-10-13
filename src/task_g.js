function concatinate(...args) {
    var sum = "";
    for(let element of args) {
        sum += element;
    }
    return sum;
}

console.log(concatinate([1, 2, 3, 4, 5]));
console.log(concatinate(["1", "2", "3", "4", "5"]));
console.log(concatinate(["ala", "ma", "kota", "i", "psa"]));