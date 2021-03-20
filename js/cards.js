// ------------------------------------------------------------------- //




// ------------------------------------------------------------------- //
    let container = document.getElementById("cardContainer");

    fetch("https://authentic-ether-303815.uc.r.appspot.com/business/showVerified", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // const card = document.createElement('div');
        for(let i = 0; i < data.length; i++) { container.innerHTML += `
        <div class="card">
        <img src="images/evento2.jpg">
        <div class="info">
            <p class="categoria clase">${data[i].TypeOf}</p>
            <p class="titulo">${data[i].Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${data[i].Province}</p>
        </div>
    </div>
        `;}
    
      });
  
  //
