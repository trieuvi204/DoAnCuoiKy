// arr
var distributorsDataApi = 'http://localhost:8000/staffs/module/v1/staffs/all';
const url = 'http://localhost:8000/staffs/module/v1/staffs';
const editModalForm = document.querySelector('#editModal .form-user')

// Hàm khởi động
function start() {
	fetchStaffs();
}

start();
// Hàm tìm nghịch đảo modulo
function findMultInverse(a, m) {
	let t1 = 0, t2 = 1, r1 = m, r2 = a, q, t, r;

	while (r2 > 0) {
		q = Math.floor(r1 / r2);
		r = r1 - q * r2;
		r1 = r2;
		r2 = r;

		t = t1 - q * t2;
		t1 = t2;
		t2 = t;
	}

	if (t1 < 0) {
		t1 += m;
	}

	return t1;
}

// Hàm giải mã ký tự theo Caesar Multiplicative
function divideChar(c, key, modulus) {
	let ascii_val = c.charCodeAt(0);
	let new_val;

	if (ascii_val >= 32 && ascii_val <= 126) {
		new_val = ((ascii_val - 32) * key) % modulus + 32;
		return String.fromCharCode(new_val);
	} else {
		return c;
	}
}

// Hàm giải mã toàn bộ chuỗi
function decryptCaesarMult(enc, k) {
	const modulus = 95; // ASCII 32-126, phạm vi 95 ký tự có thể in được
	let k_inverse = findMultInverse(k, modulus); // Tìm nghịch đảo của key
	let decrypted = '';

	for (let i = 0; i < enc.length; i++) {
		decrypted += divideChar(enc[i], k_inverse, modulus);
	}

	return decrypted;
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


// Hàm lấy dữ liệu nhân viên
function fetchStaffs() {
	var option = {
		method: 'GET', // Sử dụng phương thức GET để lấy dữ liệu
		headers: {
			'Content-Type': 'application/json' // Đảm bảo sử dụng Content-Type đúng
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
				displayItemsList(user)
			});
		})
		.catch(function (error) {
			// Hiển thị lỗi cho người dùng
			alert("Error: " + error.message); // Hiển thị thông báo lỗi chi tiết
		});
}

