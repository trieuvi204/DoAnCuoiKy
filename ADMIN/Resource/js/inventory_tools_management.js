
//<!-- display and search -->

	arrItemsList = [

		{
			imgSrc : '../../img/tools/ao_pitch.jpg',
			itemName : 'Áo Picth',
			distributor: 'NPP: Aobongda.net',
			itemPrice: '7.200đ',
			itemQuantity: '20',
			totalPrice: '144.000đ'
		},
		{
			imgSrc : '../../img/tools/luoi_bong_da.jpg',
			itemName : 'Lưới Bóng Đá',
			distributor: 'NPP: Sodex Sport',
			itemPrice: '556.000đ',
			itemQuantity: '10',
			totalPrice: '5.560.000đ'
		},
		{
			imgSrc : '../../img/tools/bong-da-Thien-Long.jpg',
			itemName : 'Bóng',
			distributor: 'NPP: Thiên Long Sport',
			itemPrice: '109.000đ',
			itemQuantity: '10',
			totalPrice: '1.090.000đ'
		},
		{
			imgSrc : '../../img/tools/den_da_bong.jpg',
			itemName : 'Đèn Sân Bóng',
			distributor: 'NPP: Chí Hào Sport',
			itemPrice: '6.700.000đ',
			itemQuantity: '8',
			totalPrice: '53.600.000đ'
		},

	]

	function displayItemList(name_selected_arr = []) {
		var items = document.getElementsByClassName('items-list')[0]
		items.innerHTML = '';
		for (var i = 0; i < arrItemsList.length; i++) {
			imgSrc = arrItemsList[i].imgSrc;
			itemName = arrItemsList[i].itemName;
			distributor = arrItemsList[i].distributor;
			itemPrice = arrItemsList[i].itemPrice;
			itemQuantity = arrItemsList[i].itemQuantity;
			totalPrice = arrItemsList[i].totalPrice;
			// filter
			if (name_selected_arr.length > 0) {
					if (!name_selected_arr.includes(itemName)) {
							continue;
					}
			}

			items.innerHTML +=
				`
			<div class="col-lg-4 ">
				<div class="item">
					<div class="row">
						<div class="col-lg-6 img">
							<img src="${imgSrc}" alt="">
						</div>
						<div class="col-lg-6">
							<h3 class="title-drinks-items">${itemName}</h3>
							<p class="distributor">${distributor}</p>
							<p >Giá bán sỉ thùng: <span class="price">${itemPrice}</span></p>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<div class="quantity-drinks-item">
								<input type="number" class="quantity" value= "${itemQuantity}">
								<div class="total">
									<p>Tổng: <span class="price">${totalPrice}</span></p>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<button class="add-to-cart">Thêm vào giỏ hàng</button>
						</div>
					</div>
				</div>
			</div>
				`;

		}
	}
	displayItemList();

	function selectResult() {

			var elements = document.getElementsByClassName('title-drinks-items');
			var selectedValue = document.getElementById('search').value;
			var name_selected_arr = [];

			// Duyệt qua các phần tử và lấy textContent
			for (var i = 0; i < elements.length; i++) {
					var itemNameInf = elements[i].textContent.trim();
					console.log(itemNameInf.toUpperCase(), selectedValue.toUpperCase())
					if (itemNameInf.toUpperCase() === selectedValue.toUpperCase()) {
							name_selected_arr.push(itemNameInf);
					}
			}
			displayItemList(name_selected_arr);

	}

	
	function deleteValue() {
					document.getElementById('search').value = '' ;
					displayItemList()
        }


//<!-- autobox -->


	let recommendList = [
			'Áo Picth',
			'Lưới Bóng Đá',
			'Bóng',
			'Đèn Sân Bóng',
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