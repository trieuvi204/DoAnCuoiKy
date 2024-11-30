// <!-- display and search -->

// arrItemsList = [

//   {
//     num : '001',
//     date : '15/02/2023 10:25:37',
//     importBIllCode : 'PN001',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '4',
//     price : '137.000đ',
//     total : '548.000đ',
//   },
//   {
//     num : '002',
//     date : '25/09/2023 12:47:59',
//     importBIllCode : 'PN002',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '2',
//     price : '129.000đ',
//     total : '258.000đ',
//   },
//   {
//     num : '003',
//     date : '13/07/2023 15:13:42',
//     importBIllCode : 'PN003',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '4',
//     price : '50.000đ',
//     total : '200.000đ',
//   },
//   {
//     num : '004',
//     date : '20/11/2023 11:36:18',
//     importBIllCode : 'PN004',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '4',
//     price : '138.000đ',
//     total : '552.000đ',
//   },
//   {
//     num : '005',
//     date : '25/08/2024 10:25:37',
//     importBIllCode : 'PN005',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '4',
//     price : '120.000đ',
//     total : '500.000đ',
//   },
//   {
//     num : '006',
//     date : '04/03/2024 10:25:37',
//     importBIllCode : 'PN006',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '4',
//     price : '110.000đ',
//     total : '440.000đ',
//   },
//   {
//     num : '007',
//     date : '24/03/2024 10:25:37',
//     importBIllCode : 'PN007',
//     distributorCode : 'NPP0013',
//     employeeCode : 'NV0001',
//     importBillName : 'Phiếu Nhập Thức Uống',
//     quantity : '2',
//     price : '250.000đ',
//     total : '500.000đ',
//   },
// ]

const urlGetPhieuNhap = 'http://localhost:8000/order_commodity/module/v1/order_commodity/all';
const urlGetAllChiTietPN = 'http://localhost:8000/order_commodity_detail/module/v1/order_commodity_detail/all';
const urlGetAllMatHang = 'http://localhost:8000/item/module/v1/item/all'
const option = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

let allChiTietPhieuNhap = []; // Lưu trữ toàn bộ chi tiết phiếu nhập
let allMatHang = []; // Lưu trữ toàn bộ mặt hàng

// Lấy danh sách chi tiết phiếu nhập
fetch(urlGetAllChiTietPN, option)
	.then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải chi tiết phiếu nhập từ máy chủ');
			});
		}
		return response.json();
	})
	.then(data => {
		allChiTietPhieuNhap = data; // Lưu lại toàn bộ chi tiết phiếu nhập
	})
	.catch(error => {
		Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message,
		});
	});

// Lấy danh sách Phiếu Nhập
fetch(urlGetPhieuNhap, option)
	.then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then(data => {
		data.map(item => {
			displayItemsList(item);
		});
	})
	.catch(error => {
		Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message,
		});
	});

