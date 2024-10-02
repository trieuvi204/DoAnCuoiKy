var usersDataApi = 'https://jsonplaceholder.typicode.com/users';

function start() {
  handleAdminLogin();
}

// // Tìm kiếm người dùng theo email
// var user = usersData.find(user => user.id == id);
// if (user) {
//   if (password == user.password) {
//     return true; // Đăng nhập thành công
//   }
// }
// return false; // Không tìm thấy người dùng hoặc mật khẩu không đúng
  
function handleAdminLogin(){
    // Lấy nút đăng nhập
    let submitBtn = document.querySelector('.btn_sign_in');
    
    // Đăng ký sự kiện cho nút đăng nhập
    submitBtn.onclick = function() {
      // event.preventDefault();
      let id = document.getElementById("id").value; // Lấy giá trị từ input email
      let password = document.getElementById("password").value; // Lấy giá trị từ input password
      // var authen = checkLogin(usersData, id, password); // Kiểm tra đăng nhập
  
      // if (authen) {
      //   alert('Đăng nhập thành công');
      //   window.location.href= '../../../../index.html';
      // } else {
      //   alert('ID hoặc mật khẩu không chính xác');
      //   window.location.reload
      // }

      var formDataUser = {
        id_ad : id,
        pass_kh: password
      }

      getUsersData(formDataUser);
    };
  }


start();

function getUsersData(callback) {
fetch(usersDataApi)
  .then(function(response) {
    return response.json();
  })
  .then(callback);
}

// function checkLogin(usersData, id, password) {