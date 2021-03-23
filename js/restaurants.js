container = document.getElementById("restaurantsContainer");

fetch("https://authentic-ether-303815.uc.r.appspot.com/search/byType", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  body: JSON.stringify({
    type: "Restaurante",
  }),
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);

    for (let card of data) {
      container.innerHTML += `<div class='restaurantCard' style="border-color: red; border-style: solid;"> 
      
        ${JSON.stringify(card)}
        <br>
        <br>
        </div>
        `;
    }
  });
