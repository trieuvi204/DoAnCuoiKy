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
		// Lắng nghe sự kiện click trên phần tử cha (items)
		items.addEventListener('click', function (event) {
			// Kiểm tra nếu phần tử được nhấn có class 'add-cart'
			if (event.target.classList.contains('add-cart')) {
				// Thực hiện hành động khi nút "add-cart" được nhấn
				addCartClicked(event, data);
			}
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
	const urlGetNPP = 'http://localhost:8000/distributors/module/v1/distributor/detail?ma_npp='
	fetch(urlGetNPP + user.ma_npp, option)
	.then(function (response) {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then(data => {
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
							<p class="distributor">Nhà pp: ${data.ten_npp}</p>
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

	})
	.catch(function (error) {
		Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message,
		});
	});

	

}
//

// function selectResult() {

// 	var elements = document.getElementsByClassName('title-drinks-items');
// 	var selectedValue = document.getElementById('search').value;
// 	var name_selected_arr = [];

// 	// Duyệt qua các phần tử và lấy textContent
// 	for (var i = 0; i < elements.length; i++) {
// 		var itemNameInf = elements[i].textContent.trim();
// 		if (itemNameInf.toUpperCase() === selectedValue.toUpperCase()) {
// 			name_selected_arr.push(itemNameInf);
// 		}
// 	}
// 	displayItemList(name_selected_arr);

// }


// function deleteValue(user) {
// 	document.getElementById('search').value = '';
// 	displayItemList(user)
// }


// // <!-- autobox -->


// let recommendList = [
// 	'Aquarius',
// 	'Redbull',
// 	'Coca',
// 	'Nước Suối',
// 	'Nutri Cam',
// 	'Nutri Cookies',
// 	'Revive',
// 	'Revive CM',
// 	'Sprite',
// 	'Sting Dâu',
// 	'Sting Vàng',
// 	'Teppy',
// 	'Trà Xanh Không Độ'
// ]

// const inputSearch = document.querySelector('.search')
// const autoBox = document.querySelector('.autobox')

// inputSearch.onkeyup = (e) => {

// 	let checkData = e.target.value
// 	let dataArr = []

// 	if (checkData) {
// 		dataArr = recommendList.filter((data) => {
// 			return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
// 		})

// 		dataArr = dataArr.map((data) => {
// 			return data = '<li>' + data + '</li>'
// 		})
// 		autoBox.classList.add('active')
// 		showItem(dataArr)
// 		let liItem = autoBox.querySelectorAll('li')
// 		for (let i = 0; i < liItem.length; i++) {
// 			liItem[i].addEventListener('click', function () {
// 				inputSearch.value = liItem[i].innerHTML
// 				autoBox.classList.remove('active')
// 			})
// 		}
// 	}
// 	else {
// 		autoBox.classList.remove('active')

// 	}
// }


// function showItem(arr) {
// 	let listData
// 	if (!arr.length) {
// 		listData = '<li>' + inputSearch.value + '</li>'
// 	}
// 	else {
// 		listData = arr.join('')
// 	}
// 	autoBox.innerHTML = listData
// }

/* <!-- autobox -->
<!-- display and search --> */
const urlGetAllNpp = 'http://localhost:8000/distributors/module/v1/distributor/all'
	fetch(urlGetAllNpp, option)
	.then(function (response) {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then(distributors => {
		const selectElement = document.getElementById('ma_npp');
		distributors.forEach(distributor => {
				const option = document.createElement('option');
				option.value = distributor.ma_npp; // Giả sử `ma_npp` là trường dữ liệu trong API
				option.textContent = distributor.ten_npp; // Giả sử `ten_npp` là tên nhà phân phối
				selectElement.appendChild(option);
		});
	})

// Mở modal
document.querySelector('.addItems').addEventListener('click', () => {
  document.getElementById('addItemModal').style.display = 'block';	
});

// Đóng modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('addItemModal').style.display = 'none';
});

// Lưu dữ liệu
document.getElementById('saveItem').addEventListener('click', () => {
	const urlAddItems = 'http://localhost:8000/item/module/v1/item/add'
	const data = {
    ma_npp: document.getElementById('ma_npp').value,
    ten_mh: document.getElementById('ten_mh').value,
    don_gia_nhap: parseFloat(document.getElementById('don_gia_nhap').value),
    don_gia_ban: parseFloat(document.getElementById('don_gia_ban').value),
    hinh_anh_mh: `../../img/do_uong/${document.getElementById('hinh_anh_mh').files[0].name}` // Đường dẫn giả lập
  };
	console.log("🚀 ~ document.getElementById ~ data:", data)
	
	var option = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
	fetch(urlAddItems, option)
  .then(function (response) {
    // Kiểm tra xem response có thành công (status 200) không
    if (!response.ok) {
      return response.json().then(errorData => {
        // Trả về lỗi chi tiết nếu có
        throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
      });
    }
    else {  // Kiểm tra nếu có mã khách hàng
      Swal.fire({
        text: "Thêm Mặt Hàng Thành Công Thành Công",
        icon: "success"
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Tải lại trang sau khi nhấn OK
        }
      });
    }
    return response.json(); // Lấy dữ liệu JSON từ response nếu thành công
  })
  .catch(function (error) {
    // Hiển thị lỗi cho người dùng
    Swal.fire({
      icon: "error",
      text: "Lỗi thêm mặt hàng " + error.message,
    });
  });

  document.getElementById('addItemModal').style.display = 'none'; // Đóng modal
});

document.getElementById('hinh_anh_mh').addEventListener('change', function (event) {
  const file = event.target.files[0]; // Lấy tệp được chọn
  if (file) {
    const filePath = `../../img/do_uong/${file.name}`; // Đường dẫn giả lập

    // Hiển thị đường dẫn (chỉ dùng để kiểm tra)
    console.log('Đường dẫn lưu ảnh:', filePath);

    // Hiển thị xem trước ảnh
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('preview'); // Tìm phần tử img
      preview.src = e.target.result; // Gán URL ảnh vào src của img
      preview.style.display = 'block'; // Hiển thị img
    };
    reader.readAsDataURL(file); // Đọc tệp dưới dạng Data URL
  } else {
    alert('Vui lòng chọn một ảnh hợp lệ!');
  }
});
