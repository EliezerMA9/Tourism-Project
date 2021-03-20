fetch("https://authentic-ether-303815.uc.r.appspot.com/business/showVerified")
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
      console.log({ firstImage, secondImage, thirdImage });

      if (data[i].TypeOf == "Hotel") {
        container.innerHTML += `<div id="${data[i].Rnc}">
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
          <p>Images: 
          <img src="${firstImage}" class="businessImage" >
          <img src="${secondImage}" class="businessImage" >
          <img src="${thirdImage}" class="businessImage" > </p>
        </div>`;
      } else {
        container.innerHTML += `<div id="${data[i].Rnc}">
            <p>${data[i].TypeOf} </p>
            <p>Nombre:${data[i].Name} </p>
            <p> Dueño:${data[i].idOwner} </p>
            <p> Rnc:${data[i].Rnc}</p>
            <p> Descripcion:${data[i].Description} </p>
            <p> Provincia: ${data[i].Province} </p>
            <p> Telefono:${data[i].PhoneNumber} </p>
            <p> Categoria:${data[i].Stars} </p>
            <p> Afuera, etc:${data[i].KindOfEvent}</p>
            <p>Images: 
            <img src="${firstImage}" class="businessImage" >
            <img src="${secondImage}" class="businessImage" >
            <img src="${thirdImage}" class="businessImage" > </p>
        </div>`;
      }

      document.getElementById(data[i].Rnc).style.marginBottom = "50px";
      document.getElementById(data[i].Rnc).style.borderStyle = "solid";
      document.getElementById(data[i].Rnc).style.borderColor = "red";
    }
  });
