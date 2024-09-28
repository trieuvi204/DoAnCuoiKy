// arrs
//arrOrders
  arrOrders = [
    {
      billCode : 'Mã Hóa Đơn',
      userName : 'Tên Khách Hàng',
      totalPrice: 'Tổng Tiền',
      paymentStatus: 'Trạng thái'
    },
    {
      billCode : 'HD0001',
      userName : 'Nguyễn Văn An',
      totalPrice: '360.000đ',
      paymentStatus: 'Đã Thanh Toán'
    },
    {
      billCode : 'HD0002',
      userName : 'Nguyễn Thị Nở',
      totalPrice: '300.000đ',
      paymentStatus: 'Cọc 30%'
    },
    {
      billCode : 'HD0003',
      userName : 'Trần Văn Toàn',
      totalPrice: '900.000đ',
      paymentStatus: 'Cọc 30%'
    },
    {
      billCode : 'HD0004',
      userName : 'Nguyễn Trọng Hoàng',
      totalPrice: '600.000đ',
      paymentStatus: 'Cọc 30%'
    }
  ]
//arrOrders

//arrNewUser
  arrNewUser = [
    {
      userCode : 'Mã Khách Hàng',
      userName : 'Tên Khách Hàng',
      email: 'Email',
      phoneNumb: 'SĐT'
    },
    {
      userCode  : 'KH0001',
      userName : 'Nguyễn Văn Toàn',
      email: 'nguyenvantoan@gmail.com',
      phoneNumb: '0352720975'
    },
    {
      userCode  : 'KH0002',
      userName : 'Nguyễn Công Phượng',
      email: 'nguyencongphung@gmail.com',
      phoneNumb: '0912345678'
    },
    {
      userCode  : 'KH0003',
      userName : 'Trần Văn Toản',
      email: 'tranvantoan@gmail.com',
      phoneNumb: '0312546782'
    },
    {
      userCode  : 'KH0004',
      userName : 'Nguyễn Tiến Linh',
      email: 'nguyentienlinh@gmail.com',
      phoneNumb: '0967289432'
    },
    {
      userCode  : 'KH0005',
      userName : 'Nguyễn Quang Hải',
      email: 'nguyenquanhai@gmail.com',
      phoneNumb: '09234544836'
    },
    {
      userCode  : 'KH0006',
      userName : 'Nguyễn Huỳnh Đức',
      email: 'nguyenhuynhduc@gmail.com',
      phoneNumb: '09997562342'
    },
  ]
//arrNewUser

// arrBestSeller
  arrBestSeller = [
    {
      imgSrc : 'Resource/img/do_uong/revive.jpg',
      itemName : 'Revive',
      itemCode: 'MH005',
      itemPrice: '23.000.000đ',
      itemDiscountPercent: '20%'
    },
    {
      imgSrc : 'Resource/img/do_uong/aquarius.jpg',
      itemName : 'Aquarius',
      itemCode: 'MH001',
      itemPrice: '15.000.000đ',
      itemDiscountPercent: '15%%'
    },
    {
      imgSrc : 'Resource/img/do_uong/bo_huc_250ml.png',
      itemName : 'Redbull',
      itemCode: 'MH011',
      itemPrice: '12.000.000đ',
      itemDiscountPercent: '14%'
    },
    {
      imgSrc : 'Resource/img/do_an/lays_nguyenban.jpg',
      itemName : 'Lays',
      itemCode: 'MH019',
      itemPrice: '10.000.000đ',
      itemDiscountPercent: '12%'
    },
    {
      imgSrc : 'Resource/img/do_uong/sting_dau.jpg',
      itemName : 'Sting dâu',
      itemCode: 'MH008',
      itemPrice: '8.000.000đ',
      itemDiscountPercent: '13%'
    },
    {
      imgSrc : 'Resource/img/do_an/lays_kemchuahanh.jpg',
      itemName : 'Lay`s KCH',
      itemCode: 'MH020',
      itemPrice: '6.000.000đ',
      itemDiscountPercent: '10%'
    },
    {
      imgSrc : 'Resource/img/do_an/mi_trung.jpg',
      itemName : 'Mì Trứng',
      itemCode: 'MH015',
      itemPrice: '4.300.000đ',
      itemDiscountPercent: '8%'
    },


  ]
// arrBestSeller
// arrs

// display functions
// displayOrderList
  function displayOrderList() {
      var orderList = document.getElementsByClassName('table-order-list')[0	]
      orderList.innerHTML = '';
      for(var i = 0; i < arrOrders.length; i++){
        billCode = arrOrders[i].billCode;
        userName = arrOrders[i].userName	;
        totalPrice = arrOrders[i].totalPrice;
        paymentStatus = arrOrders[i].paymentStatus;

        orderList.innerHTML += 
        `
        <tr>
          <td class="billCode">${billCode}</td>
          <td class="userName">${userName}</td>
          <td class="totalPrice">${totalPrice}</td>
          <td class="paymentStatus">${paymentStatus}</td>
        </tr>
        `;

      }
    }
    displayOrderList();
// displayOrderList

// displayNewUserList
  function displayNewUserList() {
      var newUserList = document.getElementsByClassName('table-new-user-list')[0	]
      newUserList.innerHTML = '';
      for(var i = 0; i < arrNewUser.length; i++){
        userCode = arrNewUser[i].userCode;
        userName = arrNewUser[i].userName	;
        email = arrNewUser[i].email;
        phoneNumb = arrNewUser[i].phoneNumb;

        newUserList.innerHTML += 
        `
        <tr>
          <td class="userCode">${userCode}</td>
          <td class="userName">${userName}</td>
          <td class="email">${email}</td>
          <td class="phoneNumb">${phoneNumb}</td>
        </tr>
        `;

      }
    }
    displayNewUserList ();
// displayNewUserList


// displayBestSellerList
  function displayBestSellerList() {
      var besrSeller = document.getElementsByClassName('best-seller-list')[0	]
      besrSeller.innerHTML = '';
      for(var i = 0; i < arrBestSeller.length; i++){
        imgSrc = arrBestSeller[i].imgSrc;
        itemName = arrBestSeller[i].itemName;
        itemCode = arrBestSeller[i].itemCode;
        itemPrice = arrBestSeller[i].itemPrice;
        itemDiscountPercent = arrBestSeller[i].itemDiscountPercent;

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
    displayBestSellerList();
// displayBestSellerList


// display functions
