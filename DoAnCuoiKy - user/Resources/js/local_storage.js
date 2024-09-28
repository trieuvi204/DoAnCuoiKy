const form = document.getElementById('form')
if(localStorage.getItem('user')){
    // parse to JSON object

    const obj = JSON.parse(localStorage.getItem('user'))
    if(obj.username && obj.password){
        document.getElementById('Username').value = obj.username || '';
        var hashPassword = bcrypt.hashSync(password, salt);
        document.getElementById('password').value = obj.password || '';
    }
}

document.getElementById('sign_in').addEventListener('submit', (e) =>{
e.preventDefault();
const username = document.getElementById('Username').value;
const password = document.getElementById('password').value;

const user = {
    username: username,
    password: password
}

// local storage
localStorage.setItem('user', JSON.stringify(user))
console.log(JSON.stringify(user))

alert("Thông tin của bạn đã được lưu trữ")
})
// delete when reload the page
window.addEventListener('beforeunload', ()=>{
    localStorage.removeItem('user');
}) 