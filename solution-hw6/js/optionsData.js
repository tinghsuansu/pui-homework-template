//dynamic options for glazing
let allGlazing = [
    {name: 'Keep original', priceAdaption: 0}, 
    {name: 'Sugar milk', priceAdaption: 0}, 
    {name: 'vanilla milk', priceAdaption: 0.5}, 
    {name: 'Double chocolate', priceAdaption: 1.5}
];

//dynamic options for pack size
let allPackSize = [
    {name: '1', priceAdaption: 1},
    {name: '3', priceAdaption: 3},
    {name: '6', priceAdaption: 5},
    {name: '12', priceAdaption: 10}
];

//update cart


let cart;
if (JSON.parse(localStorage.getItem('rollItem') === null)) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem('rollItem'));
}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}