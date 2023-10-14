////////// get dynamic Roll objects from localStorarge //////////

cart = JSON.parse(localStorage.getItem('rollItem'));
console.log(cart);


////////// add dynamic Roll objects to shopping cart page ////////

let cartItemList = document.querySelector('.item-list');
let btnRemove = document.querySelector('.btn-remove');
let cartTotal = document.querySelector('#total-price');

//calculate each item's subtotal price
function calculateItemPrice(dynamicRoll) {
    let itemGlazePrice = allGlazing.find(x => x.name === dynamicRoll.glazing).priceAdaption;
    let itemPackPrice = allPackSize.find(x => x.name === dynamicRoll.size).priceAdaption;
    let itemPrice = Math.round((dynamicRoll.basePrice + itemGlazePrice) * itemPackPrice * 100) / 100;
    return itemPrice;
}

/*
Note: find & findIndex
const calculateItemPrice = (dynamicRoll) => {
    allPackSize.findIndex(function(x){ return x.name === dynamicRoll.size})
    allPackSize.find(x => x.name === dynamicRoll.size).priceAdaption
}*/

//add dynamic rolls to HTML
function addDynamicRoll() {
    let cartItem = '';
    for (let i = 0; i < cart.length; i++) {
        cartItem = cartItem + 
        '<div class="cart-product-card"><div class="cart-product-card-up"><img src="../assets/products/' + rolls[cart[i].type]['imageFile'] +'">' + 
        '<div class="item-info"><p class="item-info-name">' + cart[i].type + ' Cinnamon Roll</p>' + 
        '<p>Glazing: <span class="item-info-glazing">' + cart[i].glazing + '</span></p>' + 
        '<p>Pack Size: <span class="item-info-pack">' + cart[i].size + '</span></p></div>' + 
        '<p class="item-price">$ ' + calculateItemPrice(cart[i]) + '</p></div>' + 
        '<button class="btn-remove"  id="' + i + '" onclick="removeItem(this)">Remove</button></div>';
    }
    cartItemList.innerHTML = cartItem;
}



////////// calculate total price //////////

//calculate the total price and update HTML
function calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = Math.round((total + calculateItemPrice(cart[i])) * 100) / 100;
    }
    cartTotal.innerHTML = total;
}



////////// remove item //////////

//remove item from the "cart" array, update localStorage, update total price and HTML
function removeItem(element) {
    let itemToRemove = parseInt(element.id);
    let newCart = [];
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
        if (i !== itemToRemove) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    localStorage.setItem('rollItem', JSON.stringify(cart));
    addDynamicRoll();
    calculateTotalPrice();
}