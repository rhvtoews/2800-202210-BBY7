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
  if (event.target.className === "editAdminBtn") {
    toggleAdmin(event.target.dataset.id, event);
  }
});

document.querySelector('#admin-create-btn').addEventListener('click', function(event) {
  const updateSection = document.querySelector('#adminCreate');
  updateSection.hidden = false;
});


function deleteUser(ID) {
  fetch('/delete/' + ID, {
      method: 'DELETE'
  })
  location.reload();
}


const updateNameBtn = document.querySelector('#update-name-btn');
const updateEmailBtn = document.querySelector('#update-email-btn');
const updatePasswordBtn = document.querySelector('#update-password-btn');
const updateRegionBtn = document.querySelector('#update-region-btn');

function handleEditUser(ID) {
  const updateSection = document.querySelector('#updateUser');
  updateSection.hidden = false;
  document.querySelector('#update-name-input').dataset.id = ID;
  document.querySelector('#update-email-input').dataset.id = ID;
  document.querySelector('#update-password-input').dataset.id = ID;
  document.querySelector('#update-region-input').dataset.id = ID;
}



updateNameBtn.onclick = function() {
  const updateNameInput = document.querySelector('#update-name-input');
  fetch('/adminChgName', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          ID: updateNameInput.dataset.id,
          fullname: updateNameInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  })
}

updateEmailBtn.onclick = function() {
  const updateEmailInput = document.querySelector('#update-email-input');
  fetch('/adminChgEmail', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          ID: updateEmailInput.dataset.id,
          email: updateEmailInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          
      }
  })
}

updatePasswordBtn.onclick = function() {
  const updatePasswordInput = document.querySelector('#update-password-input');
  fetch('/adminChgPassword', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          ID: updatePasswordInput.dataset.id,
          password: updatePasswordInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  })
}

updateRegionBtn.onclick = function() {
  const updateRegionInput = document.querySelector('#update-region-input');
  fetch('/adminChgRegion', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          ID: updateRegionInput.dataset.id,
          region: updateRegionInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  })
}


function toggleAdmin(ID) {
  fetch('/makeAdmin/' + ID);
  location.reload();
}



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
    adminTable += `<td><button class='editAdminBtn' data-id=${ID}>Admin</td>`;
    adminTable += "</tr>";
  });
  

  table.innerHTML = adminTable;
}


// Loads the logged in user data
function placeUser(data) {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const region = document.getElementById('region');

  fullname.innerHTML = data[0].fullname;
  email.innerHTML = data[0].email;
  region.innerHTML = data[0].region;

}