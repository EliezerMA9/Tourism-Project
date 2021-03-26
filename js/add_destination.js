var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var coordsN = "";
var coordsW = "";

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

  marker.addListener("dragend", function(event) {
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
// var btn_saveUbicacion = document.getElementById("btn_saveUbicacion");
//
// btn_saveUbicacion.addEventListener("click", (e) => {
//   e.preventDefault();
//
//   (async() => {
//     const rawResponse = await fetch(
//       "http://0cbd09cc313f.ngrok.io/business/testlocation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//
//         body: JSON.stringify({
//           coordN: latitude, // Variable universal con la coordenada de LATITUD
//           coordW: longitude, // Variable universal con la coordenada de LONGITUD
//         }),
//       }
//     );
//     const content = await rawResponse;
//     console.log(content);
//   })();
// });



document.getElementById("send").addEventListener("click", () => {
  let destname = document.getElementById("destname").value;
  let destdescripcion = document.getElementById("destdescripcion").value;

  let jsonToSend = {
    name: destname,
    coordN: coordsN,
    coordW: coordsW,
    description: destdescripcion,
  };

  console.log(jsonToSend);
  fetch(
      "https://authentic-ether-303815.uc.r.appspot.com/destination/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(jsonToSend),
      }
    )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
});
