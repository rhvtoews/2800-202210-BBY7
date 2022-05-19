const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbOperation = require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// Create
app.post('/insert', (request, response) => {
  const { fullname } = request.body;
  const db = dbOperation.getDbOperation();
  const results = db.insertName(fullname);
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});


// Read
app.get('/getTable', (request, response) => {
  const db = dbOperation.getDbOperation();

  const results = db.getTableData();
  
  results.then(data => response.json({ data : data })).catch(err => console.log(err));
});

// Update



// Delete
app.delete('/delete/:ID', (request, response) => {
  const { ID } = request.params;
  const db = dbOperation.getDbOperation();
  console.log('ID fed to DB: ' + ID);
  const results = db.deleteUser(ID);
  
  results
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('App is running on port: ' + process.env.PORT));