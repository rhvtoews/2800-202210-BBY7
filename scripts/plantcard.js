document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getPlants')
  .then(response => response.json())
  .then(data => plantCards(data['data']));
});

function plantCards(data) {
  let CardTemplate = document.getElementById("CardTemplate");
  console.log(CardTemplate);
  console.log(data);  
  var i = 0;

  data.forEach(function ({plantName, region, soilType, bloomingPeriod}) {
    
    
    let newcard = CardTemplate.content.cloneNode(true);

    
    newcard.querySelector('.card-title').innerHTML = data[i].plantName;
    newcard.querySelector('.card-region').innerHTML = data[i].region;
    newcard.querySelector('.card-soil').innerHTML = data[i].soilType;
    newcard.querySelector('.card-period').innerHTML = data[i].bloomingPeriod;
    // newcard.querySelector('.card-image').src = image;

    
    newcard.querySelector('.card-title').setAttribute("id", "ctitle" + (i+1));
    newcard.querySelector('.card-region').setAttribute("id", "cregion" + (i+1));
    newcard.querySelector('.card-soil').setAttribute("id", "csoil" + (i+1));
    newcard.querySelector('.card-period').setAttribute("id", "cperiod" + (i+1));
    // newcard.querySelector('.card-image').setAttribute("id", "cimage" + (i+1));

    console.log(newcard);
    document.getElementById(data + "-go-here").appendChild(newcard);
    i++;
      
  }
)}
