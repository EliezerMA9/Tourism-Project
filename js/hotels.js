container = document.getElementById("hotelsContainer");

fetch("https://authentic-ether-303815.uc.r.appspot.com/search/byType", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  body: JSON.stringify({
    type: "Hotel",
  }),
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);

    for (let card of data) {
      container.innerHTML += `<div class='hotelCard' style="border-color: red; border-style: solid;"> 
      
        ${JSON.stringify(card)}
        <br>
        <br>
        </div>
        `;
    }
  });
