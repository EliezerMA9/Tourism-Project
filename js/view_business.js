fetch("https://finalproject-309315.uc.r.appspot.com/search")
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      tempstrtoreplace = data[i].Image.replaceAll(",", "|");
      fIndex = tempstrtoreplace.indexOf("|");
      firstImage = tempstrtoreplace.slice(1, fIndex);
      secondImage = tempstrtoreplace.slice(
        fIndex + 1,
        tempstrtoreplace.lastIndexOf("|")
      );
      tempstrtoreplacenext = tempstrtoreplace.slice(
        secondImage.search(secondImage),
        tempstrtoreplace.length
      );
      thirdImage = tempstrtoreplace.slice(
        secondImage.length + secondImage.length + 3,
        tempstrtoreplace.length
      );
      console.log({
        firstImage,
        secondImage,
        thirdImage,
      });
      //<p> <b>Afuera, etc: </b> ${data[i].KindOfEvent} </p>
      if (data[i].TypeOf == "Hotel") {
        container.innerHTML += `<div class="card_business" id="${data[i].Rnc}">
          <h5>${data[i].TypeOf}</h5><hr>
          <p> <b>Nombre: </b> ${data[i].Name}</p>
          <p> <b>Dueño: </b> ${data[i].idOwner}</p>
          <p> <b>Rnc: </b> ${data[i].Rnc} </p>
          <p> <b>Descripcion: </b> ${data[i].Description} </p>
          <p> <b>Provincia: </b> ${data[i].Province} </p>
          <p> <b>Telefono: </b> ${data[i].PhoneNumber} </p>
          <p> <b>Categoria: </b> ${data[i].Stars} </p>

          <p> <b>Cantidad de habitaciones: </b> ${data[i].NoOfRooms} </p>
          <p> <b>Servicios: </b> ${data[i].Services} </p>
          <p> <b>Images: </b> <br><br>
          <img src="${firstImage}" class="businessImage" >
          <img src="${secondImage}" class="businessImage" >
          <img src="${thirdImage}" class="businessImage" > </p>
        </div>`;
      } else {
        container.innerHTML += `<div class="card_business" id="${data[i].Rnc}">
            <h5>${data[i].TypeOf} </h5><hr>
            <p> <b>Nombre: </b> ${data[i].Name} </p>
            <p> <b>Dueño: </b> ${data[i].idOwner} </p>
            <p> <b>Rnc:</b> ${data[i].Rnc}</p>
            <p> <b>Descripcion: </b> ${data[i].Description} </p>
            <p> <b>Provincia: </b> ${data[i].Province} </p>
            <p> <b>Telefono: </b> ${data[i].PhoneNumber} </p>
            <p> <b>Categoria: </b> ${data[i].Stars} </p>

            <p> <b>Images: </b> <br><br>
            <img src="${firstImage}" class="businessImage" >
            <img src="${secondImage}" class="businessImage" >
            <img src="${thirdImage}" class="businessImage" > </p>
        </div>`;
      }

      document.getElementById(data[i].Rnc).style.marginBottom = "50px";
      document.getElementById(data[i].Rnc).style.width = "30%";
      // document.getElementById(data[i].Rnc).style.borderStyle = "solid";
      // document.getElementById(data[i].Rnc).style.borderColor = "red";
    }
  });
