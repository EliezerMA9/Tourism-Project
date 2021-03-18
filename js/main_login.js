//Variables
var formLogin = document.getElementById('formlogin');

//Event Listeners
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    var datosForm = new FormData(formLogin);
    // console.log(datosForm);
    // console.log(datosForm.get('usuario'));
    // console.log(datosForm.get('pass'));

    fetch('https://authentic-ether-303815.uc.r.appspot.com/user/login', {
        method: "POST",
        body: datosForm
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      })
  })
  //
