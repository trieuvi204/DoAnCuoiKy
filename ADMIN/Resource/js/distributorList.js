var distributorsDataApi = 'http://localhost:8000/distributors/module/v1/distributor/all';
const url = 'http://localhost:8000/distributors/module/v1/distributor';
const editModalForm = document.querySelector('#editModal .form-user')

// Hàm khởi động
function start() {
	fetchDistributors();
}

start();

// Hàm tìm nghịch đảo modulo
function findMultInverse(a, m) {
	for (let i = 1; i < m; i++) {
		if ((a * i) % m === 1) {
			return i;
		}
	}
	return null; // Trả về null nếu không tìm thấy nghịch đảo
}

// Hàm giải mã tên nhà phân phối
function decryptMultiplicativeCaesar(ciphertext, k) {
	const modulus = 256; // Chọn 256 để tương ứng với các ký tự ASCII
	const k_inverse = findMultInverse(k, modulus); // Tìm nghịch đảo của k

	if (k_inverse === null) {
		throw new Error("Nghịch đảo không tồn tại cho khóa này.");
	}

	let decryptedText = '';
	for (let i = 0; i < ciphertext.length; i++) {
		const charCode = ciphertext.charCodeAt(i);
		const decryptedCharCode = (charCode * k_inverse) % modulus; // Giải mã
		decryptedText += String.fromCharCode(decryptedCharCode);
	}
	return decryptedText;
}

// Hàm giải mã Caesar với phép nhân
function decryptExtCaesarMult(ciphertext, k) {
	const modulus = 95; // Số ký tự có thể in được từ ASCII 32 đến 126
	const k_inverse = findMultInverse(k, modulus); // Tìm nghịch đảo của k theo modulus

	// Hàm giải mã từng ký tự
	function divideChar(c, key) {
		const ascii_val = c.charCodeAt(0);
		if (ascii_val >= 32 && ascii_val <= 126) {
			const new_val = ((ascii_val - 32) * key) % modulus + 32;
			return String.fromCharCode(new_val);
		}
		return c; // Nếu không thuộc khoảng ký tự cần giải mã, trả về ký tự gốc
	}

	let decryptedText = '';
	for (let i = 0; i < ciphertext.length; i++) {
		decryptedText += divideChar(ciphertext[i], k_inverse);
	}
	return decryptedText;
}

// Hàm giải mã DES
function decryptDES(encryptedHex, key) {
	// Chuyển đổi chuỗi hex thành byte array
	var encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);

	// Chuyển khóa sang dạng byte array
	var keyBytes = CryptoJS.enc.Utf8.parse(key);

	// IV - sử dụng cùng giá trị với mã C# của bạn
	var iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Đặt IV thành 0x0 cho mỗi byte

	// Giải mã DES với chế độ CBC và padding PKCS7
	var decrypted = CryptoJS.DES.decrypt(
		{
			ciphertext: encryptedBytes
		},
		keyBytes,
		{
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
			iv: iv
		}
	);

	// Chuyển đổi kết quả giải mã sang chuỗi UTF-8
	return decrypted.toString(CryptoJS.enc.Utf8);
}


// Hàm lấy dữ liệu nhà phân phối từ API
function fetchDistributors() {
	var option = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	fetch(distributorsDataApi, option)
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
	.then(data => {
			data.forEach(user => {
					displayItemsList(user);
			});
	})
	.catch(function (error) {
			// Hiển thị lỗi cho người dùng với SweetAlert
			Swal.fire({
					icon: 'error',
					title: 'Đã xảy ra lỗi',
					text: 'Lỗi: ' + error.message, // Hiển thị chi tiết lỗi
			});
	});

}

