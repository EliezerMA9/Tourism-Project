// Variables

var categoria = document.getElementById("inputCategoria");
var provincia = document.getElementById("inputProvincia");
var telefono = document.getElementById("inputTelefono");
var habitaciones = document.getElementById("hotelRooms");
var servicios_adicionales = document.getElementById("servicios_adicionales");
var btn_agregar = document.getElementById("btn_add");
var businessConcept = document.getElementById("businessConcept");
var tipo_actividades = document.getElementById("kindOfEvent");
var rnc = document.getElementById("rnc");
var description = document.getElementById("description");

function habilitar_input(elemento) {
  v = elemento.value;

  if (v == "Restaurante") {
    categoria.disabled = true;
    provincia.disabled = false;
    telefono.disabled = false;
    habitaciones.disabled = true;
    servicios_adicionales.disabled = true;
    btn_add.disabled = true;
    businessConcept.disabled = false;
    tipo_actividades.disabled = true;
    rnc.disabled = false;
    description.disabled = false;
  } else if (v == "Hotel") {
    categoria.disabled = false;
    provincia.disabled = false;
    telefono.disabled = false;
    habitaciones.disabled = false;
    servicios_adicionales.disabled = false;
    description.disabled = false;
    btn_add.disabled = false;
    rnc.disabled = false;
    businessConcept.disabled = true;
  } else {
    categoria.disabled = true;
    provincia.disabled = true;
    telefono.disabled = true;
    habitaciones.disabled = true;
    servicios_adicionales.disabled = true;
    btn_add.disabled = true;
  }
}

var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var latitude = "";
var longitude = "";

//Funcion principal
initMap = function() {
  //usamos la API para geolocalizar el usuario
  navigator.geolocation.getCurrentPosition(
    function(position) {
      coords = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };
      setMapa(coords); //pasamos las coordenadas al metodo para crear el mapa
    },
    function(error) {
      console.log(error);
    }
  );
};

function setMapa(coords) {
  //Se crea una nueva instancia del objeto mapa
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: new google.maps.LatLng(coords.lat, coords.lng),
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

  marker.addListener("dragend", function(event) {
    latitude = this.getPosition().lat();
    longitude = this.getPosition().lng();
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
var btn_saveUbicacion = document.getElementById("btn_saveUbicacion");

btn_saveUbicacion.addEventListener("click", (e) => {
  e.preventDefault();

  (async() => {
    const rawResponse = await fetch(
      "http://0cbd09cc313f.ngrok.io/business/testlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          coordN: latitude, // Variable universal con la coordenada de LATITUD
          coordW: longitude, // Variable universal con la coordenada de LONGITUD
        }),
      }
    );
    const content = await rawResponse;
    console.log(content);
  })();
});

/*


*/
let parent = document.getElementById("servicios_add");

document.getElementById("btn_add").addEventListener("click", () => {
  let combo = document.getElementById("servicios_adicionales");
  let selected = combo.options[combo.selectedIndex].text;
  if (selected == "") {
    console.log("hola");
  } else {
    parent.innerHTML +=
      `<div id="` +
      selected +
      `" class="hotelService">` +
      selected +
      `<button class="` +
      selected +
      `" type="button" onclick="remove(this);">x</button> </div>`;
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
  let services = document.getElementsByClassName("hotelService");
  let hotelServices = [];

  //let kindOfEvent = getSelectedOption("kindOfEvent");
  /* let coordN =
  let coordW = */

  for (let i = 0; i < services.length; i++) {
    hotelServices.push(services[i].id);
  }

  let jsonToSend = {};
  let idOwner = "0";

  if (businessType == "Restaurante") {
    jsonToSend = {
      idOwner: 9,
      name: businessName,
      rnc: businessRnc,
      description: businessDescription,
      type: businessType,
      stars: hotelStars,
      province: businessProvince,
      phoneNumber: businessPhoneNumber,
      rooms: "0",
      services: [""],
      images: [
        `"https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_0.png"`,
        `"https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_1.png"`,
        `"https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_2.png"`,
      ],
      concept: businessConcept,
      coordN: latitude.toString(),
      coordW: longitude.toString(),
    };
  } else {
    jsonToSend = {
      idOwner: 9,
      name: businessName,
      rnc: businessRnc,
      description: businessDescription,
      type: businessType,
      stars: hotelStars,
      province: businessProvince,
      phoneNumber: businessPhoneNumber,
      rooms: hotelRooms,
      services: hotelServices,
      images: [
        /* `https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_0.png`,
        `https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_1.png`,
        `https://storage.googleapis.com/finalproject_images_bucket/${businessRnc}_2.png`, */
      ],
      concept: "0",
      coordN: latitude.toString(),
      coordW: longitude.toString(),
    };
  }

  let nextForm =
    `<body>
    <div style="border-style: solid; border-color: aquamarine;">
        <form action="https://authentic-ether-303815.uc.r.appspot.com/business/uploadImages" id="businessImages" method="post" enctype="multipart/form-data">
            <label for="Elija las imagenes para su negocio">Servicios Adicionales</label>
            <br>
            <input id="filestowait" type="file" name="file" multiple/>
            <br>
            <br>
            <button id="send">Enviar</button>
            <input id="rnc" name="rnc" value="${businessRnc}" style="visibility: hidden;">
          </form>
    </div>
  `;



  console.log(jsonToSend);

  fetch("https://authentic-ether-303815.uc.r.appspot.com/business/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(jsonToSend),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      document.getElementById("htmlEnd").innerHTML = nextForm;
    });
});
