document.addEventListener('DOMContentLoaded', function() {
  fetch('/getTable')
  .then(response => response.json())
  .then(data => loadTable(data['data']));

  fetch('/getUser')
  .then(response => response.json())
  .then(data => placeUser(data['data']));

});



document.querySelector('table tbody').addEventListener('click', function(event) {
  if (event.target.className === "deleteUserBtn") {
    deleteUser(event.target.dataset.id);
  }
  if (event.target.className === "editUserBtn") {
    handleEditUser(event.target.dataset.id);
  }
});



// document.querySelector('#update-name-input').addEventListener('click', function(event) {
      
// });

// document.querySelector('#update-email-input').addEventListener('click', function(event) {
      
// });

// document.querySelector('#update-password-input').addEventListener('click', function(event) {
      
// });

// document.querySelector('#update-region-input').addEventListener('click', function(event) {
      
// });

function deleteUser(ID) {
  fetch('/delete/' + ID, {
      method: 'DELETE'
  })
  location.reload();
}

function handleEditUser(ID) {
  const updateSection = document.querySelector('#updateUser');
  updateSection.hidden = false;
  document.querySelector('#updateNameInput').dataset.id = ID;
}

const addBtn = document.querySelector('#add-name-btn');

// Loads our list of users
function loadTable(data) {
  const table = document.querySelector('table tbody');
  
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='noData' colspan ='8'>No user data is present</td></tr>";
    return;
  }
  let adminTable = "";

  data.forEach(function ({ID, fullname, email, password, region, plantCounter, admin}) {
    adminTable += "<tr>";
    adminTable += `<td>${ID}</td>`;
    adminTable += `<td>${fullname}</td>`;
    adminTable += `<td>${email}</td>`;
    adminTable += `<td>${password}</td>`;
    adminTable += `<td>${region}</td>`;
    adminTable += `<td>${plantCounter}</td>`;
    adminTable += `<td>${(admin ? true : false)}</td>`;
    adminTable += `<td><button class='deleteUserBtn' data-id=${ID}>Delete</td>`;
    adminTable += `<td><button class='editUserBtn' data-id=${ID}>Edit</td>`;
    adminTable += "</tr>";
  });
  

  table.innerHTML = adminTable;
}


// Loads the current user data
function placeUser(data) {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const region = document.getElementById('region');

  fullname.innerHTML = data[0].fullname;
  email.innerHTML = data[0].email;
  region.innerHTML = data[0].region;

}