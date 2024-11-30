

	const urtGetBill = 'http://localhost:8000/bill/module/v1/bill/all'
	const urlPDS = 'http://localhost:8000/orders/module/v1/orders/detail?ma_pds='
	const urlChi_Tiet_PDS = 'http://localhost:8000/order-items/module/v1/order-items/detail?ma_pds='

	const option = {
		method: 'GET',
		headers: {
				'Content-Type': 'application/json'
		}
	};
	

	fetch(urtGetBill, option)
	.then (response =>{
		if (!response.ok) {
			return response.json().then(errorData => {
					throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
			});
		}
		return response.json();
	})
	.then (bills =>{
		// console.log("🚀 ~ data:", data)
		bills.forEach(bill => {
			fetch(`${urlPDS}${bill.ma_pds}`, option)
			.then(response => {
				if (!response.ok) {
						return response.json().then(errorData => {
								throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
						});
				}
				return response.json();
			})
			.then(order => {
				// console.log("🚀 ~ data:", data)
					fetch(`${urlChi_Tiet_PDS}${order.ma_pds}`, option)
					.then(response => {
						if (!response.ok) {
								return response.json().then(errorData => {
										throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
								});
						}
						return response.json();
					})
					.then(orderItem => {
						displayItemsList(bill, order, orderItem);
					})
					.catch(error => {
						Swal.fire({
								icon: 'error',
								title: 'Đã xảy ra lỗi',
								text: 'Lỗi: ' + error.message,
						});
					});
			})
			.catch(error => {
				Swal.fire({
						icon: 'error',
						title: 'Đã xảy ra lỗi',
						text: 'Lỗi: ' + error.message,
				});
			});
		})
		
	})
	.catch(error => {
		Swal.fire({
				icon: 'error',
				title: 'Đã xảy ra lỗi',
				text: 'Lỗi: ' + error.message,
		});
	});

		
	


	var items = document.getElementsByClassName('table-list-items')[0]
	items.innerHTML =
		`
		<tr>
			<th>Mã Hóa Đơn</th>
			<th>Mã Phiếu Đặt Sân</th>
			<th>Mã Nhân Viên</th>
			<th>Mã Khách Hàng</th>
			<th>Ngày Lập</th>
			<th>Ngày Đặt Sân</th>
			<th>Giờ Bắt Đầu</th>
			<th>Giờ Kết Thúc</th>
			<th>Ghi Chú</th>
			<th>Hình Thức Thanh Toán</th>
			<th>Hạn Mức Thanh Toán</th>
			<th>Tiền Sân</th>
			<th>Tổng Tiền Hóa Đơn</th>
		</tr>
		`;
		function displayItemsList(bill, order, orderItem) {
			console.log("🚀 ~ displayItemsList ~ bill:", bill)
			console.log("🚀 ~ displayItemsList ~ order:", order)
			console.log("🚀 ~ displayItemsList ~ orderItem:", orderItem)
			const output  =
				`
			<tr>
				<td class = "billCode">${bill.ma_hd}</td>
				<td>${order.ma_pds}</td>
				<td>${bill.ma_nv}</td>
				<td>${order.ma_kh}</td>
				<td>${new Date(bill.ngay_lap).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
				<td>${new Date(orderItem.ngay_dat_san).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
        <td>${new Date(orderItem.gio_bd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
        <td>${new Date(orderItem.gio_kt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
				<td>${orderItem.ghi_chu}</td>
				<td>${bill.hinh_thuc_thanh_toan}</td>
        <td>${bill.han_muc_thanh_toan}</td>
        <td>${bill.tong_tien_hd}</td>
        <td>${bill.tong_tien_hd}</td>
			</tr>
			`;
		items.insertAdjacentHTML('beforeend', output);
	}








	const inputSearch = document.querySelector('.search')
	const autoBox = document.querySelector('.autobox')

	inputSearch.onkeyup = (e) => {

			let checkData = e.target.value
			// console.log(checkData)
			let dataArr = []

			if (checkData) {
					dataArr = recommendList.filter((data)=>{
							return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
					})

					dataArr = dataArr.map((data) =>{
							return data = '<li>'+data+'</li>'
					})
					autoBox.classList.add('active')
					showItem(dataArr)
					let liItem = autoBox.querySelectorAll('li')
					for(let i = 0; i < liItem.length; i++){
							liItem[i].addEventListener('click', function(){
								inputSearch.value = liItem[i].innerHTML
								autoBox.classList.remove('active')
							})
					}
			}
			else{
					autoBox.classList.remove('active')

			}
	}


	function showItem(arr) {
			let listData
			if(!arr.length){
					listData = '<li>'+inputSearch.value+'</li>'
			}
			else{
					listData = arr.join('')
			}
			autoBox.innerHTML = listData
	}


//<!-- autobox -->
//<!-- display and search -->