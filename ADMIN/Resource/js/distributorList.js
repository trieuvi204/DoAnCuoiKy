var distributorsDataApi = 'http://localhost:8000/distributors/mudule/v1/distributor/all'; // Đường dẫn đến API nhà phân phối
var arrItemsList = []; // Danh sách nhà phân phối

// Hàm khởi động
function start() {
    fetchDistributors(); // Gọi hàm để lấy dữ liệu nhà phân phối
}

start();

// Hàm lấy dữ liệu nhà phân phối từ API
function fetchDistributors() {
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
            console.log('Dữ liệu nhà phân phối:', data);
            arrItemsList = data; // Gán dữ liệu vào arrItemsList
            displayItemsList(); // Hiển thị danh sách nhà phân phối
        })
        .catch(function (error) {
            console.error('Lỗi:', error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu nhà phân phối."); // Thông báo lỗi
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