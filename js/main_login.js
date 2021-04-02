//Variables
var formLogin = document.getElementById("formlogin");

fetch(`http://e927a3b4e5f2.ngrok.io/user/login`, {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });

//Event Listeners
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let jsontosend = {
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  };

  fetch(
    `http://e927a3b4e5f2.ngrok.io/user/login?&email=${jsontosend.email}&password=${jsontosend.password}`,
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
//
