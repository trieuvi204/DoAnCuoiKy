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
// Đảm bảo giỏ hàng luôn rỗng mỗi khi tải lại trang
document.addEventListener('DOMContentLoaded', function () {
	sessionStorage.setItem('cart', JSON.stringify([]));
});

function addCartClicked(event, data) {
	var button = event.target;
	var shopProducts = button.parentElement.parentElement.parentElement;
	var title = shopProducts.getElementsByClassName('title-drinks-items')[0].innerText;
	var price = shopProducts.getElementsByClassName('price')[0].innerText;
	var quantity = shopProducts.getElementsByClassName('quantity')[0].value;

	// Tìm thông tin sản phẩm từ mảng `data`
	var productImg = '';
	var ma_mh = '';
	var matchedUser = data.find(user => user.ten_mh.trim().toLowerCase() === title.trim().toLowerCase());

	if (matchedUser) {
			productImg = matchedUser.hinh_anh_mh; // Lấy đường dẫn hình ảnh
			ma_mh = matchedUser.ma_mh; // Lấy mã mặt hàng
	} else {
			console.log('Không tìm thấy sản phẩm phù hợp.');
	}

	// Tạo đối tượng sản phẩm
	var product = {
			name: title,
			price: price,
			quantity: quantity,
			imgSrc: productImg,
			ma_mh: ma_mh
	};

	// Lấy lại giỏ hàng từ sessionStorage (luôn là mảng rỗng do đã reset ở DOMContentLoaded)
	var cart = JSON.parse(sessionStorage.getItem('cart'));

	// Thêm sản phẩm vào giỏ hàng
	cart.push(product);

	// Lưu lại giỏ hàng vào sessionStorage
	sessionStorage.setItem('cart', JSON.stringify(cart));

	addProductToCart(title, price, productImg, quantity);

	// Cập nhật tổng giá trị của giỏ hàng
	updatetotal();


}



