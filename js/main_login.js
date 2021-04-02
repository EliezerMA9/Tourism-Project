//Variables
console.log(location.origin);
var formLogin = document.getElementById("formlogin");
console.log(document.getElementById("test"));

document.getElementById("test").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("a");

  fetch(`https://finalproject-309315.uc.r.appspot.com/user/login`, {
    credentials: "same-origin",
    method: "GET",
    mode: "cors",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
});

//Event Listeners
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let jsontosend = {
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  };

  fetch(
    `https://finalproject-309315.uc.r.appspot.com/user/login?&email=${jsontosend.email}&password=${jsontosend.password}`,
    {
      credentials: "same-origin",
      mode: "cors",
      method: "POST",
    }
  ).then((data) => {
    console.log(data);
  });
});
//
