// arr
var distributorsDataApi = 'http://localhost:8000/staffs/mudule/v1/staffs/all';
var arrItemsList = [];

// Hàm khởi động
function start() {
	fetchStaffs();
}

start();

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
			console.log('Dữ liệu nhân viên:', data);
			arrItemsList = data;
			displayItemsList();
		})
		.catch(function (error) {
			console.error('Lỗi:', error);
			alert("Đã xảy ra lỗi khi lấy dữ liệu nhân viên."); // Thông báo lỗi
		});
}


// display
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
			</tr>
			`;
	for (var i = 0; i < arrItemsList.length; i++) {
		staffCode = arrItemsList[i].ma_nv;
		staffName = arrItemsList[i].ten_nv;
		staffPhoneNum = arrItemsList[i].sdt_nv;
		staffEmail = arrItemsList[i].email_nv;
		staffAddress = arrItemsList[i].dia_chi;
		staffPosition = arrItemsList[i].chuc_vu;

		items.innerHTML +=
			`
			<tr>
				<td>${staffCode}</td>
				<td>${staffName}</td>
				<td>${staffPhoneNum}</td>
				<td>${staffEmail}</td>
				<td>${staffAddress}</td>
				<td>${staffPosition}</td>
			</tr>
			`;

	}
}
displayItemsList();

// display
