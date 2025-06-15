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

app.get('/', (req, res) => {
  con.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    res.send(results[3]);
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
// route to user login
app.post("/login", (req, res) => {
  const { full_name, password } = req.body;

  if (!full_name || !password) {
    return res.status(400).json({ message: "Missing full_name or password" });
  }

  con.query(
    "SELECT * FROM users WHERE full_name = ? AND password = ?",
    [full_name, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ err: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
