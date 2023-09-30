////////// generate options for product detail page //////////

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

//generate the html for the dynamic options
function addDynamicOption(arr) {
    let option = '';
    for (i = 0; i < arr.length; i++) {
        option = option + '<option value="' + arr[i].priceAdaption + '">' + arr[i].name + '</option>';
    }
    return option;
}

let glazingSelection = document.querySelector('#glazing');
let packSelection = document.querySelector('#pack');

//add the html of the dynamic options into the <select> in the html file
let glazingOption = addDynamicOption(allGlazing);
glazingSelection.innerHTML = glazingOption;

let packSizeOption = addDynamicOption(allPackSize);
packSelection.innerHTML = packSizeOption;



////////// calculate price on product detail page //////////

let glazingPrice = 0;
let packPrice = 1;

let basePrice = 2.49;

let totalPrice = document.querySelector('#product-detail-price');

//update the value to be calculated
function glazingChange(element) {
    glazingPrice = element.value;
    //console.log('now glazing is ' + glazingPrice);
    updateTotalPrice();
}

function packChange(element) {
    packPrice = element.value;
    //console.log('now pack is ' + packPrice);
    updateTotalPrice();
}

//calculate the total price and update the html
function updateTotalPrice() {
    let priceSum = Math.round((basePrice + Number(glazingPrice)) * Number(packPrice) * 100) / 100;
    totalPrice.innerHTML = '$ ' + priceSum;
    //console.log('price sum is ' + priceSum);
}



////////// update product detail page //////////

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const productTitle = document.querySelector('.page-title');
productTitle.innerHTML = '<h2>' + rollType + ' Cinnamon Roll</h2>';

const productImg = document.querySelector('.product-detail-img');
productImg.src = '../assets/products/' + rolls[rollType]['imageFile'];

basePrice = rolls[rollType]['basePrice'];
totalPrice.innerText = basePrice;



////////// add to cart //////////

let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let userSelectGlazing = glazingSelection.selectedIndex;
let userSelectPack = packSelection.selectedIndex;

function addToCart() {
    //userSelectGlazing = glazingSelection.selectedIndex;
    //userSelectPack = packSelection.selectedIndex;
    let newItem = new Roll(rollType, allGlazing[glazingSelection.selectedIndex].name, allPackSize[packSelection.selectedIndex].name, basePrice);
    console.log(newItem);
    cart.push(newItem);
    console.log(cart);
}