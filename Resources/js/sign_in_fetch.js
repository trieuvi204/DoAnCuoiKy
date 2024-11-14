var usersDataApi = 'http://localhost:8000/users/module/v1/users/login/';

function start() {
  handleUserLogin(); // Gọi hàm để xử lý sự kiện đăng nhập
}

start();

// Đăng ký sự kiện cho nút đăng nhập
function handleUserLogin() {
  // Lấy nút đăng nhập
  let submitBtn = document.querySelector('.btn_sign_in');

  // Gán sự kiện click cho nút đăng nhập
  submitBtn.onclick = function () {
    let email = document.getElementById("email").value; // Lấy giá trị từ input email
    let password = document.getElementById("password").value; // Lấy giá trị từ input password

    // Ràng buộc: Kiểm tra xem email và mật khẩu có trống không
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        text: "Vui lòng nhập đầy đủ email và mật khẩu.",
      });
      return; // Ngừng thực hiện nếu không có thông tin
    }

    // Ràng buộc: Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho định dạng email
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        text: "Vui lòng nhập địa chỉ email hợp lệ.",
      });
      return; // Ngừng thực hiện nếu email không hợp lệ
    }

    // Ràng buộc: Kiểm tra mật khẩu
    const passwordMinLength = 8; // Độ dài tối thiểu

    if (password.length < passwordMinLength) {
      Swal.fire({
        icon: "error",
        text: "Mật khẩu phải có ít nhất " + passwordMinLength + " ký tự.",
      });
      return; // Ngừng thực hiện nếu mật khẩu quá ngắn
    }

    // Băm mật khẩu với SHA-256
    let hashedPassword = sha256(password);

    // Tạo object chứa thông tin đăng nhập
    var formDataUser = {
      email_kh: email,
      pass_kh: hashedPassword
    };

    // Gọi hàm để gửi yêu cầu đăng nhập
    loginUser(formDataUser);
  };

}

function loginUser(formDataUser) {
  // Gửi yêu cầu POST đến API đăng nhập
  fetch(usersDataApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataUser) // Chuyển đổi dữ liệu sang định dạng JSON
  })
    .then(function (response) {
      if (response.ok) {
        return response.json(); // Chuyển đổi phản hồi JSON nếu đăng nhập thành công
      } 
      if (!response.ok) {
				return response.json().then(errorData => {
					// Trả về lỗi chi tiết nếu có
					throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
				});
			}
    })
    .then(function (data) {
      sessionStorage.setItem("ma_kh", data.ma_kh);
      sessionStorage.setItem("ten_kh", data.ten_kh);
      sessionStorage.setItem("email_kh", data.email_kh);
      sessionStorage.setItem("sdt_kh", data.sdt_kh);
      // Xử lý dữ liệu sau khi đăng nhập thành công
      Swal.fire({
        text: "Đăng nhập thành công",
        icon: "success"
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = '../../../DoAnCuoiKy - user/index.html'; // Điều hướng đến trang người dùng
        }
      });
    })
    .catch(function (error) {
      // Xử lý lỗi  
      Swal.fire({
        icon: "error",
        text: error.message,
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Tải lại trang sau khi nhấn OK
        }
      });
    });
    
}


function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  /* caching results is optional - remove/add slash from front of this line to toggle */
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 prime numbers
  var hash = sha256.h = sha256.h || [];

  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 prime numbers
  var k = sha256.k = sha256.k || [];

  var primeCounter = k[lengthProperty];
  /*/ End cached section */

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

  ascii += '\x80' // Append Ƈ' (bit length padding) to the message
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More padding

  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // ASCII check
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength)

  // Process each chunk
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16); // The message is divided into 512-bit chunks
    var oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      // Apply the SHA-256 compression function to update the hash
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
      // Calculate T2 = Σ0 + Ma
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // Σ0
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // Ma

      hash = [(temp1 + temp2) | 0].concat(hash); // Update working variables
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