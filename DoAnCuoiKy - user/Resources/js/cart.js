//cart

let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")
//open-cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

//close-cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//cart-working js
if (document.readyState == "loading")
    {
        document.addEventListener("DOMContentLoaded",ready);
    }
else
    {
        ready();
    }

//making function

function ready()
{
    //remove items from cart
    var removeCartButton = document.getElementsByClassName('remove-cart')

    for ( var i = 0 ; i < removeCartButton.length; i++){
        var button = removeCartButton[i];
        button.addEventListener("click", removeCartItem)
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i< quantityInputs.length; i++)
        {
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged);
        }
    
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for ( var i = 0; i < addCart.length; i++)
        {
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }
}
    //remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();

    updatetotal()
}
// quantity changes

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0)
        {
            input.value = 1;
        }
    updatetotal();
}

// addCartClicked

function addCartClicked(event)
{
    var button = event.target
    var shopProducts =  button.parentElement.parentElement.parentElement.parentElement.parentElement
    console.log("🚀 ~ shopProducts:", shopProducts)
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText
    var quantity = shopProducts.getElementsByClassName('card-quantity')[0].value
    var productImg = shopProducts.getElementsByClassName('product-Img')[0].src
    addProductToCart(title,price,productImg,quantity)
    updatetotal()
}


function addProductToCart(title,price,productImg,quantity) 
{
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++ ){
        if (cartItemsNames[i].innerText === title) {
            alert("Bạn đã thêm vật phẩm này vào giỏ hàng");
            return;
        }
    }
    var cartBoxContent = `
                        <div class="row">
                            <div class="col-lg-4 cart-img">
                                <img src="${productImg}" alt="cart-img" id="cart-img">
                            </div>
                            <div class="col-lg-5">
                                <div class="row row-cols-3">
                                    <div class="row">
                                        <div class="cart-product-title cart-inf">${title}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-price cart-inf">${price}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-quantity ">
                                            <input type="number" name="cart-quantity" value="${quantity}" class="cart-quantity">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-1 remove-cart-container">
                                <i class="fa-regular fa-trash-can remove-cart"></i>
                            </div>
                        </div>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}







// update total

function  updatetotal() {
    var carContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++)
        {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-product-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

            var price = parseFloat(priceElement.innerText.replace("đ", "").replace(/\./g, ''))
            var quantity = quantityElement.value;
            total = total + (price*quantity);
        }
            document.getElementsByClassName("total-price")[0].innerText = total.toLocaleString('vi-vn') + "đ";
}