// arr
var distributorsDataApi = 'http://localhost:8000/staffs/module/v1/staffs/all';
var arrItemsList = [];

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
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json(); // Chuyển đổi phản hồi thành JSON
		})
		.then(function (data) {
			arrItemsList = data.map(function(item) {
					return {
							ma_nv: item.ma_nv,
							ten_nv: item.ten_nv,
							sdt_nv: item.sdt_nv,
							email_nv: item.email_nv, 
							dia_chi: item.dia_chi,
							chuc_vu: item.chuc_vu,
							functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
					};
			});
			displayItemsList();
	})
		.catch(function (error) {
			console.error('Lỗi:', error);
			alert("Đã xảy ra lỗi khi lấy dữ liệu nhân viên."); // Thông báo lỗi
		});
}

// Hàm hiển thị dữ liệu lên bảng
function displayItemsList() {
	var items = document.getElementsByClassName('table-list-items')[0]
	items.innerHTML =
		`
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

	const decryptionKey = 7; // Khóa đã sử dụng để mã hóa 

	for (var i = 0; i < arrItemsList.length; i++) {
		let staffCode = arrItemsList[i].ma_nv;
		let staffName = arrItemsList[i].ten_nv;
		let staffPhoneNum = arrItemsList[i].sdt_nv;
		let staffEmail = decryptCaesarMult(arrItemsList[i].email_nv, decryptionKey); // Giải mã email
		let staffAddress =  decryptDES(arrItemsList[i].dia_chi,'Thats my Kung Fu');
		let staffPosition = arrItemsList[i].chuc_vu;
		var functions = arrItemsList[i].functions;


		items.innerHTML +=
			`	<tr>
					<td>${staffCode}</td>
					<td>${staffName}</td>
					<td>${staffPhoneNum}</td>
					<td>${staffEmail}</td>
					<td>${staffAddress}</td>
					<td>${staffPosition}</td>
					<td>${functions}</td>

				</tr>
			`;
	}
}
displayItemsList();

// display
