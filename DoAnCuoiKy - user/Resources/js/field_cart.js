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
if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
}
else {
	ready();
}

//making function

function ready() {
	//remove items from cart
	var removeCartButton = document.getElementsByClassName('remove-cart')

	for (var i = 0; i < removeCartButton.length; i++) {
		var button = removeCartButton[i];
		button.addEventListener("click", removeCartItem)
	}

	//quantity changes
	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}

	// add to cart
	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++) {
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
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updatetotal();
}

// addCartClicked

function addCartClicked(event) {
	var button = event.target
	var shopProducts = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText
	var price = shopProducts.getElementsByClassName('product-price')[0].innerText
	var productImg = shopProducts.getElementsByClassName('product-Img')[0].src
	var date = shopProducts.getElementsByClassName('select-date')[0].value
	var time = shopProducts.getElementsByClassName('select-time')[0].value
	var timeOption = shopProducts.getElementsByClassName('select_time-option')[0].value
	var note = shopProducts.getElementsByClassName('note')[0].value
	addProductToCart(title, price, productImg, date, time, timeOption, note)
	updatetotal()
}


function addProductToCart(title, price, productImg, date, time, timeOption, note) {
	var cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box')
	var cartItems = document.getElementsByClassName('cart-content')[0];
	var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText === title) {
			alert("Bạn đã thêm vật phẩm này vào giỏ hàng");
			return;
		}
	}
	var cartBoxContent = `
                        <div class="row">
                            <div class = "col-lg-12 cart-inf-container">
                                <div class="cart-img">
                                <img src="${productImg}" alt="cart-img" id="cart-img">
                            </div>
                            <div class="cart-inf">
                                <div class="col-lg-6 left">
                                    <div class="row">
                                        <div class = " cart-product-title ">${title}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-date ">Ngày: ${date}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-time ">Giờ: ${time}</div>
                                    </div>
                                </div>
                                <div class="col-lg-6 right">
                                    <div class="row">
                                        <div class = "cart-product-price ">${price}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-timeOption ">Thời gian: ${timeOption}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-note ">Ghi chú: ${note}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-12 remove-cart-container">
                                <i class="fa-regular fa-trash-can remove-cart"></i>
                            </div>
                        </div>`;
	cartShopBox.innerHTML = cartBoxContent;
	cartItems.append(cartShopBox);
	cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem);
}







// update total

function updatetotal() {
	var carContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = document.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-product-price")[0];

		var price = parseFloat(priceElement.innerText.replace("đ", "").replace(/\./g, ''))
		total = total + price;
	}
	document.getElementsByClassName("total-price")[0].innerText = total.toLocaleString('vi-vn') + "đ";
}


const url_getAll = 'http://localhost:8000/san/module/v1/san/all';
const url_getOne = ''
const option = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Tên sân hoặc ID sân bạn muốn tìm
const targetFieldCode = sessionStorage.getItem("ma_san"); // hoặc có thể dùng một ID cụ thể như `targetFieldId = 1;`

fetch(url_getAll, option)
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
            });
        }
        return response.json();
    })
    .then(data => {
        // Lọc để tìm sân phù hợp
        const selectedField = data.find(item => item.ma_san === targetFieldCode); 
        console.log("🚀 ~ selectedField:", selectedField)
        // Hoặc nếu lọc bằng ID thì: `item.id === targetFieldId`

        if (selectedField) {
            // Cập nhật dữ liệu vào giao diện cho sân được chọn
            document.querySelector('.product-title').textContent = selectedField.ten_san ;
            document.querySelector('.product-Img').src = `../../../img/field_list/${selectedField.ma_san}.jpg`;
            document.querySelector('.product-price').textContent = `${selectedField.price}đ`;
            document.querySelector('.right:nth-child(2)').textContent = selectedField.openTime;

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy sân',
                text: `Không có sân nào phù hợp với tên: ${targetFieldName}`,
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Đã xảy ra lỗi',
            text: 'Lỗi: ' + error.message,
        });
    });
