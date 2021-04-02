function habilitar_input(elemento) {
  v = elemento.value;
  var descripcion = document.getElementById("form-group-descripcion");
  var provincia = document.getElementById("form-group-provincia");
  var precio = document.getElementById("form-group-precio");
  // var fecha = document.getElementById("inputFecha");
  var hora = document.getElementById("form-group-hora");
  var cupos = document.getElementById("form-group-cupo");
  var file_img = document.getElementById("form-group-img");
  var btn_send = document.getElementById("send");

  if (v == "Sitio Turistico") {
    provincia.style.display = "block";
    descripcion.style.display = "block";
    file_img.style.display = "block";
    btn_send.style.display = "block";
  } else if (v == "Actividad Turistica") {
    provincia.style.display = "block";
    precio.style.display = "block";
    // fecha.style.display = "block";
    hora.style.display = "block";
    cupos.style.display = "block";
    descripcion.style.display = "block";
    file_img.style.display = "block";
    btn_send.style.display = "block";
  } else {
    provincia.style.display = "none";
    precio.style.display = "none";
    // fecha.style.display = "none";
    hora.style.display = "none";
    cupos.style.display = "none";
    descripcion.style.display = "none";
    file_img.style.display = "none";
    btn_send.style.display = "none";
  }
}

var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var coordsN = "";
var coordsW = "";

var AcoordsN = "";
var AcoordsW = "";

//Funcion principal
initMap = function () {
  //usamos la API para geolocalizar el usuario
  navigator.geolocation.getCurrentPosition(
    function (position) {
      coords = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };
      setMapa(coords); //pasamos las coordenadas al metodo para crear el mapa
    },
    function (error) {
      alert(
        "Se produjo un error. Permita el acceso a su ubicacion en su navegador"
      );
    }
  );
};

function setMapa(coords) {
  //Se crea una nueva instancia del objeto mapa
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(coords.lat, coords.lng),
    disableDefaultUI: true,
  });

  //Creamos el marcador en el mapa con sus propiedades
  //para nuestro obetivo tenemos que poner el atributo draggable en true
  //position pondremos las mismas coordenas que obtuvimos en la geolocalización
  marker = new google.maps.Marker({
    map: map,
    icon: {
      // path: google.maps.SymbolPath.CIRCLE,
      // scale: 20, //tamaño
      // strokeColor: '#f00', //color del borde
      // strokeWeight: 5, //grosor del borde
      // fillColor: '#00f', //color de relleno
      // fillOpacity: 1 // opacidad del relleno
    },
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(coords.lat, coords.lng),
  });
  //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica
  //cuando el usuario a soltado el marcador
  marker.addListener("click", toggleBounce);

  marker.addListener("dragend", function (event) {
    let cN = this.getPosition().lat();
    let cW = this.getPosition().lng();

    coordsN = cN;
    coordsW = cW;
  });
}

//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function getSelectedOption(elementId) {
  let x = document.getElementById(elementId);
  let y = x.options[x.selectedIndex].text;
  return y;
}
document.getElementById("test").addEventListener("click", () => {
  let inputHoraAm = document.getElementById("inputHoraAm").value;
  let inputHoraPm = document.getElementById("inputHoraPm").value;
  var hora = inputHoraAm + "AM - " + inputHoraPm + "PM";
  alert();
});

document.getElementById("send").addEventListener("click", () => {
  let destname = document.getElementById("destname").value;
  let inputSitio = document.getElementById("inputSitio").value;
  let inputProvincia = document.getSelectedOption("inputProvincia");
  let precio = document.getElementById("inputPrecio");
  let cupo = document.getElementById("inputCupos");
  let inputImg = document.getElementById("inputImg").value;

  var datosForm = new FormData();
  datosForm.append("file", inputImg);
  datosForm.append("name", destname);
  datosForm.append("coordN", coordsN);
  datosForm.append("coordW", coordsW);
  datosForm.append("province", inputProvincia);
  datosForm.append("price", precio);
  datosForm.append("cupos", cupo);
  datosForm.append("type", inputSitio);
  datosForm.append("idOwner", 0);

  console.log(jsonToSend);
  fetch("https://finalproject-309315.uc.r.appspot.com/destination/register", {
    method: "POST",

    mode: "cors",
    body: datosForm,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
});
