function solve(x,y) {
    if(isNumber(x) && isNumber(y)){return parseInt(x)+parseInt(y)}
    return "Not a number!"
}
function isNumber(a){
    if(typeof a === 'number') return true;
    if(parseInt(a) == a) return true;
    return false;
}

console.log("1. " + solve(1,2))
console.log("2. " + solve("1",2))
console.log("3. " + solve(1,"2"))
console.log("4. " + solve("1","2"))
