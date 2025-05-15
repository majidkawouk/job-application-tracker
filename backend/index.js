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
// Route to register user
app.post('/register', (req, res) => {
  const { email, password, full_name } = req.body;
  con.query(
    "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)",
    [email, password, full_name],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      res.status(200).send('User added successfully');
    }
  );  
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
