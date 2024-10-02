var usersDataApi = 'http://localhost:8000/staffs/mudule/v1/staffs/login/';

function start() {
  handleUserLogin(); // Gọi hàm để xử lý sự kiện đăng nhập
}

start();

// Đăng ký sự kiện cho nút đăng nhập
function handleUserLogin(){
    // Lấy nút đăng nhập
    let submitBtn = document.querySelector('.btn_sign_in');
    
    // Gán sự kiện click cho nút đăng nhập
    submitBtn.onclick = function(event) {
      event.preventDefault(); 
      let email = document.getElementById("email").value; // Lấy giá trị từ input email
      let password = document.getElementById("password").value; // Lấy giá trị từ input password
      if (!email || !password) {
        alert("email hoặc mật khẩu sai.");
        return;
      }
      // Tạo object chứa thông tin đăng nhập
      var formDataUser = {
        email_nv: email,
        pass_nv: password
      };
      
      // Gọi hàm để gửi yêu cầu đăng nhập
      loginUser(formDataUser);
    };
}

function loginUser(formDataUser) {
    // Gửi yêu cầu POST đến API đăng nhập
    fetch(usersDataApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataUser) // Chuyển đổi dữ liệu sang định dạng JSON
    })
    .then(function(response) {
      if (response.ok) {
        return response.json(); // Chuyển đổi phản hồi JSON nếu đăng nhập thành công
      } else {
        throw new Error('Đăng nhập thất bại'); // Thông báo lỗi nếu phản hồi không thành công
      }
    })
    .then(function(data) {
      // Xử lý dữ liệu sau khi đăng nhập thành công
      alert('Đăng nhập thành công');
      window.location.href = '../../../../index.html'; // Điều hướng đến trang người dùng
    })
    .catch(function(error) {
      // Xử lý lỗi
      alert(error.message);
      window.location.reload(); // Tải lại trang nếu đăng nhập thất bại
    });
}
