var usersDataApi = 'http://localhost:8000/users/module/v1/users/all';
var url = 'http://localhost:8000/users/module/v1/users';

const editModalForm = document.querySelector('#editModal .form-user')
// Hàm khởi động
function start() {
	fetchUsers();
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

// Hàm lấy dữ liệu người dùng từ API
function fetchUsers() {
    var option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(usersDataApi, option)
        .then(function (response) {
            // Kiểm tra xem response có thành công (status 200) không
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
                });
            }
            return response.json(); // Lấy dữ liệu JSON từ response nếu thành công
        })
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                // Xóa danh sách cũ và hiển thị tiêu đề bảng
                items.innerHTML = `
                <tr>
                    <th>Mã Người Dùng</th>
                    <th>Tên Người Dùng</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Chức Năng</th>
                </tr>`;
                
                // Render từng người dùng ra bảng
                data.forEach((user) => displayItemsList(user));
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Không có dữ liệu',
                    text: 'Hiện không có người dùng nào.',
                });
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Đã xảy ra lỗi',
                text: error.message,
            });
        });
}

// DOM phần danh sách bảng
var items = document.querySelector('.table-list-items');

// Hàm hiển thị danh sách người dùng
const displayItemsList = (user) => {
    try {
        // Giải mã số điện thoại và email
        const ma_kh = user.ma_kh || 'N/A';
        const ten_kh = user.ten_kh || 'N/A';
        const sdt_kh = decryptDES(user.sdt_kh, 'Thats my Kung Fu') || 'Không xác định';
        const email_kh = user.email_kh|| 'Không xác định';

        // Tạo hàng mới trong bảng
        const output = `
        <tr data-id='${ma_kh}'>
            <td>${ma_kh}</td>
            <td>${ten_kh}</td>
            <td>${sdt_kh}</td>
            <td>${email_kh}</td>
            <td>
                <i class="fa-solid fa-trash-can delete btn_del"></i>
                <i class="fa-solid fa-pen-to-square update btn_edit"></i>
            </td>
        </tr>`;
        items.insertAdjacentHTML('beforeend', output);
    } catch (error) {
        console.error('Lỗi khi hiển thị người dùng:', error);
    }

	// delete
const btnDel = document.querySelector(`[data-id = '${user.ma_kh}'] .btn_del`);
btnDel.addEventListener('click', (e) => {
  // Hiển thị thông báo xác nhận bằng SweetAlert
  Swal.fire({
    title: `Bạn có chắc chắn muốn xóa khách hàng ${user.ten_kh} không?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}/delete/${user.ma_kh}`, {
        method: 'DELETE'
      })
        .then(function (response) {
          // Kiểm tra xem response có thành công (status 200) không
          if (!response.ok) {
            return response.json().then(errorData => {
              // Trả về lỗi chi tiết nếu có
              throw new Error(errorData.detail || 'Lỗi khi xóa dữ liệu từ máy chủ');
            });
          }
          return response.json();
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: 'Xóa Thành Công',
          }).then(() => {
            location.reload(); // Làm mới trang sau khi người dùng nhấn "OK"
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: error.message, // Hiển thị thông báo lỗi chi tiết
          });
        });
    } else {
      console.log('Xóa bị hủy');
    }
  });
});

	const btnEdit = document.querySelector(`[data-id = '${user.ma_kh}'] .btn_edit`);
	btnEdit.addEventListener('click', (e) => {
		e.preventDefault();

		id = user.ma_kh;
		$("#editModal").modal('show');
		// console.log('edit')

		editModalForm.fullname.value = user.ten_kh;
		editModalForm.phone.value = decryptDES(user.sdt_kh, 'Thats my Kung Fu');
		editModalForm.password.value = '';
	})
}

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
	const password = editModalForm.password.value.trim();

	if (fullname === '') {
			Swal.fire({
					icon: 'error',
					text: 'Tên không được để trống',
			});
			return;
	}

	if (phone === '' || !/^\d{10}$/.test(phone)) {
			Swal.fire({
					icon: 'error',
					text: 'Số điện thoại không hợp lệ (phải là 10 chữ số)',
			});
			return;
	}

	if (password === '' || password.length < 8) {
			Swal.fire({
					icon: 'error',
					text: 'Mật khẩu phải có ít nhất 8 ký tự',
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
					ten_kh: fullname,
					sdt_kh: phone,
					pass_kh: sha256(password)  // Mã hóa mật khẩu trước khi gửi
			})
	})
			.then(function (response) {
					// Kiểm tra xem response có thành công (status 200) không
					if (!response.ok) {
							return response.json().then(errorData => {
									// Trả về lỗi chi tiết nếu có
									throw new Error(errorData.detail || 'Lỗi khi sửa dữ liệu từ máy chủ');
							});
					}
					return response.json();
			})
			.then((response) => {
					// Hiển thị thông báo thành công
					Swal.fire({
							icon: 'success',
							text: 'Sửa thông tin khách hàng thành công',
					}).then(() => {
							location.reload(); // Làm mới trang sau khi người dùng nhấn "OK"
					});
			})
			.catch(function (error) {
					// Hiển thị lỗi chi tiết nếu có
					Swal.fire({
							icon: 'error',
							title: 'Lỗi',
							text: `Erro: ${error.message}`,
					});
			});

	// Xóa dữ liệu sau khi gửi yêu cầu
	editModalForm.fullname.value = '';
	editModalForm.phone.value = '';
	editModalForm.password.value = '';
});



