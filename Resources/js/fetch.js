var usersDataApi = 'http://localhost:8000/users/mudule/v1/users/register/';

function start() {
  // getUsersData(function(usersData) {
  //   console.log(usersData);
  // })
  handleCreateUser();
}

start();

// function getUsersData(callback) {
//   fetch (usersDataApi)
//     .then(function(respone) {
//       return respone.json();
//     })
//     .then(callback);
// }

  function createUserData(data) {
    var option = {
      method: 'POST',
      headers: {
          'content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    };  

    console.log(data);

    fetch(usersDataApi, option)
      .then(function(respone) {
        respone.json;
      })
  }

    function handleCreateUser() {
      var createBtn = document.querySelector('#create');
      createBtn.onclick = function() {
        // var id = document.querySelector('input[name="id"]').value;
        var name = document.querySelector('input[name="username"]').value;
        var phoneNumber = document.querySelector('input[name= "phoneNumber"]').value;
        var email = document.querySelector('input[name= "email"]').value;
        var password = document.querySelector('input[name= "password"]').value;

        var formDataUser = {
          pass_kh: password,
          ten_kh: name,
          sdt_kh: phoneNumber,
          email_kh: email
        }

        createUserData(formDataUser)

      }
    }
