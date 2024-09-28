const userId = {
  name: null,
  email: null,
  subject: null,
  message: null
}


const submitBtn = document.querySelector("#btn_submit");
const messages = document.querySelector(".messages");
const userName = document.querySelector("#name-field");
const userEmail = document.querySelector("#email-field");
const userComment = document.querySelector("#message-field");
const userSubject = document.querySelector("#subject-field");


userComment.addEventListener("input", e =>{
if(!userComment.value){
  submitBtn.setAttribute("disabled","disabled");
  submitBtn.classList.remove("abled")
}else{
  submitBtn.removeAttribute("disabled");
  submitBtn.classList.add("abled")
}
})


function addPost(){
console.log("the btn is work!!")
if(!userComment.value) return;
  userId.name = userName.value
  userId.email = userEmail.value
  userId.subject = userSubject.value
  userId.message = userComment.value

let pushlished = 
`<div class="parents">
  <div class="row">
    <p class="inf">${userId.name}</p>
    <p class="inf">${userId.email}</p>
  </div>
  <div class="row">
    <div class="col-lg-5">
      <p><i class="fa-solid fa-diamond-turn-right"></i>${userId.subject}</p>
    </div>
    <div class="col-lg-7">
      <p class = "message_output">${userId.message}</p>
    </div>
  </div>																
</div> `;

messages.innerHTML += pushlished;
userComment.value = "";
}

submitBtn.addEventListener("click", addPost);