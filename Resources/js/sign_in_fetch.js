var usersDataApi = 'https://jsonplaceholder.typicode.com/users';

function start() {
  getUsersData(function(usersData) {
    console.log(usersData);
    
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
  
        // Ràng buộc mật khẩu
      //   if (password.length < 6) {
      //     alert("Mật khẩu phải có ít nhất 6 ký tự.");
      //     return; // Dừng lại nếu mật khẩu không đủ độ dài
      //   }
      
      var authen = checkLogin(usersData, email, password); // Kiểm tra đăng nhập

        if (authen) {
            alert('Đăng nhập thành công');
            window.location.href= '../../../DoAnCuoiKy - user/index.html'
        } else {
            alert('Email hoặc mật khẩu không chính xác');
            window.location.reload();
        }
    };
  });  
}

start();

function getUsersData(callback) {
  fetch(usersDataApi)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

function checkLogin(usersData, email, password) {
    // Tìm kiếm người dùng theo email
    var user = usersData.find(user => user.email === email);

    if (user) {
      if (password == user.id) {
        return true; // Đăng nhập thành công
      }
    }
    return false; // Không tìm thấy người dùng hoặc mật khẩu không đúng
}
