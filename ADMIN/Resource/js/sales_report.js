//<!-- display and search -->


	arrBestSeller = [
		{
			imgSrc : '../../img/do_uong/revive.jpg',
			itemName : 'Rivive',
			itemCode: 'MH005',
			itemPrice: '23.000.000đ',
			itemDiscountPercent: '20%'
		},
		{
			imgSrc : '../../img/do_uong/aquarius.jpg',
			itemName : 'Aquarius',
			itemCode: 'MH001',
			itemPrice: '15.000.000đ',
			itemDiscountPercent: '15%%'
		},
		{
			imgSrc : '../../img/do_uong/bo_huc_250ml.png',
			itemName : 'Redbull',
			itemCode: 'MH011',
			itemPrice: '12.000.000đ',
			itemDiscountPercent: '14%'
		},
		{
			imgSrc : '../../img/do_an/lays_nguyenban.jpg',
			itemName : 'Lays',
			itemCode: 'MH019',
			itemPrice: '10.000.000đ',
			itemDiscountPercent: '12%'
		},
		{
			imgSrc : '../../img/do_uong/sting_dau.jpg',
			itemName : 'Sting dâu',
			itemCode: 'MH008',
			itemPrice: '8.000.000đ',
			itemDiscountPercent: '13%'
		},
		{
			imgSrc : '../../img/do_an/lays_kemchuahanh.jpg',
			itemName : 'Lay`s KCH',
			itemCode: 'MH020',
			itemPrice: '6.000.000đ',
			itemDiscountPercent: '10%'
		},
		{
			imgSrc : '../../img/do_an/mi_trung.jpg',
			itemName : 'Mì Trứng',
			itemCode: 'MH015',
			itemPrice: '4.300.000đ',
			itemDiscountPercent: '8%'
		},


	]



	function displayItemList(code_selected_arr = []) {
			var besrSeller = document.getElementsByClassName('best-seller-list')[0	]
			besrSeller.innerHTML = '';
			for(var i = 0; i < arrBestSeller.length; i++){
				imgSrc = arrBestSeller[i].imgSrc;
				itemName = arrBestSeller[i].itemName;
				itemCode = arrBestSeller[i].itemCode;
				itemPrice = arrBestSeller[i].itemPrice;
				itemDiscountPercent = arrBestSeller[i].itemDiscountPercent;

				if (code_selected_arr.length > 0) {
				console.log(code_selected_arr)
				if (!code_selected_arr.includes(itemName)) {
					continue;
				}
			}


				besrSeller.innerHTML += 
				`
				<div class="item">
									<div class="img">
										<img src="${imgSrc}" >
									</div>	
									<div class="text-item">
										<p class="title-item">${itemName}</p>
										<p class="code-item">${itemCode}</p>
									</div>
									<div class="total-price-item">
										<p class="price-item">${itemPrice}</p>
										<p class="discout-perc">${itemDiscountPercent}</p>
									</div>
								</div>
				`;

			}
		}
		displayItemList();


	function selectResult() {
		var elements = document.getElementsByClassName('title-item');
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
			'Rivive',
			'Aquarius',
			'Redbull',
			'Lays',
			'Sting dâu',
			'Lay`s KCH',
			'Mì Trứng',
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
