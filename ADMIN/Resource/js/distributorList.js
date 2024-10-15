var distributorsDataApi = 'http://localhost:8000/distributors/mudule/v1/distributor/all';
var arrItemsList = [];

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
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            arrItemsList = data.map(function(item) {
                return {
                    ...item,
                    ten_npp: decryptMultiplicativeCaesar(item.ten_npp, 7), // Giải mã tên NPP
                    dc_npp: decryptExtCaesarMult(item.dc_npp, 7),         // Giải mã địa chỉ
                    sdt_npp: decryptExtCaesarMult(item.sdt_npp, 7),       // Giải mã số điện thoại
                    email_npp: decryptExtCaesarMult(item.email_npp, 7)    // Giải mã email
                };
            });
            console.log("🚀 ~ arrItemsList=data.map ~ arrItemsList:", arrItemsList);
            displayItemsList();
        })
        .catch(function (error) {
            console.error('Lỗi:', error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu nhà phân phối.");
        });
}

// Hàm hiển thị danh sách nhà phân phối
function displayItemsList() {
    var items = document.getElementsByClassName('table-list-items')[0];
    items.innerHTML = `
    <tr>
      <th>MÃ Nhà PP</th>
      <th>Mã Nhân Viên</th>
      <th>Tên NPP</th>
      <th>Địa Chỉ</th>
      <th>Số Điện Thoại</th>
      <th>Email</th>
    </tr>
    `;

    for (var i = 0; i < arrItemsList.length; i++) {
        var MA_NPP = arrItemsList[i].ma_npp;
        var MA_NV = arrItemsList[i].ma_nv;
        var TEN_NPP = arrItemsList[i].ten_npp;
        var DC_NPP = arrItemsList[i].dc_npp;
        var SDT_NPP = arrItemsList[i].sdt_npp;
        var EMAIL_NPP = arrItemsList[i].email_npp;

        items.innerHTML += `
        <tr>
          <td>${MA_NPP}</td>
          <td>${MA_NV}</td>
          <td>${TEN_NPP}</td>
          <td>${DC_NPP}</td>
          <td>${SDT_NPP}</td>
          <td>${EMAIL_NPP}</td>
        </tr>
        `;
    }
}
