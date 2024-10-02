var usersDataApi = 'http://localhost:8000/users/mudule/v1/users/register/';

function start() {

  handleCreateStaff();
}

start();


  function createUserData(data) {
    var option = {
      method: 'POST',
      headers: {
          'content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    };

    fetch(usersDataApi, option)
      .then(function(respone) {
        respone.json;
      })
  }

    function handleCreateStaff() {
      var createBtn = document.querySelector('#create');
      createBtn.onclick = function() {
        var name = document.querySelector('input[name="username"]').value;
        var phoneNumber = document.querySelector('input[name= "sdt"]').value;
        var email = document.querySelector('input[name= "email"]').value;
        var password = document.querySelector('input[name= "matkhau"]').value;
        var diachi = document.querySelector('input[name= "diachi"]').value;
        var chucvu = document.querySelector('input[name= "chucvu"]').value;


        var formDataUser = {
					ten_nv: name,
          pass_nv: password,
          sdt_nv: phoneNumber,
					diachi_nv: diachi,
          email_kh: email,
					chucvu_nv: chucvu
        }

        createUserData(formDataUser)

      }
    }
