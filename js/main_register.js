//Variables
var formRegister = document.getElementById("formregister");

//Event Listeners

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  let jsontosend = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  };

  fetch(
    `http://e927a3b4e5f2.ngrok.io/user/register?name=${jsontosend.name}&email=${jsontosend.email}&password=${jsontosend.password}`,
    {
      mode: "cors",
      method: "POST",
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
});
