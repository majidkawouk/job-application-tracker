const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3001;

app.use(express.json());

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tracker",
  port: 3306,
});

app.get("/", (req, res) => {
  con.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.send(results[3]);
  });
});
// Route to register user
app.post("/register", (req, res) => {
  const { email, password, full_name } = req.body;
  con.query(
    "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)",
    [email, password, full_name],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }
      res.status(200).send("User added successfully");
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
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: result[0].id,
          full_name: result[0].full_name,
          email: result[0].email,
        },
      });
    }
  );
});

//route to show company

app.post("/dashboard", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ err: "Missing user_id in request body" });
  }

  con.query(
    `SELECT * 
     FROM users u 
     INNER JOIN applications a ON a.user_id = u.user_id 
     INNER JOIN companies c ON a.company_id = c.company_id 
     WHERE u.user_id = ?`,
    [user_id],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ err: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ err: "Invalid user_id" });
      }

      return res.json(result);
    }
  );
});


//delete applacation
app.delete("/dashboard/remove", (req, res) => {
  const { application_id } = req.body;

  if (!application_id) {
    return res.status(400).json({ err: "Missing application_id in request body" });
  }

  con.query(
    `delete From  applications
     WHERE application_id = ?`,
    [application_id],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ err: "Database error" });
      }

      if(result.affectedRows == 0){
        return res.status(401).json({message:" application_id not found"})
      }


      return res.json({message:"Deleted successfuly"});
    }
  );
});
//update
app.patch("/dashboard/update", (req, res) => {
  const { application_id } = req.body;

  if (!application_id) {
    return res.status(400).json({ err: "Missing application_id in request body" });
  }

  con.query(
    `UPDATE applications set 
     WHERE application_id = ?`,
    [application_id],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ err: "Database error" });
      }

      if(result.affectedRows == 0){
        return res.status(401).json({message:" application_id not found"})
      }


      return res.json({message:"Deleted successfuly"});
    }
  );
});

//port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
