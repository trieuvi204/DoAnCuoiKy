// <!-- display and search -->

arrItemsList = [

  {
    num : '001',
    date : '15/02/2023 10:25:37',
    importBIllCode : 'PN001',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '4',
    price : '137.000đ',
    total : '548.000đ',
  },
  {
    num : '002',
    date : '25/09/2023 12:47:59',
    importBIllCode : 'PN002',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '2',
    price : '129.000đ',
    total : '258.000đ',
  },
  {
    num : '003',
    date : '13/07/2023 15:13:42',
    importBIllCode : 'PN003',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '4',
    price : '50.000đ',
    total : '200.000đ',
  },
  {
    num : '004',
    date : '20/11/2023 11:36:18',
    importBIllCode : 'PN004',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '4',
    price : '138.000đ',
    total : '552.000đ',
  },
  {
    num : '005',
    date : '25/08/2024 10:25:37',
    importBIllCode : 'PN005',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '4',
    price : '120.000đ',
    total : '500.000đ',
  },
  {
    num : '006',
    date : '04/03/2024 10:25:37',
    importBIllCode : 'PN006',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '4',
    price : '110.000đ',
    total : '440.000đ',
  },
  {
    num : '007',
    date : '24/03/2024 10:25:37',
    importBIllCode : 'PN007',
    distributorCode : 'NPP0013',
    employeeCode : 'NV0001',
    importBillName : 'Phiếu Nhập Thức Uống',
    quantity : '2',
    price : '250.000đ',
    total : '500.000đ',
  },
]

  function displayItemList(code_selected_arr = []) {
		var items = document.getElementsByClassName('table-list-items')[0]
		items.innerHTML =
			`
			<tr>
				<td>STT</td>
				<td>Ngày Lập</td>
				<td>Mã Phiếu Nhập</td>
				<td>Mã Nhà PP</td>
				<td>Mã Nhân Viên</td>
				<td>Tên Phiếu Nhập</td>
				<td>Số Lượng (Kết / Thùng</td>
				<td>Đơn Giá</td>
				<td>Thành Tiền</td>
			</tr>
			`;
		for (var i = 0; i < arrItemsList.length; i++) {
			num = arrItemsList[i].num;
			date = arrItemsList[i].date;
			importBIllCode = arrItemsList[i].importBIllCode;
			distributorCode = arrItemsList[i].distributorCode;
			employeeCode = arrItemsList[i].employeeCode;
			importBillName = arrItemsList[i].importBillName;
			quantity = arrItemsList[i].quantity;
			price = arrItemsList[i].price;
			total = arrItemsList[i].total;

			if (code_selected_arr.length > 0) {
				console.log(importBIllCode)
				console.log(code_selected_arr)
				if (!code_selected_arr.includes(importBIllCode)) {
					continue;
				}
			}

			items.innerHTML +=
			`
			<tr>
				<tr>
				<td>${num}</td>
				<td>${date}</td>
				<td class = "importBIllCode">${importBIllCode}</td>
				<td>${distributorCode}</td>
				<td>${employeeCode}</td>
				<td>${importBillName}</td>
				<td>${quantity}</td>
				<td>${price}</td>
				<td>${total}</td>
			</tr>
			`;

		}
	}
	displayItemList();

	function selectResult() {
		var elements = document.getElementsByClassName('importBIllCode');
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
			'PN001',
			'PN002',
			'PN003',
			'PN004',
			'PN005',
			'PN006',
			'PN007',
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

// <!-- autobox -->
// <!-- display and search -->