function addProductToCart(title, price, productImg, quantity) {
	var cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box')
	var cartItems = document.getElementsByClassName('cart-content')[0];
	var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText.toUpperCase() === title.toUpperCase()) {
			Swal.fire({
				text: "Bạn đã thêm vật phẩm này vào giỏ hàng !!!",
				icon: "error"
			});
			return;
		}
	}
	Swal.fire({
		text: "Thêm vào giỏ hàng thành công !!!",
		icon: "success"
	});
	var cartBoxContent = `
                        <div class="row item-container">
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

function updatetotal() {
	var carContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = document.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-product-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

		var price = parseFloat(priceElement.innerText.replace("đ", "").replace(/\./g, ''))
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	document.getElementsByClassName("total-price")[0].innerText = total.toLocaleString('vi-vn') + "đ";
}
// <!-- display and search -->
arrItemsList = [

	{
		imgSrc: '../../img/do_uong/aquarius.jpg',
		itemName: 'Aquarius',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '137.000đ',
		itemQuantity: '1',
		totalPrice: '137.000đ'
	},
	{
		imgSrc: '../../img/do_uong/bo_huc_250ml.png',
		itemName: 'Redbull',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '232.000đ',
		itemQuantity: '1',
		totalPrice: '232.000đ'
	},
	{
		imgSrc: '../../img/do_uong/coca.jpg',
		itemName: 'Coca',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '129.000đ',
		itemQuantity: '1',
		totalPrice: '129.000đ'
	},
	{
		imgSrc: '../../img/do_uong/nuoc_suoi.jpg',
		itemName: 'Nước Suối',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '50.000đ',
		itemQuantity: '1',
		totalPrice: '50	.000đ'
	},
	{
		imgSrc: '../../img/do_uong/nutri_cam.jpg',
		itemName: 'Nutri Cam',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '180.000đ',
		itemQuantity: '2',
		totalPrice: '360.000đ'
	},
	{
		imgSrc: '../../img/do_uong/nutri_cookies.jpg',
		itemName: 'Nutri Cookies',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '180.000đ',
		itemQuantity: '2',
		totalPrice: '360.000đ'
	},
	{
		imgSrc: '../../img/do_uong/revive.jpg',
		itemName: 'Revive',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '138.000đ',
		itemQuantity: '10',
		totalPrice: '1.380.000đ'
	},
	{
		imgSrc: '../../img/do_uong/revive_cm.jpg',
		itemName: 'Revive CM',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '142.000đ',
		itemQuantity: '10',
		totalPrice: '1.420.000đ'
	},
	{
		imgSrc: '../../img/do_uong/sprite.jpg',
		itemName: 'Sprite',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '120.000đ',
		itemQuantity: '2',
		totalPrice: '240.000đ'
	},
	{
		imgSrc: '../../img/do_uong/sting_dau.jpg',
		itemName: 'Sting Dâu',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '153.000đ',
		itemQuantity: '1',
		totalPrice: '153.000đ'
	},
	{
		imgSrc: '../../img/do_uong/sting_vang.jpg',
		itemName: 'Sting Vàng',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '150.000đ',
		itemQuantity: '1',
		totalPrice: '150.000đ'
	},
	{
		imgSrc: '../../img/do_uong/teppy.jpg',
		itemName: 'Teppy',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '166.000đ',
		itemQuantity: '1',
		totalPrice: '166.000đ'
	},
	{
		imgSrc: '../../img/do_uong/tra_xanh_0_do.jpg',
		itemName: 'Trà Xanh Không Độ',
		distributor: 'NPP: ĐL B-NN Khương Duy',
		itemPrice: '150.000đ',
		itemQuantity: '3',
		totalPrice: '450.000đ'
	},


]

//
const Item = 'http://localhost:8000/item/module/v1/item/all';
var option = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

fetch(Item, option)
	.then(function (response) {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then(data => {
		// Hiển thị danh sách sản phẩm
		data.forEach(user => {
			displayItemsList(user);
		});

		// Thêm sự kiện click cho các nút "Add to Cart"
		var addCart = document.querySelectorAll(".add-cart");
		addCart.forEach(function (button) {
			button.addEventListener('click', function (event) {
				addCartClicked(event, data);
			});
		});
	})
	.catch(function (error) {
		Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message,
		});
	});


var items = document.getElementsByClassName('items-list')[0]
items.innerHTML = '';

function displayItemsList(user) {

	const output =
		`
			<div class="col-lg-4 ">
				<div class="item">
					<div class="row">
						<div class="col-lg-6 img">
							<img class = "product-Img" src="${user.hinh_anh_mh}" alt="">
						</div>
						<div class="col-lg-6">
							<h3 class="title-drinks-items">${user.ten_mh}</h3>
							<p class="distributor">${user.ma_npp}</p>
							<p >Giá bán sỉ thùng: <span class="price">${user.don_gia_nhap}</span></p>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<div class="quantity-drinks-item">
								<input type="number" class="quantity" value= "1">
							</div>
						</div>
						<div class="col-lg-6">
							<button class="add-cart">Thêm vào giỏ hàng</button>
						</div>
					</div>
				</div>
			</div>
				`;
	items.insertAdjacentHTML('beforeend', output);


}
//

function selectResult() {

	var elements = document.getElementsByClassName('title-drinks-items');
	var selectedValue = document.getElementById('search').value;
	var name_selected_arr = [];

	// Duyệt qua các phần tử và lấy textContent
	for (var i = 0; i < elements.length; i++) {
		var itemNameInf = elements[i].textContent.trim();
		if (itemNameInf.toUpperCase() === selectedValue.toUpperCase()) {
			name_selected_arr.push(itemNameInf);
		}
	}
	displayItemList(name_selected_arr);

}


function deleteValue(user) {
	document.getElementById('search').value = '';
	displayItemList(user)
}


// <!-- autobox -->


let recommendList = [
	'Aquarius',
	'Redbull',
	'Coca',
	'Nước Suối',
	'Nutri Cam',
	'Nutri Cookies',
	'Revive',
	'Revive CM',
	'Sprite',
	'Sting Dâu',
	'Sting Vàng',
	'Teppy',
	'Trà Xanh Không Độ'
]

const inputSearch = document.querySelector('.search')
const autoBox = document.querySelector('.autobox')

inputSearch.onkeyup = (e) => {

	let checkData = e.target.value
	let dataArr = []

	if (checkData) {
		dataArr = recommendList.filter((data) => {
			return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
		})

		dataArr = dataArr.map((data) => {
			return data = '<li>' + data + '</li>'
		})
		autoBox.classList.add('active')
		showItem(dataArr)
		let liItem = autoBox.querySelectorAll('li')
		for (let i = 0; i < liItem.length; i++) {
			liItem[i].addEventListener('click', function () {
				inputSearch.value = liItem[i].innerHTML
				autoBox.classList.remove('active')
			})
		}
	}
	else {
		autoBox.classList.remove('active')

	}
}


function showItem(arr) {
	let listData
	if (!arr.length) {
		listData = '<li>' + inputSearch.value + '</li>'
	}
	else {
		listData = arr.join('')
	}
	autoBox.innerHTML = listData
}

/* <!-- autobox -->
<!-- display and search --> */


