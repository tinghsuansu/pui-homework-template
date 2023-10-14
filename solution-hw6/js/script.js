////////// generate options for product detail page //////////

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
    updateTotalPrice();
}

function packChange(element) {
    packPrice = element.value;
    updateTotalPrice();
}

//calculate the total price and update the html
function updateTotalPrice() {
    let priceSum = Math.round((basePrice + Number(glazingPrice)) * Number(packPrice) * 100) / 100;
    totalPrice.innerHTML = '$ ' + priceSum;
}



////////// update product detail page //////////

//get URL parameter
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//change each page's webpage content based on parameter
const productTitle = document.querySelector('.page-title');
productTitle.innerHTML = '<h2>' + rollType + ' Cinnamon Roll</h2>';

const productImg = document.querySelector('.product-detail-img');
productImg.src = '../assets/products/' + rolls[rollType]['imageFile'];

//change each page's product base price based on parameter
basePrice = rolls[rollType]['basePrice'];
totalPrice.innerText = basePrice;



////////// add to cart //////////

function addToCart() {
    let newItem = new Roll(rollType, allGlazing[glazingSelection.selectedIndex].name, allPackSize[packSelection.selectedIndex].name, basePrice);
    cart.push(newItem);
    localStorage.setItem('rollItem', JSON.stringify(cart));
    console.log(cart);
}

