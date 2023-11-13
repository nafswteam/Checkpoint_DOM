let cartContainer = document.getElementById("cart-container");
let cartTotal = document.getElementById("cart-total");
let chkoutBtn = document.getElementById("checkout-button");

// ! formatting the currency symbol in our cart
let currencyDisplay = Intl.NumberFormat("en-US");

// ! This function map display each product inside cartContainer div using map method
function displayCart() {
  cartContainer.innerHTML = cartItems
    .map((item) => returnCartItems(item))
    .join("");
}
displayCart();

// ! This dynamic div to for each item in our cart
function returnCartItems(products) {
  return `<div class="each-product">

        <!-- product image -->
        <img
          src="${products.productImg}"
          alt="${products.productName}"
          srcset=""
          class="product-image"
        />

        <!-- ------------------ -->
        <div class="product-information w-100 p-3">
            <div class="product-title-and-like d-flex justify-content-between flex-wrap">
                <h3 class="product-title">${products.productName}</h3>
                <!-- ! Like an item on cart  -->
                    <div id= "favourite-item" onclick=updatedFavouriteItems('${
                      products.id
                    }'); class=${
    products.like === true ? "bi-heart-fill" : "bi-heart"
  }  > 
                     </div>
            </div>
                <!----------------------- -->

          <p class="product-amount align-self-center">&#8358; ${currencyDisplay.format(
            products.productPrice
          )}</p>

          <!---Remove and Product quantity start here-------------------- -->

        <div class="remove-and-productquantity d-flex justify-content-between w-100 flex-wrap">
            
            <!-- remove item from cart div is here -->
                <div onclick="removeItemFromCart('${
                  products.id
                }')" class="remove-item"><i class="bi bi-trash"> </i>Remove
                </div>

            <!-- ----------------------- --> 

            <!------ ! product quantity -------->
            <div>
                <button class="bi bi-dash-lg" onclick="decreaseQuantity('${
                  products.id
                }')"></button><span id="quantity">${
    products.productQuantity
  }</span> 
        
                <button class="bi bi-plus-lg" onclick=increaseQuantity('${
                  products.id
                }')></button>
            </div>
          <!-- ----------------------- -->
        </div>
 
        </div>
      </div>`;
}

// ! This function decrease the number of quantity for an item
function increaseQuantity(id) {
  cartItems.forEach((element) => {
    if (element.id === id) {
      element.productQuantity += 1;
    }
    calculateCartTotal();
    displayCart();
  });
}

// ! This function decrease the number of quantity for an item
function decreaseQuantity(id) {
  cartItems.forEach((element) => {
    if (element.productQuantity === 1) {
      return;
    } else {
    }
    if (element.id === id) {
      element.productQuantity -= 1;
    }
    calculateCartTotal();
    displayCart();
  });
}

// ! This function remove an item from shopping cart
function removeItemFromCart(id) {
  cartItems = cartItems.filter((element) => element.id !== id);
  //   console.log(cartItems);
  calculateCartTotal();
  displayCart();
}
// ! this function calculate the sum of all items
function calculateCartTotal() {
  totalCostOfItemsInCart = cartItems.reduce((total, value) => {
    return total + value.productQuantity * value.productPrice;
  }, 0);
  cartTotal.textContent = currencyDisplay.format(totalCostOfItemsInCart);
}
calculateCartTotal();

function updatedFavouriteItems(id) {
  cartItems.forEach((element) => {
    if (element.id === id && element.like === false) {
      element.like = true;
    } else if (element.id == id && element.like === true) {
      element.like = false;
    }
    displayCart();
  });
}
