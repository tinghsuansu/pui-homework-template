////////// four dynamic Roll objects for HW5 //////////

let originalRoll = new Roll('Original', allGlazing[1]['name'], allPackSize[0]['name'], rolls['Original']['basePrice']);
let WalnutRoll = new Roll('Walnut', allGlazing[2]['name'], allPackSize[3]['name'], rolls['Walnut']['basePrice']);
let RaisinRoll = new Roll('Raisin', allGlazing[1]['name'], allPackSize[1]['name'], rolls['Raisin']['basePrice']);
let AppleRoll = new Roll('Apple', allGlazing[0]['name'], allPackSize[1]['name'], rolls['Apple']['basePrice']);

cart = [originalRoll, WalnutRoll, RaisinRoll, AppleRoll];



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
        '<button class="btn-remove"  id="' + cart[i].type + '" onclick="removeItem(this)">Remove</button></div>';
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

//remove item from the "cart" array, update total price and HTML
function removeItem(element) {
    let itemToRemove = element.id;
    newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].type !== itemToRemove) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    addDynamicRoll();
    calculateTotalPrice();
}