var usersDataApi = 'http://localhost:8000/users/mudule/v1/users/login/';

function start() {
  handleUserLogin();
};

start();



// Đăng ký sự kiện cho nút đăng nhập'
function handleUserLogin(){
    // Lấy nút đăng nhập
    let submitBtn = document.querySelector('.btn_sign_in');
    submitBtn.onclick = function() {
        let email = document.getElementById("email").value; // Lấy giá trị từ input email
        let password = document.getElementById("password").value; // Lấy giá trị từ input password
  
        // Ràng buộc định dạng email
        // let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho email
        // if (!emailPattern.test(email)) {
        //   alert("Vui lòng nhập đúng định dạng email.");
        //   return; // Dừng lại nếu email không hợp lệ
        // }
  
        // Ràng buộc mật khẩu
      //   if (password.length < 6) {
      //     alert("Mật khẩu phải có ít nhất 6 ký tự.");
      //     return; // Dừng lại nếu mật khẩu không đủ độ dài
      //   }


      var formDataUser = {
        email_kh: email,
        pass_kh: password
      }

      getUsersData(formDataUser);

  }
    
    // var authen = checkLogin(usersData, email, password); // Kiểm tra đăng nhập

    //   if (authen) {
    //       alert('Đăng nhập thành công');
    //       window.location.href= '../../../DoAnCuoiKy - user/index.html'
    //   } else {
    //       alert('Email hoặc mật khẩu không chính xác');
    //       window.location.reload();
    //   }

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
    })
    .then(callback);
}

// function checkLogin(usersData, email, password) {
//     // Tìm kiếm người dùng theo email
//     var user = usersData.find(user => user.email === email);

//     if (user) {
//       if (password == user.id) {
//         return true; // Đăng nhập thành công
//       }
//     return false; // Không tìm thấy người dùng hoặc mật khẩu không đúng
//      }
