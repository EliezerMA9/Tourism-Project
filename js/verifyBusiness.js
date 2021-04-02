let container = document.getElementById("cardContainer");

fetch("https://finalproject-309315.uc.r.appspot.com/business/showUnverified")
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      tempImages = data[i].Image.replaceAll(`"`, "");
      let images = tempImages.split(",");
      console.log(images[i]);

      let renderImages = "";

      let a = 0;
      images.forEach((element) => {
        renderImages += `<img src="${images[a]}" style="width: 100px; width: 100px;">`;
        a++;
      });

      if (data[i].TypeOf == "Hotel") {
        container.innerHTML += `
        <section class="light-bg" id="verifyContainer">

        <div id="${data[i].CoordN}|${data[i].CoordW}">
        <p>${data[i].TypeOf}</p>
        <p>Nombre: ${data[i].Name}</p>
        <p>Dueño: ${data[i].idOwner}</p>
        <p>Rnc: ${data[i].Rnc} </p>
        <p>Descripcion: ${data[i].Description} </p>
        <p>Provincia: ${data[i].Province} </p>
        <p>Telefono: ${data[i].PhoneNumber} </p>
        <p>Categoria: ${data[i].Stars} </p>
        <p>Afuera, etc: ${data[i].KindOfEvent} </p>
        <p>Cantidad de habitaciones: ${data[i].NoOfRooms} </p>
        <p>Servicios: ${data[i].Services} </p>
        <p>CoordN: ${data[i].CoordN} </p>
        <p>CoordW: ${data[i].CoordW} </p>
        <p>Images:
        ${renderImages}
        </p>
        <button class="${data[i].CoordN}+${data[i].CoordW}"onclick="verifyBusiness(this.className)">Verificar</button>
        <button class="${data[i].CoordN}+${data[i].CoordW}"onclick="verifyBusiness(this.className)">Declinar</button>
        </div>
        </section>
        `;
      } else {
        container.innerHTML += `
        <section class="light-bg" id="verifyContainer">

        <div id="${data[i].CoordN}|${data[i].CoordW}">
        <p> ${data[i].TypeOf} </p>
        <p> Nombre: ${data[i].Name} </p>
        <p> Dueño: ${data[i].idOwner} </p>
        <p> Rnc: ${data[i].Rnc} </p>
        <p> Descripcion: ${data[i].Description} </p>
        <p> Provincia: ${data[i].Province}  </p>
        <p> Telefono: ${data[i].PhoneNumber} </p>
        <p> Categoria: ${data[i].Stars} </p>
        <p>CoordN: ${data[i].CoordN} </p>
        <p>CoordW: ${data[i].CoordW} </p>
        <p> Images: ${renderImages} </p>
        <button class="${data[i].CoordN}+${data[i].CoordW}"onclick="verifyBusiness(this.className)">Verificar</button>
        <button class="${data[i].CoordN}+${data[i].CoordW}"onclick="declineBusiness(this.className)">Declinar</button>
        </div>
        </section>
        `;
      }
    }
  });

function verifyBusiness(elemCoords) {
  let coords = elemCoords.split("+");
  fetch("https://finalproject-309315.uc.r.appspot.com/business/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      coordN: coords[0],
      coordW: coords[1],
      verify: 1,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function declineBusiness(elemCoords) {
  let coords = elemCoords.split("+");
  fetch("https://finalproject-309315.uc.r.appspot.com/business/decline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      coordN: coords[0],
      coordW: coords[1],
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}
