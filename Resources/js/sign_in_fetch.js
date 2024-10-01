var usersDataApi = 'http://localhost:8000/users/mudule/v1/users/login/';

function start() {
  // Lấy nút đăng nhập
  let submitBtn = document.querySelector('.btn_sign_in');
    
  // Đăng ký sự kiện cho nút đăng nhập
  submitBtn.onclick = function() {
    let email = document.getElementById("email").value; // Lấy giá trị từ input email
    let password = document.getElementById("password").value; // Lấy giá trị từ input password

    // Ràng buộc định dạng email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho email
    if (!emailPattern.test(email)) {
      alert("Vui lòng nhập đúng định dạng email.");
      return; // Dừng lại nếu email không hợp lệ
    }

    // Gọi API đăng nhập
    loginUser(email, password);
  };  
}

start();

function loginUser(email, password) {
  // Tạo dữ liệu gửi đi
  var formData = {
    email_kh: email,
    pass_kh: password
  };

  // Gửi yêu cầu POST đến API đăng nhập
  fetch(usersDataApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData) // Chuyển đổi dữ liệu sang định dạng JSON
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }
  })
  .then(function(data) {
    alert('Đăng nhập thành công');
    window.location.href = '../../../DoAnCuoiKy - user/index.html';
  })
  .catch(function(error) {
    alert(error.message);
    window.location.reload();
  });
}
