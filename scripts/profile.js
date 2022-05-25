var userData;

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getUser')
  .then(response => response.json())
  .then(data => placeUser(data['data']));
});


// Loads the current user data
function placeUser(data) {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const photo = document.getElementById('photo');
  const planted = document.getElementById('planted');
  const region = document.getElementById('region');

  fullname.innerHTML = data[0].fullname;
  email.innerHTML = data[0].email;
  photo.src = ("./Image/profile/" + data[0].image);
  planted.innerHTML = data[0].plantCounter;
  region.innerHTML = data[0].region;

}
