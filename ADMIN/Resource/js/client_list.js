// arrs
arrItemsList = [
  {
    userCode: 'KH001',
    userName: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    userPhoneNumb: '0864 523 499',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH002',
    userName: 'Nguyễn Thành Đạt',
    email: 'nguyenthanhdat2405@gmail.com',
    userPhoneNumb: '0903 456 789',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH003',
    userName: 'Trần Thị Minh Châu',
    email: 'tranthiminhchau0712@gmail.com',
    userPhoneNumb: '0912 345 678',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH004',
    userName: 'Lê Hoàng Anh',
    email: 'lehoanganh1985@gmail.com',
    userPhoneNumb: '0936 234 567',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH005',
    userName: 'Nguyễn Minh Quân',
    email: 'nguyenminhquan0508@gmail.com',
    userPhoneNumb: '0777 654 321',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH006',
    userName: 'Trần Đức Dũng',
    email: 'tranducdung1992@gmail.com',
    userPhoneNumb: '0898 765 432',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH007',
    userName: 'Lê Hoàng Phúc',
    email: 'lehoangphuc2001@gmail.com',
    userPhoneNumb: '0349 012 345',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH008',
    userName: 'Phạm Gia Bảo',
    email: 'phamgiabao1978@gmail.com',
    userPhoneNumb: '0269 210 987',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH009',
    userName: 'Vũ Tuấn Kiệt',
    email: 'vutuankiet1996@gmail.com',
    userPhoneNumb: '0937 109 876',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH010',
    userName: 'Đỗ Thành Công',
    email: 'dothanhcong2809@gmail.com',
    userPhoneNumb: '0918 901 234',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH011',
    userName: 'Khuất Văn Khang',
    email: 'kvk2004@gmail.com',
    userPhoneNumb: '035 272 0975',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH012',
    userName: 'Cao Thanh Tuấn',
    email: 'caothanhtuan15@gmail.com',
    userPhoneNumb: '0923 333 223',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  
  {
    userCode: 'KH013',
    userName: 'Nguyễn Tuấn Anh',
    email: 'nguyentuananh204@gmail.com',
    userPhoneNumb: '0136 738 736',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  {
    userCode: 'KH0014',
    userName: 'Trần Thanh Tuấn',
    email: 'trantuan123@gmail.com',
    userPhoneNumb: '092 522 1143',
    functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
  },
  


]
// arrs

// display
function displayItemsList() {
  var items = document.getElementsByClassName('table-list-items')[0]
  items.innerHTML =
    `
    <tr>
      <td>Mã Mặt Hàng</td>
      <td>Tên Mặt Hàng</td>
      <td>Email</td>
      <td>Số Điện Thoại</td>
      <td>Chức Năng</td>
    </tr>
    `;
  for (var i = 0; i < arrItemsList.length; i++) {
    userCode = arrItemsList[i].userCode;
    userName = arrItemsList[i].userName;
    email = arrItemsList[i].email;
    userPhoneNumb = arrItemsList[i].userPhoneNumb;
    functions = arrItemsList[i].functions;

    items.innerHTML +=
    `
    <tr>
      <td>${userCode}</td>
      <td>${userName}</td>
      <td>${email}</td>
      <td>${userPhoneNumb}</td>
      <td>${functions}</td>
    </tr>
    `;

  }
}
displayItemsList();
// display
