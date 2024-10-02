var DataApi = 'http://localhost:8000/staffs/mudule/v1/staffs/register/';

function start() {

  handleCreateStaff();
}

start();


  function CreateStaffData(data) {
    var option = {
      method: 'POST',
      headers: {
          'content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    };

    fetch(DataApi, option)
      .then(function(respone) {
        respone.json;
      })
  }

    function handleCreateStaff() {
      var createBtn = document.querySelector('.btn_sign_in button');
      createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var phoneNumber = document.querySelector('input[name= "sdt"]').value;
        var email = document.querySelector('input[name= "email"]').value;
        var password = document.querySelector('input[name= "matkhau"]').value;
        var diachi = document.querySelector('input[name= "diachi"]').value;
        var chucvu = document.querySelector('input[name= "chucvu"]').value;


        var formDataUser = {
					ten_nv: name,
          pass_nv: password,
          sdt_nv: phoneNumber,
					dia_chi: diachi,
          email_nv: email,
					chuc_vu: chucvu
        }
        console.log(formDataUser)
        CreateStaffData(formDataUser)

      }
    }
