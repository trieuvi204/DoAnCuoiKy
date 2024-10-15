var usersDataApi = 'http://localhost:8000/users/mudule/v1/users/all';
var arrItemsList = [];

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
// Hàm lấy dữ liệu người dùng từ API
function fetchUsers() {
    var option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(usersDataApi, option)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            arrItemsList = data.map(function(item) {
                return {
                    userCode: item.ma_kh,
                    userName: item.ten_kh,
                    userPhoneNumb: item.sdt_kh,
                    email: decryptExtCaesarMult(item.email_kh, 7),
                    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
                };
            });
            displayItemsList();
        })
        .catch(function (error) {
            console.error('Lỗi:', error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu người dùng.");
        });
}

// Hàm hiển thị danh sách người dùng
function displayItemsList() {
    var items = document.getElementsByClassName('table-list-items')[0];
    items.innerHTML = `
    <tr>
      <th>Mã Người Dùng</th>
      <th>Tên Người Dùng</th>
      <th>Số Điện Thoại</th>
      <th>Email</th>
      <th>Chức Năng</th>
    </tr>
    `;

    for (var i = 0; i < arrItemsList.length; i++) {
        var userCode = arrItemsList[i].userCode;
        var userName = arrItemsList[i].userName;
        var email = arrItemsList[i].email;
        var userPhoneNumb = arrItemsList[i].userPhoneNumb;
        var functions = arrItemsList[i].functions;

        items.innerHTML += `
        <tr>
          <td>${userCode}</td>
          <td>${userName}</td>
          <td>${userPhoneNumb}</td>
          <td>${email}</td>
          <td>${functions}</td>
        </tr>
        `;
    }
}

start();
