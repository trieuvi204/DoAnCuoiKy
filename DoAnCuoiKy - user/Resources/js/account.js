//<!-- display and search -->


    arrFieldInf = [

        {
            fieldNameInf: 'Sân A',
            fieldTypeInf: 'Sân 5',
            price: '300.000',
            time: '17:30 - 19:00',
            date: '05/05/2024',
            status: 'Đã Thanh Toán',
            bill: 'Xem Hóa Đơn'
        },
        {
            fieldNameInf: 'Sân B',
            fieldTypeInf: 'Sân 5',
            price: '300.000',
            time: '19:30 - 21:00',
            date: '28/04/2024',
            status: 'Đã Cọc Sân',
            bill: 'Xem Hóa Đơn'
        },
        {
            fieldNameInf: 'Sân C',
            fieldTypeInf: 'Sân 5',
            price: '300.000',
            time: '13:00 - 14:30',
            date: '24/04/2024',
            status: 'Thanh Toán Tại Sân',
            bill: 'Xem Hóa Đơn'
        },
        {
            fieldNameInf: 'Sân D',
            fieldTypeInf: 'Sân 5',
            price: '300.000',
            time: '14:00 - 15:30',
            date: '25/04/2024',
            status: 'Đã Thanh Toán',
            bill: 'Xem Hóa Đơn'
        },
        {
            fieldNameInf: 'Sân 7',
            fieldTypeInf: 'Sân 7',
            price: '900.000',
            time: '21:00 - 22:30',
            date: '25/08/2024',
            status: 'Đã Thanh Toán',
            bill: 'Xem Hóa Đơn'
        }
    ]






    function displayItemList(name_selected_arr = []) {
        var result = document.getElementById('result')
        result.innerHTML = 
        `
        <div class="field-inf-title">
            <p class="field-name-inf">Tên Sân</p>
            <p class="field-type-inf">Loại Sân</p>
            <p class="price">Giá</p>
            <p class="time">Khung GIờ</p>
            <p class="Date">Ngày Đặt Sân</p>
            <p class="status">Trạng Thái</p>
            <p class="bill">Hóa Đơn</p>
        </div>`;

        for (var i = 0; i < arrFieldInf.length; i++) {
            name = arrFieldInf[i].fieldNameInf;
            type = arrFieldInf[i].fieldTypeInf;
            price = arrFieldInf[i].price;
            time = arrFieldInf[i].time;
            date = arrFieldInf[i].date;
            status = arrFieldInf[i].status;
            bill = arrFieldInf[i].bill;

            // filter
            if (name_selected_arr.length > 0) {
                console.log(name)
                if (!name_selected_arr.includes(name)) {
                    continue;
                }
            }

            

            result.innerHTML +=
                `
				<div class="field-inf-title">
					<p class="field-name-inf">${name}</p>
					<p class="field-type-inf">${type}</p>
					<p class="price">${price}</p>
					<p class="time">${time}</p>
					<p class="Date">${date}</p>
					<p class="status">${status}</p>
                	<p class="bill"><a href="#">${bill}</a></p>
				</div>`;

        }
    }
    displayItemList();



    function selectResult() {

        // Lấy tất cả các phần tử có class name 'field-name-inf'
        var elements = document.getElementsByClassName('field-name-inf');
        var selectedValue = document.getElementById('search').value;
			var name_selected_arr = [];

			// Duyệt qua các phần tử và lấy textContent
			for (var i = 0; i < elements.length; i++) {
					var itemNameInf = elements[i].textContent.trim();
					if (itemNameInf.toUpperCase() === selectedValue.toUpperCase()) {
							name_selected_arr.push(itemNameInf);
							console.log(name_selected_arr[i])
					}
			}
			displayItemList(name_selected_arr);
            autoBox.classList.remove('active')

        }

        function deleteValue() {
            document.getElementById('search').value = '' ;
            displayItemList()
            autoBox.classList.remove('active')


        }


//<!-- autobox -->



    let recommendList = [
        'Sân A',
        'Sân B',
        'Sân C',
        'Sân D',
        'Sân 7'
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


