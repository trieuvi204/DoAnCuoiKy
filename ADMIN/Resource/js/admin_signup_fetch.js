var DataApi = 'http://localhost:8000/staffs/module/v1/staffs/register/';

function start() {
  handleCreateStaff();
}

start();

function CreateStaffData(data) {
  var option = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(DataApi, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      alert("Mã Nhân Viên : " + response.ma_nv);
    });
}

function handleCreateStaff() {
  var createBtn = document.querySelector('.btn_sign_up button');
  createBtn.onclick = function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút

    // Lấy giá trị từ các input
    let name = document.getElementById('name').value.trim();
    let diachi = document.getElementById('diachi').value.trim();
    let sdt = document.getElementById('sdt').value.trim();
    let chucvu = document.getElementById('chucvu').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let cf_password = document.getElementById('cf_password').value.trim();

    // Biến để kiểm tra tất cả các ràng buộc
    let isValid = true;
    let phonePattern = /^[0-9]{10,11}$/;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Ràng buộc cho tên nhân viên
    if (name === "") {
      alert("Tên nhân viên không được để trống");
      isValid = false;
    }

    // Ràng buộc cho địa chỉ
    else if (diachi === "") {
      alert("Địa chỉ không được để trống");
      isValid = false;
    }

    // Ràng buộc cho số điện thoại (kiểm tra độ dài và phải là số)
    else if (!phonePattern.test(sdt)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 hoặc 11 số.");
      isValid = false;
    }

    // Ràng buộc cho chức vụ
    else if (chucvu === "") {
      alert("Chức vụ không được để trống");
      isValid = false;
    }

    // Ràng buộc cho email (kiểm tra định dạng)
    else if (!emailPattern.test(email)) {
      alert("Email không hợp lệ");
      isValid = false;
    }

    // Ràng buộc cho mật khẩu (kiểm tra độ dài)
    else if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự");
      isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    else if (password !== cf_password) {
      alert("Mật khẩu và mật khẩu xác nhận không khớp");
      isValid = false;
    }

    // Nếu tất cả các ràng buộc đều hợp lệ, tiến hành gửi form
    if (isValid) {
      // Băm mật khẩu với SHA-256
      var hashedPassword = sha256(password);

      var formDataStaff = {
        ten_nv: name,
        pass_nv: hashedPassword,
        sdt_nv: sdt,
        dia_chi: diachi,
        email_nv: email,
        chuc_vu: chucvu
      };

      CreateStaffData(formDataStaff);
      alert("Đăng ký thành công!");
    }
  }
}

function sha256(ascii) {
  // Hàm băm SHA-256 như bạn đã cung cấp
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j; // Sử dụng như bộ đếm trên toàn bộ tệp
  var result = '';

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  /* caching results is optional - remove/add slash from front of this line to toggle */
  var hash = sha256.h = sha256.h || [];
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

  ascii += '\x80'; // Thêm bit '1' vào thông điệp
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00'; // Thêm padding

  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // Kiểm tra ASCII
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength);

  // Xử lý mỗi khối
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16); // Chia thông điệp thành các khối 512-bit
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
        ) | 0);
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // Σ0
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // Ma

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  // Tạo giá trị băm cuối cùng (big-endian):
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j-- ) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
  }
  return result;
}
