container = document.getElementById("destinationsContainer");

fetch("https://authentic-ether-303815.uc.r.appspot.com/search/destination", {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);

    for (let card of data) {
      container.innerHTML += `<div class='destinationCard' style="border-color: red; border-style: solid;"> 
      
        ${JSON.stringify(card)}
        <br>
        <br>
        </div>
        `;
    }
  });
