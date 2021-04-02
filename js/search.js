container = document.getElementById("cardContainer");

let marker;
let map;

function setMapa(n, w) {
  if (n === undefined) {
    x = -19;
    y = 19;
  } else {
    x = n;
    y = w;
  }

  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(x, y),
    zoom: 11,
    disableDefaultUI: true,
  });

  const styles = {
    default: [],
    hide: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  map.setOptions({ styles: styles["hide"] });

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(x, y),
    map: map,
    animation: google.maps.Animation.DROP,
  });
}
if (document.getElementById("searchbtn")) {
  document.getElementById("searchbtn").addEventListener("click", () => {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKbYHTfjpJFCrnbI9HpcCUxPDrH9xILQs&callback=setMapa";
    script.async = true;

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    /*
     
  
  
     */

    let text = document.getElementById("search_input").value;
    container.innerHTML = "";
    let temparr = [];

    fetch(`https://finalproject-309315.uc.r.appspot.com/search?ts=${text}`)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        data.forEach((element) => {
          temparr = element.Image.split(",");
          let images = temparr[0].slice(1, temparr[0].length);

          tmp = "";

          if ("Services" in element) {
            let tempsrvcs = element.Services;

            if (tempsrvcs.length > 2) {
              tmp = tempsrvcs.slice(1, element.Services.length - 1);
            } else {
            }
          }

          let categoria = element.TypeOf;
          if (categoria == "Restaurante") {
            container.innerHTML += `<a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "${element.TypeOf}",
            "description": "${element.Description}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}", "phoneNumber": "${element.PhoneNumber}", "province": "${element.Province}", "rnc": "${element.Rnc}",
            "id": "${element.idBusiness}", "concept": "${element.Concept}"}'>
            
            <div class="card">
               <img src="${images}">
             <div class="info">
                <p class="categoria concierto">${categoria}</p>
                <p class="titulo">${element.Name}</p>
                <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
             </div>
           </div>
           </a>`;
          } else if (categoria == "Hotel") {
            container.innerHTML += `
            <a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "${element.TypeOf}",
            "description": "${element.Description}", "phoneNumber": "${element.PhoneNumber}", "province": "${element.Province}", "rnc": "${element.Rnc}",
            "services": "${tmp}", "noOfRooms": "${element.NoOfRooms}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}", "id": "${element.idBusiness}", "stars": "${element.Stars}"}'>
            <div class="card">
            <img src="${images}">
                <div class="info">
                    <p class="categoria paseo">${categoria}</p>
                    <p class="titulo">${element.Name}</p>
                    <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
                </div>
             </div>
             </a>`;
          } else if ("Cupo" in element) {
            //Activities
          } else {
            container.innerHTML += `
            <a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "Destination",
            "description": "${element.Description}", "province": "${element.Province}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}", "id": "${element.idDestination}"}'>
            <div class="card">
            <img src="${images}">
                <div class="info">
                    <p class="categoria paseo">Destination</p>
                    <p class="titulo">${element.Name}</p>
                    <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
                </div>
             </div>
             </a>`;
          }
        });
      });
  });
}

function info(elem) {
  let data = elem.getAttribute("data-info");
  let objdata = JSON.parse(data);

  fetch(
    `https://finalproject-309315.uc.r.appspot.com/search/add?id=${objdata.id}&type=${objdata.type}`,
    {
      method: "POST",
      mode: "cors",
    }
  )
    .then((resp) => resp.json())
    .then((data) => {});

  console.log(objdata);

  if (objdata.length == 7) {
    setMapa(objdata.coordN, objdata.coordW);

    document.getElementById("modal_info").innerHTML = `
    <p>${objdata.name}</p>
    <p>${objdata.description}</p>
    <p>${objdata.province}</p>
    <p>${objdata.phoneNumber}</p>
    <p>${objdata.concept}</p>
    <p>${objdata.rnc}</p>
    <p>${objdata.type}</p>`;
  } else if (objdata.type == "Restaurante") {
    setMapa(objdata.coordN, objdata.coordW);

    document.getElementById("modal_info").innerHTML = `
    <p>${objdata.name}</p>
    <p>${objdata.description}</p>
    <p>${objdata.province}</p>
    <p>${objdata.phoneNumber}</p>
    <p>${objdata.noOfRooms}</p>
    <p>${objdata.stars}</p>
    <p>${objdata.services}</p>
    <p>${objdata.rnc}</p>
    <p>${objdata.type}</p>`;
  } else if (objdata.type == "Destination") {
    setMapa(objdata.coordN, objdata.coordW);

    document.getElementById("modal_info").innerHTML = `
    <p>${objdata.name}</p>
    <p>${objdata.description}</p>
    <p>${objdata.province}</p>
    <p>${objdata.type}</p>`;
  }

  $("#myModal").modal();
}

if (document.getElementById("restaurant-count")) {
  fetch(`https://finalproject-309315.uc.r.appspot.com/search/count`)
    .then((resp) => resp.json())
    .then((data) => {
      let obj = {};
      obj.restaurant = data.restaurant;
      obj.hotel = data.hotel;
      obj.activities = data.activities;
      obj.destination = data.destination;

      document.getElementById("restaurant-count").innerHTML =
        obj.restaurant + " Resultados";
      document.getElementById("hotel-count").innerHTML =
        obj.hotel + " Resultados";
      document.getElementById("activities-count").innerHTML =
        obj.activities + " Resultados";
      document.getElementById("destination-count").innerHTML =
        obj.destination + " Resultados";
    });

  fetch(`https://finalproject-309315.uc.r.appspot.com/search/popular`)
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const elem = data[i];

        if (elem.hasOwnProperty("idDestination")) {
          console.log(elem);
          console.log("destination");

          toInsert = `<div class="col-md-4 featured-responsive" style="border-color: red; border-style: solid;">
        <p>tipo: destination</p>
        </div>`;
        } else if ("idBusiness" in elem) {
          console.log(elem);
          console.log("business");

          toInsert = `<div class="col-md-4 featured-responsive" style="border-color: red; border-style: solid;">
        <p>tipo: negocio</p>
        </div>`;
        } else if ("idActivities" in elem) {
          console.log(elem);
          console.log("activities");

          toInsert = `<div class="col-md-4 featured-responsive" style="border-color: red; border-style: solid;">
        <p>tipo: actividad</p>
        </div>`;
        }

        document.getElementById("top-container").innerHTML += toInsert;
      }

      console.log(data);
    });
}
