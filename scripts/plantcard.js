document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getPlants')
  .then(response => response.json())
  .then(data => plantCards(data['data']));
});

function plantCards(data) {
  let CardTemplate = document.getElementById("CardTemplate");

  var i = 1;

  data.forEach(function ({plantName, region, soilType, bloomingPeriod}) {
    
    
    let newcard = CardTemplate.content.cloneNode(true);

    
    newcard.querySelector('.card-title').innerHTML = plantName;
    newcard.querySelector('.card-region').innerHTML = region;
    newcard.querySelector('.card-soil').innerHTML = soilType;
    newcard.querySelector('.card-period').innerHTML = bloomingPeriod;
    // newcard.querySelector('.card-image').src = image;

    
    newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
    newcard.querySelector('.card-region').setAttribute("id", "cregion" + i);
    newcard.querySelector('.card-soil').setAttribute("id", "csoil" + i);
    newcard.querySelector('.card-period').setAttribute("id", "cperiod" + i);
    // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

    
    document.getElementById(data + "-go-here").appendChild(newcard);
    i++;
      
  }
)}
