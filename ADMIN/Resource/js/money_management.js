//<!-- display and search -->
 	arrItemsList = [

		{
			invoiceDate : '22/12/2023',
			billCode : 'HD0001',
			userCode : 'KH0001',
			employeeCode : 'NV001',
			fieldReservationCode : 'PDS001',
			payment : '30% Trực Tuyến',
			startTime : '08H',
			endTime : '9H30',
			fieldPrice : '300.000đ',
			typeService : 'TU',
			nameSevice : 'Revive',
			quantity : '10',
			total : '450.000',
		},
		{
			invoiceDate : '28/05/2024',
			billCode : 'HD0002',
			userCode : 'KH0002',
			employeeCode : 'NV001',
			fieldReservationCode : 'PDS002',
			payment : '100% Trực Tuyến',
			startTime : '16h',
			endTime : '17H30',
			fieldPrice : '300.000đ',
			typeService : 'TU',
			nameSevice : 'Revive',
			quantity : '10',
			total : '450.000',
		},
		{
			invoiceDate : '18/05/2024',
			billCode : 'HD0003',
			userCode : 'KH0003',
			employeeCode : 'NV001',
			fieldReservationCode : 'PDS003',
			payment : '30% Trực Tuyến',
			startTime : '19H30',
			endTime : '21H',
			fieldPrice : '900.000đ',
			typeService : 'TU',
			nameSevice : 'Revive CM',
			quantity : '10',
			total : '1.050.000',
		},
		{
			invoiceDate : '25/08/2024',
			billCode : 'HD0004',
			userCode : 'KH0004',
			employeeCode : 'NV002',
			fieldReservationCode : 'PDS005',
			payment : '30% Trực Tuyến',
			startTime : '20H',
			endTime : '21H30',
			fieldPrice : '300.000đ',
			typeService : 'TU',
			nameSevice : 'Revive',
			quantity : '10',
			total : '450.000',
		},
		
		{
			invoiceDate : '43/03/2024',
			billCode : 'HD0005',
			userCode : 'KH0008',
			employeeCode : 'NV002',
			fieldReservationCode : 'PDS008',
			payment : '100% Trực Tuyến',
			startTime : '18H',
			endTime : '18H30',
			fieldPrice : '300.000đ',
			typeService : 'TU',
			nameSevice : 'Revive',
			quantity : '10',
			total : '450.000',
		},
		{
			invoiceDate : '26/05/2024',
			billCode : 'HD0006',
			userCode : 'KH0009',
			employeeCode : 'NV002',
			fieldReservationCode : 'PDS010',
			payment : '100% Trực Tuyến',
			startTime : '15h30',
			endTime : '17H',
			fieldPrice : '300.000đ',
			typeService : 'TU',
			nameSevice : 'Revive',
			quantity : '10',
			total : '450.000',
		},
	]



	function displayItemList(code_selected_arr = []) {
		var items = document.getElementsByClassName('table-list-items')[0]
		items.innerHTML =
			`
			<tr>
				<td>Ngày Lập Hóa Đơn</td>
				<td>Mã Hóa Đơn</td>
				<td>Mã Khách Hàng</td>
				<td>Mã Nhân Viên</td>
				<td>Mã Phiếu Đặt Sân</td>
				<td>Thanh Toán</td>
				<td>Giờ Bắt Đầu</td>
				<td>Giờ Kết Thúc</td>
				<td>Tiền Sân</td>
				<td>Loại Dịch Vụ</td>
				<td>Tên Dịch Vụ</td>
				<td>Số Lượng</td>
				<td>Tổng Tiền</td>
			</tr>
			`;
		for (var i = 0; i < arrItemsList.length; i++) {
			invoiceDate = arrItemsList[i].invoiceDate;
			billCode = arrItemsList[i].billCode;
			userCode = arrItemsList[i].userCode;
			employeeCode = arrItemsList[i].employeeCode;
			fieldReservationCode = arrItemsList[i].fieldReservationCode;
			payment = arrItemsList[i].payment;
			startTime = arrItemsList[i].startTime;
			endTime = arrItemsList[i].endTime;
			fieldPrice = arrItemsList[i].fieldPrice;
			typeService = arrItemsList[i].typeService;
			nameSevice = arrItemsList[i].nameSevice;
			quantity = arrItemsList[i].quantity;
			total = arrItemsList[i].total;

			if (code_selected_arr.length > 0) {
				console.log(billCode)
				console.log(code_selected_arr)
				if (!code_selected_arr.includes(billCode)) {
					continue;
				}
			}

			items.innerHTML +=
			`
			<tr>
				<tr>
				<td>${invoiceDate}</td>
				<td class = "billCode">${billCode}</td>
				<td>${userCode}</td>
				<td>${employeeCode}</td>
				<td>${fieldReservationCode}</td>
				<td>${payment}</td>
				<td>${startTime}</td>
				<td>${endTime}</td>
				<td>${fieldPrice}</td>
				<td>${typeService}</td>
				<td>${nameSevice}</td>
				<td>${quantity}</td>
				<td>${total}</td>
			</tr>
			</tr>
			`;

		}
	}
	displayItemList();



	function selectResult() {
		var elements = document.getElementsByClassName('billCode');
		var selectedValue = document.getElementById('search').value;
		var code_selected_arr = [];

		// Duyệt qua các phần tử và lấy textContent
		for (var i = 0; i < elements.length; i++) {
				var itemCodeInf = elements[i].textContent.trim();
				console.log(itemCodeInf, selectedValue)
				if (itemCodeInf === selectedValue) {
						code_selected_arr.push(itemCodeInf);
						console.log(code_selected_arr[i])
				}
		}
		displayItemList(code_selected_arr);
	}

	function deleteValue() {
		document.getElementById('search').value = '' ;
		displayItemList()
	}

//<!-- autobox -->



	let recommendList = [
			'HD0001',
			'HD0002',
			'HD0003',
			'HD0004',
			'HD0005',
			'HD0006',
	]




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