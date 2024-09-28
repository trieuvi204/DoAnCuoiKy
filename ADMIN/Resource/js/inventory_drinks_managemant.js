// <!-- display and search -->
	arrItemsList = [

		{
			imgSrc: '../../img/do_uong/aquarius.jpg',
			itemName: 'Aquarius',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '137.000đ',
			itemQuantity: '1',
			totalPrice: '137.000đ'
		},
		{
			imgSrc: '../../img/do_uong/bo_huc_250ml.png',
			itemName: 'Redbull',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '232.000đ',
			itemQuantity: '1',
			totalPrice: '232.000đ'
		},
		{
			imgSrc: '../../img/do_uong/coca.jpg',
			itemName: 'Coca',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '129.000đ',
			itemQuantity: '1',
			totalPrice: '129.000đ'
		},
		{
			imgSrc: '../../img/do_uong/nuoc_suoi.jpg',
			itemName: 'Nước Suối',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '50.000đ',
			itemQuantity: '1',
			totalPrice: '50	.000đ'
		},
		{
			imgSrc: '../../img/do_uong/nutri_cam.jpg',
			itemName: 'Nutri Cam',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '180.000đ',
			itemQuantity: '2',
			totalPrice: '360.000đ'
		},
		{
			imgSrc: '../../img/do_uong/nutri_cookies.jpg',
			itemName: 'Nutri Cookies',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '180.000đ',
			itemQuantity: '2',
			totalPrice: '360.000đ'
		},
		{
			imgSrc: '../../img/do_uong/revive.jpg',
			itemName: 'Revive',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '138.000đ',
			itemQuantity: '10',
			totalPrice: '1.380.000đ'
		},
		{
			imgSrc: '../../img/do_uong/revive_cm.jpg',
			itemName: 'Revive CM',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '142.000đ',
			itemQuantity: '10',
			totalPrice: '1.420.000đ'
		},
		{
			imgSrc: '../../img/do_uong/sprite.jpg',
			itemName: 'Sprite',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '120.000đ',
			itemQuantity: '2',
			totalPrice: '240.000đ'
		},
		{
			imgSrc: '../../img/do_uong/sting_dau.jpg',
			itemName: 'Sting Dâu',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '153.000đ',
			itemQuantity: '1',
			totalPrice: '153.000đ'
		},
		{
			imgSrc: '../../img/do_uong/sting_vang.jpg',
			itemName: 'Sting Vàng',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '150.000đ',
			itemQuantity: '1',
			totalPrice: '150.000đ'
		},
		{
			imgSrc: '../../img/do_uong/teppy.jpg',
			itemName: 'Teppy',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '166.000đ',
			itemQuantity: '1',
			totalPrice: '166.000đ'
		},
		{
			imgSrc: '../../img/do_uong/tra_xanh_0_do.jpg',
			itemName: 'Trà Xanh Không Độ',
			distributor: 'NPP: ĐL B-NN Khương Duy',
			itemPrice: '150.000đ',
			itemQuantity: '3',
			totalPrice: '450.000đ'
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
					console.log(itemName)
					if (!name_selected_arr.includes(itemName)) {
							continue;
					}
			}
			console.log(name_selected_arr);

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


// <!-- autobox -->


	let recommendList = [
			'Aquarius',
			'Redbull',
			'Coca',
			'Nước Suối',
			'Nutri Cam',
			'Nutri Cookies',
			'Revive',
			'Revive CM',
			'Sprite',
			'Sting Dâu',
			'Sting Vàng',
			'Teppy',
			'Trà Xanh Không Độ'



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

/* <!-- autobox -->
<!-- display and search --> */