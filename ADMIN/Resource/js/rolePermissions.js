// set role
document.addEventListener('DOMContentLoaded', function() {
  // Lấy chức vụ từ session
  const userRole = sessionStorage.getItem('chuc_vu');


  // Mapping chức năng với quyền tương ứng
  const permissions = {
      'admin': ['dashbroad', 'manage_booking', 'manage_service', 'manage_inventory', 'manage_membership', 'manage_money', 'manage_client_list'],
      'thu-ngan': ['dashbroad', 'manage_money', 'manage_booking', 'manage_service'],
      'nhap-hang': ['dashbroad', 'manage_inventory']
  };

    // Vô hiệu hóa các nút không có quyền
    document.querySelectorAll('.menu ul li a').forEach(function(link) {
      const button = link.querySelector('button'); // Lấy phần tử button
      const buttonId = button.id; // Lấy id của button

      if (!permissions[userRole].includes(buttonId)) {
          button.disabled = true; // Disable nút nếu không có quyền
          button.style.opacity = '0.5'; // Tùy chọn: giảm độ trong suốt để nhìn như bị khóa
          button.style.cursor = 'not-allowed'; // Thay đổi con trỏ chuột
      } 
  })
});

document.addEventListener('DOMContentLoaded', function() {
  // Lấy tên người dùng từ sessionStorage
  const userName = sessionStorage.getItem('ten_nv');
  
  // Gán tên người dùng vào phần tử có id 'userName'
  if (userName) {
    document.getElementById('userName').textContent = userName;
  } else {
    document.getElementById('userName').textContent = "Khách"; // Tên mặc định nếu không có userName
  }
});


// set role
