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
var ghi_chu = ''
var date = ''
var start = ''
var end = ''
function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	console.log("🚀 ~ addCartClicked ~ shopProducts:", shopProducts)
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
	var priceText = shopProducts.getElementsByClassName('product-price')[0].innerText;
	var productImg = shopProducts.getElementsByClassName('product-Img')[0].src;
	var date_tmp = shopProducts.getElementsByClassName('select-date')[0].value;
	var start_tmp = shopProducts.getElementsByClassName('startMatch')[0].value;
	var end_tmp = shopProducts.getElementsByClassName('endMatch')[0].value;
	var note = shopProducts.getElementsByClassName('note')[0].value;

	var price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

	// Lưu thông tin vào sessionStorage
	sessionStorage.setItem("khung gio", `${start_tmp} - ${end_tmp}`);
	sessionStorage.setItem("GHI_CHU", note);
	sessionStorage.setItem("NGAY_DAT_SAN", date_tmp);
	sessionStorage.setItem("GIO_BAT_DAU", start_tmp);
	sessionStorage.setItem("GIO_KET_THUC", end_tmp);

	ghi_chu = note;
	date = date_tmp;
	start = start_tmp;
	end = end_tmp;

	// Chuyển start và end thành phút để tính toán
	function convertToMinutes(time) {
			const [hours, minutes] = time.split(':').map(Number);  // Tách giờ và phút, chuyển sang số
			return hours * 60 + minutes;  // Trả về tổng phút
	}

	var startInMinutes = convertToMinutes(start);
	var endInMinutes = convertToMinutes(end);
	var time = (endInMinutes - startInMinutes) / 60;
	sessionStorage.setItem("gia", price * time);

	// Chỉnh sửa để lấy đầy đủ giờ: phút:giây
	if (start.length === 5) {
			start = start + ":00"; // Thêm giây vào nếu không có giây
	}
	if (end.length === 5) {
			end = end + ":00"; // Thêm giây vào nếu không có giây
	}

	// Kiểm tra điều kiện trước khi tiếp tục
	if (new Date(date_tmp) <= new Date()) {
			Swal.fire({
					icon: 'error',
					text: 'Ngày đặt phải lớn hơn ngày hiện tại.',
			});
			return;
	}


	if (startInMinutes >= endInMinutes) {
			Swal.fire({
					icon: 'error',
					text: 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc.',
			});
			return;
	}

	Swal.fire({
		icon: 'success',
		text: 'Thêm vào giỏ hàng thành công.',
});
	// Nếu điều kiện hợp lệ, tiếp tục thêm sản phẩm vào giỏ hàng
	addProductToCart(title, price, productImg, date, start, end, note, time);
	updatetotal();
}




function addProductToCart(title, price, productImg, date, start, end, note, time) {
	var cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box')
	var cartItems = document.getElementsByClassName('cart-content')[0];
	var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText === title) {
			Swal.fire({
				icon: 'error',
				text: 'Bạn đã thêm vật phẩm này vào giỏ hàng !!!!',
		});
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
                                        <div class = "cart-product-title" id="ten_san">${title}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-date" id = "ngay_dat_san">Ngày: ${date}</div>
                                    </div>
																		<div class="row">
                                        <div class="cart-product-time " id = "gio_bd">Bắt đầu: ${start}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-timeOption " id = "gio_kt">Kết Thúc: ${end}</div>
                                    </div>
                                </div>
                                <div class="col-lg-6 right">
                                    <div class="row">
                                        <div class = "cart-product-price " id = "">${price * time}</div>
                                    </div>
                                    <div class="row">
                                        <div class="cart-product-note " id = "ghi_chu">Ghi chú: ${note}</div>
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
const url_getOne = 'http://localhost:8000/loaisan/module/v1/loaisan/all';
const option = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Tên sân hoặc ID sân bạn muốn tìm
const targetFieldCode = sessionStorage.getItem("ma_san");


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
		const selectedField = data.find(item => item.ma_san === targetFieldCode);

	sessionStorage.setItem("ten_san", selectedField.ten_san);

		if (selectedField) {
				// Cập nhật dữ liệu từ url_getAll
				document.querySelector('.product-title').textContent = selectedField.ten_san;
				document.querySelector('.product-Img').src = `../../../img/field_list/${selectedField.ma_san}.jpg`;
				document.querySelector('.product-price').textContent = `${selectedField.price}đ`;
				document.querySelector('.right:nth-child(2)').textContent = selectedField.openTime;

				// Fetch thêm thông tin từ url_getOne
				return fetch(url_getOne, option)
						.then(response => {
								if (!response.ok) {
										return response.json().then(errorData => {
												throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
										});
								}
								return response.json();
						})
						.then(loaisanData => {
								// Tìm thông tin loại sân tương ứng với ma_san
								const fieldType = loaisanData.find(item => item.ma_san === targetFieldCode);

								if (fieldType) {
										// Hiển thị thông tin từ url_getOne
										document.querySelector('.loaimatco').textContent += fieldType.loai_mat_co;
										document.querySelector('.kichthuocsan').textContent = fieldType.kich_thuoc_san;
										document.querySelector('.product-price').textContent = `${fieldType.gia_san}đ`;
								} else {
										Swal.fire({
												icon: 'warning',
												title: 'Không tìm thấy loại sân',
												text: `Không có thông tin loại sân phù hợp với mã: ${targetFieldCode}`,
										});
								}
						});
		} else {
				Swal.fire({
						icon: 'warning',
						title: 'Không tìm thấy sân',
						text: `Không có sân nào phù hợp với mã: ${targetFieldCode}`,
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


	const url_orders = 'http://localhost:8000/orders/module/v1/orders/create';
	handleCreatePDS();


	
	function handleCreatePDS() {
		var createBtn = document.querySelector('button.pay-btn');
		createBtn.onclick = function(event) {
			event.preventDefault(); // Ngăn chặn hành động mặc định của nút
			
			// Lấy giá trị từ các input
			
			const ma_kh = sessionStorage.getItem("ma_kh");
      var formDataStaff = {
				ma_kh: ma_kh,
        ghi_chu: ghi_chu
      };			
      createPDS(formDataStaff);
    }
  }
	
	function createPDS (data) {
		var option = {
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
	
	
		fetch(url_orders, option)
		.then(function (response) {
			// Kiểm tra xem response có thành công (status 200) không
			if (!response.ok) {
				return response.json().then(errorData => {
					// Trả về lỗi chi tiết nếu có
					throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
				});
			}
			return response.json(); // Lấy dữ liệu JSON từ response nếu thành công
		})
		.then(function (response) {
			const ma_pds = response.ma_pds; // Lấy mã phiếu đặt sân từ response
			sessionStorage.setItem('ma_pds', ma_pds);
			window.location.href = '../../pay/pay.html'
		})
		.catch(function (error) {
			// Hiển thị lỗi cho người dùng
			Swal.fire({
				icon: "error",
				text: "Registration failed	. Error: " + error.message,
			});
		});
	}
	
	
	