// lấy ra tất cả các mặt hàng
fetch(urlGetAllMatHang, option)
	.then(response => {
		if (!response.ok) {
			return response.json().then(errorData => {
				throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then(data => {
		allMatHang = data;
	})
	.catch(error => {
		Swal.fire({
			icon: 'error',
			title: 'Đã xảy ra lỗi',
			text: 'Lỗi: ' + error.message,
		});
	});
// Hiển thị danh sách Phiếu Nhập
const items = document.getElementsByClassName('table-list-items')[0];
items.innerHTML =
	`
	<tr>
		<th>Mã Phiếu Nhập</th>
		<th>Mã Nhân Viên</th>
		<th>Tên Phiếu Nhập</th>
		<th>Ngày Nhập</th>
		<th>Tổng Tiền Phiếu Nhập</th>
	</tr>
	`;

function displayItemsList(data) {
	const output = `
		<tr class="phieu-nhap-row" data-ma-pn="${data.ma_pn}">
			<td>${data.ma_pn}</td>
			<td>${data.ma_nv}</td>
			<td>${data.ten_pn}</td>
			<td>${new Date(data.ngay_nhap).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
			<td>${data.tong_tien_pn}</td>
		</tr>
	`;
	items.insertAdjacentHTML('beforeend', output);

	// Gán sự kiện click cho hàng mới thêm
	const addedRow = items.querySelector(`.phieu-nhap-row[data-ma-pn="${data.ma_pn}"]`);
	addedRow.addEventListener('click', function () {
		const maPn = this.getAttribute('data-ma-pn');
		displayChiTietPhieuNhap(maPn);
	});
}

// Hàm hiển thị chi tiết phiếu nhập trong modal
function displayChiTietPhieuNhap(maPn) {
	const modal = document.getElementById('chi-tiet-modal');
	const modalContent = document.getElementById('chi-tiet-modal-content');

	// Lọc các chi tiết phiếu nhập theo mã phiếu nhập
	const filteredDetails = allChiTietPhieuNhap.filter(detail => detail.ma_pn === maPn);

	// Ghi log để kiểm tra các chi tiết phiếu nhập
	console.log("🚀 ~ filteredDetails:", filteredDetails);

	// Sắp xếp theo mã sản phẩm
	filteredDetails.sort((a, b) => a.ma_mh.localeCompare(b.ma_mh));

// Kết hợp thông tin mặt hàng vào chi tiết phiếu nhập
const detailsWithItemInfo = filteredDetails.map(detail => {
	const item = allMatHang.find(matHang => {
			return matHang.ma_mh && matHang.ma_mh.trim() === detail.ma_mh.trim(); // Thêm `return` để đảm bảo điều kiện được đánh giá đúng
	});


	return {
			...detail,
			ten_mh: item ? item.ten_mh : 'Không có tên',
			don_gia_nhap: item ? item.don_gia_nhap : 'Không có giá'
	};
});


	// Hiển thị danh sách chi tiết
	modalContent.innerHTML = `
			<h3>Chi Tiết Phiếu Nhập - Mã Phiếu Nhập: ${maPn}</h3>
			<table>
					<tr>
							<th>Mã Sản Phẩm</th>
							<th>Tên Sản Phẩm</th>
							<th>Đơn Giá Nhập</th>
							<th>Số Lượng</th>
					</tr>
					${detailsWithItemInfo.map(detail => `
							<tr>
									<td>${detail.ma_mh}</td>
									<td>${detail.ten_mh}</td>
									<td>${detail.don_gia_nhap}</td>
									<td>${detail.so_luong}</td>
							</tr>
					`).join('')}
			</table>
	`;

	// Hiển thị modal
	modal.style.display = 'block';
}


// Đóng modal
document.getElementById('chi-tiet-modal-close').addEventListener('click', function () {
	document.getElementById('chi-tiet-modal').style.display = 'none';
});

// Đóng modal khi click bên ngoài
window.addEventListener('click', function (event) {
	const modal = document.getElementById('chi-tiet-modal');
	if (event.target === modal) {
		modal.style.display = 'none';
	}
});



// 	function selectResult() {
// 		var elements = document.getElementsByClassName('importBIllCode');
// 		var selectedValue = document.getElementById('search').value;
// 		var code_selected_arr = [];

// 		// Duyệt qua các phần tử và lấy textContent
// 		for (var i = 0; i < elements.length; i++) {
// 				var itemCodeInf = elements[i].textContent.trim();
// 				console.log(itemCodeInf, selectedValue)
// 				if (itemCodeInf === selectedValue) {
// 						code_selected_arr.push(itemCodeInf);
// 						console.log(code_selected_arr[i])
// 				}
// 		}
// 		displayItemList(code_selected_arr);
// 	}

// 	function deleteValue() {
// 		document.getElementById('search').value = '' ;
// 		displayItemList()
// 	}

// //<!-- autobox -->


// 	let recommendList = [
// 			'PN001',
// 			'PN002',
// 			'PN003',
// 			'PN004',
// 			'PN005',
// 			'PN006',
// 			'PN007',
// 	]


// 	const inputSearch = document.querySelector('.search')
// 	const autoBox = document.querySelector('.autobox')

// 	inputSearch.onkeyup = (e) => {

// 			let checkData = e.target.value
// 			// console.log(checkData)
// 			let dataArr = []

// 			if (checkData) {
// 					dataArr = recommendList.filter((data)=>{
// 							return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
// 					})

// 					dataArr = dataArr.map((data) =>{
// 							return data = '<li>'+data+'</li>'
// 					})
// 					autoBox.classList.add('active')
// 					showItem(dataArr)
// 					let liItem = autoBox.querySelectorAll('li')
// 					for(let i = 0; i < liItem.length; i++){
// 							liItem[i].addEventListener('click', function(){
// 								inputSearch.value = liItem[i].innerHTML
// 								autoBox.classList.remove('active')
// 							})
// 					}
// 			}
// 			else{
// 					autoBox.classList.remove('active')

// 			}
// 	}


// 	function showItem(arr) {
// 			let listData
// 			if(!arr.length){
// 					listData = '<li>'+inputSearch.value+'</li>'
// 			}
// 			else{
// 					listData = arr.join('')
// 			}
// 			autoBox.innerHTML = listData
// 	}

// <!-- autobox -->
// <!-- display and search -->