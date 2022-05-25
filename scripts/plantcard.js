document.addEventListener('DOMContentLoaded', function() {
  fetch('/getPlants')
  .then(response => response.json())
  .then(data => plantCards(data['data']));
});

document.querySelector('.card-body a').addEventListener('click', function(event) {
  if (event.target.className === "plant-button") {
      addPlant(event.target.dataset.plantName);
  }
});


function plantCards(data) {
  let CardTemplate = document.getElementById("CardTemplate");

  var i = 0;
  let list = "";

  data.forEach(function ({plantName, region, soilType, bloomingPeriod, image}) {
    
    
    let newcard = CardTemplate.content.cloneNode(true);

    
    newcard.querySelector('.card-title').innerHTML = plantName;
    newcard.querySelector('.card-region').innerHTML = region;
    newcard.querySelector('.card-soil').innerHTML = soilType;
    newcard.querySelector('.card-period').innerHTML = bloomingPeriod;
    newcard.querySelector('.card-image').src = "./PlantPhotos" + image;

    
    newcard.querySelector('.card-title').setAttribute("id", "ctitle" + (i+1));
    newcard.querySelector('.card-region').setAttribute("id", "cregion" + (i+1));
    newcard.querySelector('.card-soil').setAttribute("id", "csoil" + (i+1));
    newcard.querySelector('.card-period').setAttribute("id", "cperiod" + (i+1));
    newcard.querySelector('.card-image').setAttribute("id", "cimage" + (i+1));

  
    document.getElementById(list + "plants-go-here").appendChild(newcard);
    i++;
  }    
  
)}