// Hàm hiển thị danh sách người dùng
var items = document.querySelector('.table-list-items');
items.innerHTML = `
<tr>
	<td>Mã Nhà PP</td>
	<td>Tên NPP</td>
	<td>Địa Chỉ</td>
	<td>Số Điện thoại</td>
	<td>Email</td>
	<td>Chức Năng</td>
</tr>
`;
const displayItemsList = (user) => {
	const output = `
			<tr data-id='${user.ma_npp}'>
				<td>${user.ma_npp}</td>
				<td>${user.ten_npp}</td>
				<td>${decryptDES(user.dc_npp,'Thats my Kung Fu')}</td>
				<td>${user.sdt_npp}</td>
				<td>${user.email_npp}</td>
				<td>
					<button class = "disableBtn delete btn_del"><i class="fa-solid fa-trash-can  "></i></button>
					<button class = "disableBtn update btn_edit"><i class="fa-solid fa-pen-to-square  "></i></button>
				</td>
			</tr>
	`;
	items.insertAdjacentHTML('beforeend', output);

	// Kiểm tra sự tồn tại của phần tử .btn_del
	const btnDel = document.querySelector(`[data-id='${user.ma_npp}'] .btn_del`);
	if (btnDel) {
		btnDel.addEventListener('click', (e) => {
				// Hiển thị thông báo xác nhận
				Swal.fire({
						title: `Bạn có chắc chắn muốn xóa nhà phân phối ${user.ten_npp} không?`,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Có',
						cancelButtonText: 'Không',
				}).then((result) => {
						if (result.isConfirmed) {
								fetch(`${url}/delete/${user.ma_npp}`, {
										method: 'DELETE'
								})
								.then(res => {
										if (!res.ok) {
												return res.json().then(errorData => {
														// Trả về lỗi chi tiết nếu có
														throw new Error(errorData.detail || 'Lỗi khi xóa dữ liệu từ máy chủ');
												});
										}
										return res.json();
								})
								.then(() => {
										Swal.fire({
												icon: 'success',
												text: 'Xóa Thành Công',
										}).then(() => {
												location.reload(); // Làm mới trang sau khi xóa thành công
										});
								})
								.catch((error) => {
										// Hiển thị lỗi cho người dùng
										Swal.fire({
												icon: 'error',
												title: 'Có lỗi xảy ra',
												text: `Lỗi: ${error.message}`,
										});
								});
						} else {
								console.log('Xóa bị hủy');
						}
				});
		});
	}
	else {
			console.error('Không tìm thấy nút xóa');
	}


	// // Kiểm tra sự tồn tại của phần tử .btn_edit
	const btnEdit = document.querySelector(`[data-id='${user.ma_npp}'] .btn_edit`);
	if (btnEdit) {
		btnEdit.addEventListener('click', (e) => {
			e.preventDefault();

			id = user.ma_npp;  // Sử dụng mã nhân viên để chỉnh sửa
			$("#editModal").modal('show');

			// Cập nhật các trường trong form sửa thông tin
			editModalForm.fullname.value = user.ten_npp;
			editModalForm.phone.value = decryptExtCaesarMult(user.sdt_npp, 7);
			editModalForm.email.value = user.email_npp;
			editModalForm.address.value = decryptDES(user.dc_npp, 'Thats my Kung Fu');
		});
	} else {
		console.error('Không tìm thấy nút chỉnh sửa');
	}

	var userRole = sessionStorage.getItem('chuc_vu')
	if (userRole !== 'admin') {
		const buttons = document.querySelectorAll('.disableBtn'); // Lấy tất cả nút có class disableBtn
	
		buttons.forEach(function (btn) {
			// Vô hiệu hóa nút
			btn.disabled = true;
			btn.style.opacity = '0.3';
			btn.style.cursor = 'not-allowed';
	
			// Ngăn chặn hành động khi nút được nhấn
			btn.addEventListener('click', function (event) {
				event.preventDefault(); // Ngăn hành động mặc định
				event.stopImmediatePropagation(); // Ngăn các sự kiện khác
				alert('Bạn không có quyền thực hiện hành động này!');
			});
		});
	}
};


editModalForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Kiểm tra các ràng buộc
	const fullname = editModalForm.fullname.value.trim();
	const phone = editModalForm.phone.value.trim();
	const email = editModalForm.email.value.trim();
	const address = editModalForm.address.value.trim();

// Kiểm tra tên không để trống
if (fullname === '') {
	Swal.fire({
			icon: 'error',
			title: 'Lỗi',
			text: 'Tên không được để trống',
	});
	return;
}

// Kiểm tra số điện thoại hợp lệ (10 chữ số)
if (phone === '' || !/^\d{10}$/.test(phone)) {
	Swal.fire({
			icon: 'error',
			title: 'Lỗi',
			text: 'Số điện thoại không hợp lệ (phải là 10 chữ số)',
	});
	return;
}

// Kiểm tra định dạng email hợp lệ
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (email === '' || !emailPattern.test(email)) {
	Swal.fire({
			icon: 'error',
			title: 'Lỗi',
			text: 'Email không hợp lệ',
	});
	return;
}

// Kiểm tra địa chỉ không để trống
if (address === '') {
	Swal.fire({
			icon: 'error',
			title: 'Lỗi',
			text: 'Địa chỉ không được để trống',
	});
	return;
}

// Gửi yêu cầu PUT để cập nhật thông tin
fetch(`${url}/edit/${id}`, {
	method: 'PUT',
	headers: {
			'Content-Type': 'application/json'
	},
	body: JSON.stringify({
			ten_npp: fullname,
			sdt_npp: phone,
			email_npp: email,
			dc_npp: address,
	})
})
.then((response) => {
	// Kiểm tra xem response có thành công (status 200) không
	if (!response.ok) {
			return response.json().then(errorData => {
					// Trả về lỗi chi tiết nếu có
					throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
	}

	// Nếu cập nhật thành công, hiển thị thông báo và làm mới trang
	Swal.fire({
			icon: 'success',
			title: 'Sửa thông tin thành công!',
			text: 'Thông tin nhà phân phối đã được cập nhật.',
	}).then(() => {
			location.reload(); // Làm mới trang sau khi người dùng nhấn "OK"
	});
})
.catch((error) => {
	// Hiển thị lỗi cho người dùng
	Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message, // Hiển thị thông báo lỗi chi tiết
	});
});


	// Xóa dữ liệu sau khi gửi yêu cầu
	editModalForm.fullname.value = '';
	editModalForm.phone.value = '';
	editModalForm.email.value = '';
	editModalForm.address.value = '';
});



