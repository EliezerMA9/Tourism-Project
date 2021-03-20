let parent = document.getElementById("servicios_add");

document.getElementById("btn_add").addEventListener("click", () => {
  let combo = document.getElementById("servicios_adicionales");
  let selected = combo.options[combo.selectedIndex].text;
  if (selected == "") {
    console.log("ola");
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
  let kindOfEvent = getSelectedOption("kindOfEvent");

  for (let i = 0; i < services.length; i++) {
    hotelServices.push(services[i].id);
  }

  let jsonToSend = {};
  let idOwner = "0";

  if (businessType == "Restaurante") {
    jsonToSend = {
      idOwner: 0,
      name: businessName,
      rnc: businessRnc,
      description: businessDescription,
      type: businessType,
      stars: hotelStars,
      province: businessProvince,
      phoneNumber: businessPhoneNumber,
      rooms: "0",
      services: [""],
      images: [""],
      concept: businessConcept,
      kindOfEvent: kindOfEvent,
    };
  } else {
    jsonToSend = {
      idOwner: 0,
      name: businessName,
      rnc: businessRnc,
      description: businessDescription,
      type: businessType,
      stars: hotelStars,
      province: businessProvince,
      phoneNumber: businessPhoneNumber,
      rooms: hotelRooms,
      services: hotelServices,
      images: [""],
      concept: "0",
      kindOfEvent: kindOfEvent,
    };
  }

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
    });
});
