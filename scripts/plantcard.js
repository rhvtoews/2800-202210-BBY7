document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getPlants')
  .then(response => response.json())
  .then(data => plantCards(data['data']));
});


/**
 * Displays all the possible restaurants that can be added to the game list.
 * @param {Restaurants} collection collection that corresponds to the restaurant list
 */
 function plantCards(data) {
  let CardTemplate = document.getElementById("CardTemplate");

    db.collection(data).get()
      .then(snap => {
        var i = 1;
        snap.forEach(doc => {    //iterate thru each doc
          var title = doc.data().plantName;
          var region = doc.data().region;
          var soilType = doc.data().soilType;
          var period = doc.data().bloomingPeriod;
          // var image = doc.data().image;
          
          let newcard = CardTemplate.content.cloneNode(true);

          //update title and text and image
          newcard.querySelector('.card-title').innerHTML = title;
          newcard.querySelector('.card-region').innerHTML = region;
          newcard.querySelector('.card-soil').innerHTML = soilType;
          newcard.querySelector('.card-period').innerHTML = period;
          // newcard.querySelector('.card-image').src = image;

          //give unique ids to all elements for future use
          newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
          newcard.querySelector('.card-region').setAttribute("id", "cregion" + i);
          newcard.querySelector('.card-soil').setAttribute("id", "csoil" + i);
          newcard.querySelector('.card-period').setAttribute("id", "cperiod" + i);
          // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

          //attach to gallery
          document.getElementById(data + "-go-here").appendChild(newcard);
          i++;
        })
      })
  
}