// Hàm hiển thị danh sách người dùng
var items = document.querySelector('.table-list-items');
items.innerHTML = `
<tr>
		<td>Mã Nhân Viên</td>
		<td>Tên Nhân Viên</td>
		<td>Số Điện Thoại</td>
		<td>Email</td>
		<td>Địa Chỉ</td>
		<td>Chức Vụ</td>
		<td>Chức Năng</td>

</tr>
`;
const displayItemsList = (user) => {
	const output = `
			<tr data-id='${user.ma_nv}'>
					<td>${user.ma_nv}</td>
					<td>${user.ten_nv}</td>
					<td>${user.sdt_nv}</td>
					<td>${decryptCaesarMult(user.email_nv, 7)}</td>
					<td>${decryptDES(user.dia_chi, 'Thats my Kung Fu')}</td>
					<td>${user.chuc_vu}</td>
					<td>
							<i class="fa-solid fa-trash-can delete btn_del"></i>
							<i class="fa-solid fa-pen-to-square update btn_edit"></i>
					</td>
			</tr>
	`;
	items.insertAdjacentHTML('beforeend', output);

	// Kiểm tra sự tồn tại của phần tử .btn_del
	const btnDel = document.querySelector(`[data-id='${user.ma_nv}'] .btn_del`);
	if (btnDel) {
		btnDel.addEventListener('click', (e) => {
			// Hiển thị thông báo xác nhận
			const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa khách hàng ${user.ten_nv} không?`);

			if (isConfirmed) {
				fetch(`${url}/delete/${user.ma_nv}`, {
					method: 'DELETE'
				})
					.then(res => res.json())
					.then(() => {
						alert('Xóa Thành Công');
						location.reload();  // Làm mới trang sau khi xóa thành công
					})
					.catch((error) => {
						console.error('Có lỗi xảy ra:', error);
					});
			} else {
				console.log('Xóa bị hủy');
			}
		});
	} else {
		console.error('Không tìm thấy nút xóa');
	}

	// Kiểm tra sự tồn tại của phần tử .btn_edit
	const btnEdit = document.querySelector(`[data-id='${user.ma_nv}'] .btn_edit`);
	if (btnEdit) {
		btnEdit.addEventListener('click', (e) => {
			e.preventDefault();

			id = user.ma_nv;  // Sử dụng mã nhân viên để chỉnh sửa
			$("#editModal").modal('show');

			// Cập nhật các trường trong form sửa thông tin
			editModalForm.fullname.value = user.ten_nv;
			editModalForm.phone.value = user.sdt_nv;
			editModalForm.email.value = decryptCaesarMult(user.email_nv, 7);
			editModalForm.address.value = decryptDES(user.dia_chi, 'Thats my Kung Fu');
			editModalForm.position.value = user.chuc_vu;
			editModalForm.password.value = '';  // Để trống mật khẩu trong form
		});
	} else {
		console.error('Không tìm thấy nút chỉnh sửa');
	}
};


function sha256(ascii) {
	// Hàm băm SHA-256 giống như đã cho trước đó
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	}

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length';
	var i, j; // Sử dụng như một bộ đếm trong toàn bộ file
	var result = '';

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	var hash = sha256.h = sha256.h || [];
	var k = sha256.k = sha256.k || [];

	var primeCounter = k[lengthProperty];

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += '\x80'; // Append '1' (bit length padding) to the message
	while (ascii[lengthProperty] % 64 - 56) ascii += '\x00'; // More padding

	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // Kiểm tra ASCII
		words[i >> 2] |= j << ((3 - i) % 4) * 8;
	}
	words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
	words[words[lengthProperty]] = (asciiBitLength);

	// Process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // Chia thông điệp thành các khối 512 bit
		var oldHash = hash;
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			var w15 = w[i - 15], w2 = w[i - 2];

			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // Σ1
				+ ((e & hash[5]) ^ ((~e) & hash[6])) // Ch
				+ k[i]
				+ (w[i] = (i < 16) ? w[i] : (
					w[i - 16]
					+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // σ0
					+ w[i - 7]
					+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // σ1
				) | 0
				);

			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // Σ0
				+ ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // Ma

			hash = [(temp1 + temp2) | 0].concat(hash);
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	// Produce the final hash value (big-endian):
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
}
editModalForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Kiểm tra các ràng buộc
	const fullname = editModalForm.fullname.value.trim();
	const phone = editModalForm.phone.value.trim();
	const email = editModalForm.email.value.trim();
	const address = editModalForm.address.value.trim();
	const position = editModalForm.position.value.trim();
	const password = editModalForm.password.value.trim();

	// Kiểm tra tên không để trống
	if (fullname === '') {
		alert('Tên không được để trống');
		return;
	}

	// Kiểm tra số điện thoại hợp lệ (10 chữ số)
	if (phone === '' || !/^\d{10}$/.test(phone)) {
		alert('Số điện thoại không hợp lệ (phải là 10 chữ số)');
		return;
	}

	// Kiểm tra định dạng email hợp lệ
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (email === '' || !emailPattern.test(email)) {
		alert('Email không hợp lệ');
		return;
	}

	// Kiểm tra địa chỉ không để trống
	if (address === '') {
		alert('Địa chỉ không được để trống');
		return;
	}

	// Kiểm tra chức vụ không để trống
	if (position === '') {
		alert('Chức vụ không được để trống');
		return;
	}

	// Kiểm tra mật khẩu có ít nhất 8 ký tự
	if (password === '' || password.length < 8) {
		alert('Mật khẩu phải có ít nhất 8 ký tự');
		return;
	}

	// Gửi yêu cầu PUT để cập nhật thông tin
	fetch(`${url}/edit/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ten_nv: fullname,
			sdt_nv: phone,
			email_nv: email,
			dia_chi: address,
			chuc_vu: position,
			pass_nv: sha256(password)
		})
	})
		.then(res => res.json())
		.then((response) => {
			alert('Sửa thông tin khách hàng thành công');
			location.reload();  // Làm mới trang sau khi cập nhật thành công
		})
		.catch(function (error) {
			// Hiển thị lỗi cho người dùng
			alert("Lỗi: " + error.message); // Hiển thị thông báo lỗi chi tiết
		});

	// Xóa dữ liệu sau khi gửi yêu cầu
	editModalForm.fullname.value = '';
	editModalForm.phone.value = '';
	editModalForm.email.value = '';
	editModalForm.address.value = '';
	editModalForm.position.value = '';
	editModalForm.password.value = '';
});


