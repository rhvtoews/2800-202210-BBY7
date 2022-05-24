document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getUser')
  .then(response => response.json())
  .then(data => placeUser(data['data']));
});

// Loads the current user data
function placeUser(data) {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  console.log(data);
  console.log(data[0].fullname);
  console.log(data[0].email);

  fullname.innerHTML = data[0].fullname;
  email.innerHTML = data[0].email;

}