
// arrs
  arrItemsList = [

    {
      billCOde: 'HD001',
      userCode: 'KH009',
      paymentDate: '21/04/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '100%',
      paid: '300.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD002',
      userCode: 'KH008',
      paymentDate: '25/08/2024',
      startTime: '15h00',
      endTime: '16h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tiếp',
      paymentsLimit: '100%',
      paid: '300.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD003',
      userCode: 'KH007',
      paymentDate: '04/01/2024',
      startTime: '19h00',
      endTime: '20h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '100%',
      paid: '300.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD004',
      userCode: 'KH006',
      paymentDate: '03/08/2024',
      startTime: '21h00',
      endTime: '22h30',
      fieldPrice: '900.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%',
      paid: '270.000 đ',
      unpaid: '630.000 đ'
    },
    {
      billCOde: 'HD005',
      userCode: 'KH004',
      paymentDate: '19/7/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%',
      paid: '90.000 đ',
      unpaid: '210.000 đ'
    },
    {
      billCOde: 'HD006',
      userCode: 'KH004',
      paymentDate: '04/03/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '100%',
      paid: '300.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD007',
      userCode: 'KH003',
      paymentDate: '17/04/2024',
      startTime: '21h00',
      endTime: '22hh00',
      fieldPrice: '200.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '100%',
      paid: '200.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD008',
      userCode: 'KH002',
      paymentDate: '21/04/2024',
      startTime: '18h00',
      endTime: '19h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%',
      paid: '90.000 đ',
      unpaid: '210.000 đ'
    },
    {
      billCOde: 'HD009',
      userCode: 'KH001',
      paymentDate: '13/6/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%%',
      paid: '90.000 đ',
      unpaid: '210.000 đ'
    },
    {
      billCOde: 'HD010',
      userCode: 'KH0012',
      paymentDate: '14/05/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '100%',
      paid: '300.000 đ',
      unpaid: '0 đ'
    },
    {
      billCOde: 'HD011',
      userCode: 'KH011',
      paymentDate: '26/07/2024',
      startTime: '17h00',
      endTime: '18h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%',
      paid: '90.000 đ',
      unpaid: '210.000 đ'
    },
    {
      billCOde: 'HD012',
      userCode: 'KH012',
      paymentDate: '25/08/2024',
      startTime: '16h00',
      endTime: '17h30',
      fieldPrice: '300.000 đ',
      payments: 'TT Trực Tuyến',
      paymentsLimit: '30%%',
      paid: '90.000 đ',
      unpaid: '210.000 đ'
    },
    
  ]
// arrs

// displayItemsList
  function displayItemsList() {
    var items = document.getElementsByClassName('table-list-items')[0]
    items.innerHTML =
      `
      <tr>
        <td>Mã HD</td>
        <td>Mã KH</td>
        <td>Ngày TT</td>
        <td>Giờ BĐ</td>
        <td>Giờ KT</td>
        <td>Giá Sân</td>
        <td>Hình Thức Thanh Toán </td>
        <td>Hạn Mức Thanh Toán</td>
        <td>Đã Thanh Toán</td>
        <td>Chưa Thanh Toán</td>
      </tr>
      `;
    for (var i = 0; i < arrItemsList.length; i++) {
      billCOde = arrItemsList[i].billCOde;
      userCode = arrItemsList[i].userCode;
      paymentDate = arrItemsList[i].paymentDate;
      startTime = arrItemsList[i].startTime;
      endTime = arrItemsList[i].endTime;
      fieldPrice = arrItemsList[i].fieldPrice;
      payments = arrItemsList[i].payments;
      paymentsLimit = arrItemsList[i].paymentsLimit;
      paid = arrItemsList[i].paid;
      unpaid = arrItemsList[i].unpaid;

      items.innerHTML +=
      `
      <tr>
        <td>${billCOde}</td>
        <td>${userCode}</td>
        <td>${paymentDate}</td>
        <td>${startTime}</td>
        <td>${endTime}</td>
        <td>${fieldPrice}</td>
        <td>${payments}</td>
        <td>${paymentsLimit}</td>
        <td>${paid}</td>
        <td>${unpaid}</td>
      </tr>
      `;

    }
  }
  displayItemsList();
// displayItemsList