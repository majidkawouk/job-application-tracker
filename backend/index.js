const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(express.json());

// Create connection pool
const con = mysql.createPool({
  host: "localhost",
  user: "root",   
  password: "",    
  database: "tracker",
  port: 3306          
});

// Route to get users
app.get('/', (req, res) => {
  con.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    // results is an array of users
    res.send(results[3]); // send 4th user (if exists)
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
