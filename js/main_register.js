//Variables
var formRegister = document.getElementById('formregister')

//Event Listeners


formRegister.addEventListener('submit', (e) => {
  e.preventDefault();

  var datosRegForm = new FormData(formRegister);
  console.log(datosRegForm);
  console.log(datosRegForm.get('name'));
  console.log(datosRegForm.get('email'));
  console.log(datosRegForm.get('password'));

  fetch('https://authentic-ether-303815.uc.r.appspot.com/user/register', {
      method: "POST",
      body: datosRegForm
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    })

})
