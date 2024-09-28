
//<!-- display and search --> 

// arrItemsList
  arrItemsList = [

    {
      itemCode: 'MH001',
      itemName: 'Aquarius',
      imgSrc: '../../img/do_uong/aquarius.jpg',
      inventory: '10',
      soldItems: '30',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH002',
      itemName: 'Coca',
      imgSrc: '../../img/do_uong/coca.jpg',
      inventory: '10',
      soldItems: '30',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH003',
      itemName: 'Nước suối',
      imgSrc: '../../img/do_uong/nuoc_suoi.jpg',
      inventory: '23',
      soldItems: '70',
      itemPrice: '6.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH004',
      itemName: 'Revive',
      imgSrc: '../../img/do_uong/revive.jpg',
      inventory: '15',
      soldItems: '20',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH005',
      itemName: 'Revive chanh muối ',
      imgSrc: '../../img/do_uong/revive_cm.jpg',
      inventory: '55',
      soldItems: '36',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH006',
      itemName: 'Sprite',
      imgSrc: '../../img/do_uong/sprite.jpg',
      inventory: '28',
      soldItems: '15 ',
      itemPrice: '10.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH007',
      itemName: 'Teppy',
      imgSrc: '../../img/do_uong/teppy.jpg',
      inventory: '32',
      soldItems: '17',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH008',
      itemName: 'Sting Dâu',
      imgSrc: '../../img/do_uong/sting_dau.jpg',
      inventory: '12',
      soldItems: '20',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH009',
      itemName: 'Nutri Cam',
      imgSrc: '../../img/do_uong/nutri_cam.jpg',
      inventory: '10',
      soldItems: '19',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH010',
      itemName: 'Nutri Cookies',
      imgSrc: '../../img/do_uong/nutri_cookies.jpg',
      inventory: '17',
      soldItems: '30',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH011',
      itemName: 'Redbull',
      imgSrc: '../../img/do_uong/bo_huc_250ml.png',
      inventory: '16',
      soldItems: '18',
      itemPrice: '20.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH012',
      itemName: 'Sting Vàng',
      imgSrc: '../../img/do_uong/sting_vang.jpg',
      inventory: '13',
      soldItems: '10',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH013',
      itemName: 'Trà Xanh Không Độ',
      imgSrc: '../../img/do_uong/tra_xanh_0_do.jpg',
      inventory: '27',
      soldItems: '28',
      itemPrice: '15.000đ',
      itemType: 'Thức  Uống',
    },
    {
      itemCode: 'MH014',
      itemName: 'Mì Trứng',
      imgSrc: '../../img/do_an/mi_trung.jpg',
      inventory: '35',
      soldItems: '23',
      itemPrice: '35.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH015',
      itemName: 'Cơm Rang',
      imgSrc: '../../img/do_an/com-rang.jpg',
      inventory: '29',
      soldItems: '17',
      itemPrice: '30.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH016',
      itemName: 'Mì Xào Bò',
      imgSrc: '../../img/do_an/mi_xao_bo.jpg',
      inventory: '29',
      soldItems: '22',
      itemPrice: '35.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH017',
      itemName: 'Nuôi Xào Bò',
      imgSrc: '../../img/do_an/nui_xao_bo.jpg',
      inventory: '35',
      soldItems: '24',
      itemPrice: '35.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH018',
      itemName: 'Lays',
      imgSrc: '../../img/do_an/lays_nguyenban.jpg',
      inventory: '10',
      soldItems: '29',
      itemPrice: '25.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH019',
      itemName: 'Lays Kem Chua Hàng',
      imgSrc: '../../img/do_an/lays_kemchuahanh.jpg',
      inventory: '20',
      soldItems: '9',
      itemPrice: '25.000đ',
      itemType: 'Đồ Ăn',
    },
    {
      itemCode: 'MH020',
      itemName: 'Lays Bò Wagyu',
      imgSrc: '../../img/do_an/lays_bowagyu.jpg',
      inventory: '35',
      soldItems: '26',
      itemType: 'Đồ Ăn',
    },


  ]
// arrItemsList
// display
  function displayItemList(name_selected_arr=[]) {
    var items = document.getElementsByClassName('table-list-items')[0]
    items.innerHTML = 
    `
      <tr>
        <td>Mã Mặt Hàng</td>
        <td>Tên Mặt Hàng</td>
        <td>Hình Ảnh</td>
        <td>Kho</td>
        <td>Đã bán</td>
        <td>Đơn Giá</td>
        <td>Loại Mặt Hàng</td>
      </tr>
    `;
    for (var i = 0; i < arrItemsList.length; i++) {
      itemCode = arrItemsList[i].itemCode;
      itemName = arrItemsList[i].itemName;
      imgSrc = arrItemsList[i].imgSrc;
      inventory = arrItemsList[i].inventory;
      soldItems = arrItemsList[i].soldItems;
      itemPrice = arrItemsList[i].itemPrice;
      itemType = arrItemsList[i].itemType;

      // filter
      if (name_selected_arr.length > 0) {
        console.log(name_selected_arr)
        if (!name_selected_arr.includes(itemName)) {
          continue;
        }
      }

      items.innerHTML +=
        `
      <tr>
        <td>${itemCode}</td>
        <td class="title-items">${itemName}</td>
      <td>
        <img src="${imgSrc}">
      </td>
        <td>${inventory}</td>
        <td>${soldItems}</td>
        <td>${itemPrice}</td>
        <td>${itemType}</td>
      </tr>
      `;

    }
  }
  displayItemList();
// display
// search
  function selectResult() {

      var elements = document.getElementsByClassName('title-items');
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
// search

// delete
  function deleteValue() {
            document.getElementById('search').value = '' ;
            displayItemList()

  }
// delete

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
      'Trà Xanh Không Độ',
      'Mì Trứng',
      'Cơm Rang',
      'Mì Xào Bò',
      'Nuôi Xào Bò',
      'Lays',
      'Lays Kem Chua Hàng',
      'Lays Bò Wagyu'



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