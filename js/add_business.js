function habilitar_input(elemento) {
  v = elemento.value;
  let categoria = document.getElementById("form-group-categoria");
  let provincia = document.getElementById("form-group-provincia");
  let telefono = document.getElementById("form-group-telf");
  let habitaciones = document.getElementById("form-group-habitaciones");
  let servicios_adicionales = document.getElementById("form-group_serv-adic");
  let btn_agregar = document.getElementById("btn_add");
  let businessConcept = document.getElementById("form-group-concept-neg");
  let rnc = document.getElementById("form-group-rnc");
  let description = document.getElementById("form-group-desc-adic");
  let file_img = document.getElementById("form-group-img");
  let saveBtn = document.getElementById("saveBtn");
  let servicios_add = document.getElementById("servicios_add");

  if (v == "Restaurante") {
    provincia.style.display = "block";
    telefono.style.display = "block";
    businessConcept.style.display = "block";
    rnc.style.display = "block";
    file_img.style.display = "block";
    saveBtn.style.display = "block";
    description.style.display = "block";
  } else if (v == "Hotel") {
    categoria.style.display = "block";
    provincia.style.display = "block";
    telefono.style.display = "block";
    file_img.style.display = "block";
    habitaciones.style.display = "block";
    servicios_adicionales.style.display = "block";
    description.style.display = "block";
    btn_agregar.style.display = "block";
    saveBtn.style.display = "block";
    servicios_add.style.display = "block";
    rnc.style.display = "block";
  } else {
    categoria.style.display = "none";
    servicios_add.style.display = "none";
    provincia.style.display = "none";
    telefono.style.display = "none";
    habitaciones.style.display = "none";
    servicios_adicionales.style.display = "none";
    description.style.display = "none";
    btn_add.style.display = "none";
    businessConcept.style.display = "none";
    rnc.style.display = "none";
    btn_agregar.style.display = "none";
    saveBtn.style.display = "none";
    file_img.style.display = "none";
    businessConcept.style.display = "none";
  }
}

var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var coordsN = "";
var coordsW = "";

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
      console.log(error);
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
    // icon: {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   scale: 10, //tamaño
    //   strokeColor: '#f00', //color del borde
    //   strokeWeight: 5, //grosor del borde
    //   fillColor: '#00f', //color de relleno
    //   fillOpacity:1// opacidad del relleno
    // },
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

/*


*/
let parent = document.getElementById("servicios_add");

document.getElementById("btn_add").addEventListener("click", () => {
  let combo = document.getElementById("servicios_adicionales");
  let selected = combo.options[combo.selectedIndex].text;
  if (selected == "") {
    console.log("hola");
  } else {
    parent.value += selected;
    parent.value += ", ";
  }
});

function remove(toRemove) {
  let elem = document.getElementById(toRemove.className);
  elem.parentNode.removeChild(elem);
}

function getSelectedOption(elementId) {
  let x = document.getElementById(elementId);
  let y = x.options[x.selectedIndex].text;
  return y;
}

document.getElementById("saveBtn").addEventListener("click", () => {
  let businessName = document.getElementById("businessName").value;
  let businessRnc = document.getElementById("rnc").value;
  let businessDescription = document.getElementById("description").value;
  let businessConcept = getSelectedOption("businessConcept");
  let businessType = getSelectedOption("inputNegocio");
  let hotelStars = getSelectedOption("inputCategoria");
  let businessProvince = getSelectedOption("inputProvincia");
  let businessPhoneNumber = document.getElementById("inputTelefono").value;
  let hotelRooms = document.getElementById("hotelRooms").value;
  let inputImg = document.getElementById("inputImg").value;
  let hotelServices = document.getElementById("servicios_add").value;

  var datosForm = new FormData();
  datosForm.append("idOwner", 0);
  datosForm.append("file", inputImg);
  datosForm.append("name", businessName);
  datosForm.append("coordN", coordsN);
  datosForm.append("coordW", coordsW);
  datosForm.append("province", businessProvince);
  datosForm.append("hotelRooms", hotelRooms);
  datosForm.append("description", businessDescription);
  datosForm.append("type", businessType);
  datosForm.append("telefono", businessPhoneNumber);
  datosForm.append("hotelServices", hotelServices);
  datosForm.append("rnc", businessRnc);
  datosForm.append("hotelStars", hotelStars);
  datosForm.append("concept", businessConcept);

  console.log(datosForm);

  fetch("https://finalproject-309315.uc.r.appspot.com/business/register", {
    method: "POST",

    mode: "cors",
    body: datosForm,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      console.log(datosForm);
    });
});
