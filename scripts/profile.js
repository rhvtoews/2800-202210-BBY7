document.addEventListener('DOMContentLoaded', function() {
  fetch('/getUser')
  .then(response => response.json())
  .then(data => placeUser(data['data']));

  fetch('/getTimeline')
  .then(response => response.json())
  .then(data => placeTimeline(data['data']));
});



// Loads the current user data
function placeUser(data) {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const photo = document.getElementById('photo');
  const planted = document.getElementById('planted');
  const region = document.getElementById('region');
  const timelineName = document.getElementById('timelineName');

  fullname.innerHTML = data[0].fullname;
  email.innerHTML = data[0].email;
  photo.src = ("./Image/profile/" + data[0].image);
  planted.innerHTML = data[0].plantCounter;
  region.innerHTML = data[0].region;
  timelineName.innerHTML = data[0].fullname;

}


function placeTimeline(data) {
  let CardTemplate = document.getElementById("CardTemplate");

  var i = 0;
  let list = "";

  data.forEach(function ({pName, cardTime}) {
       
    let newcard = CardTemplate.content.cloneNode(true);
    const d = new Date(cardTime);
  

    
    newcard.querySelector('.card-title').innerHTML = pName;
    newcard.querySelector('.card-timestamp').innerHTML = ("Planted: " + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate());

    newcard.querySelector('.card-title').setAttribute("id", "ctitle" + (i+1));   
    newcard.querySelector('.card-timestamp').setAttribute("id", "ctime" + (i+1));
    
    document.getElementById(list + "timeline-here").appendChild(newcard);
    i++;
  }    
  
)}

