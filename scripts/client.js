document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:8000/getTable')
  .then(response => response.json())
  .then(data => loadTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event) {
  if (event.target.className === "deleteUserBtn") {
      console.log('Delete ID: ' + event.target.dataset.ID);
      deleteUser(event.target.dataset.ID);
  }
  if (event.target.className === "editUserBtn") {
    console.log('Edit ID: ' + event.target.dataset.ID);
    handleEditUser(event.target.dataset.ID);
  }
});

function deleteUser(ID) {
  console.log('ID at client: ' + ID);
  fetch('http://localhost:8000/delete/' + ID, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  });
}

function handleEditUser(ID) {
  const updateSection = document.querySelector('#updateUser');
  updateSection.hidden = false;
  document.querySelector('#updateNameInput').dataset.ID = ID;
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