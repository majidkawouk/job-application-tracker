const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());


app.use(express.json());

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tracker",
  port: 3306,
});
//port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
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
//add aplication
app.post("/dashboard/add_application", (req, res) => {
  const {company_id,job_title,job_location,job_url,status,application_date,response_date,salary_expectation}= req.body;
  if(!company_id  || !job_title || !job_location || !job_url || !status || !application_date || !response_date || !salary_expectation) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  con.query(
    `INSERT INTO applications(company_id,job_title,job_location,job_url,status,application_date,response_date,salary_expectation)
    VALUES(?,?,?,?,?,?,?,?)`,
    [company_id,job_title,job_location,job_url,status,application_date,response_date,salary_expectation],
    (err, result) => {
      if (err) {
        console.log("error:", err);
        return res.status(500).json({ err: "database error" });
      }
      return res.status(201).json({ message: "Application added successfully" });
    }
  );
});

//delete applacation
app.delete("/dashboard/delete_application", (req, res) => {
  const { application_id } = req.body;

  if (!application_id) {
    return res
      .status(400)
      .json({ err: "Missing application_id in request body" });
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

      if (result.affectedRows == 0) {
        return res.status(401).json({ message: " application_id not found" });
      }

      return res.json({ message: "Deleted successfuly" });
    }
  );
});
//update application state
app.patch("/dashboard/update", (req, res) => {
  const { application_id ,status} = req.body;

  if (!application_id) {
    return res
      .status(400)
      .json({ err: "Missing application_id in request body" });
  }

  con.query(
    `UPDATE applications set 
      status =  ?
     WHERE application_id = ?`,
    [status,application_id],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ err: "Database error" });
      }

      if (result.affectedRows == 0) {
        return res.status(401).json({ message: "application_id not found" });
      }

      return res.json({ message: "Updated successfuly" });
    }
  );
});
//add company
app.post("/dashboard/add_company", (req, res) => {
  const { name, website, headquarters_location } = req.body;
  if (!name || !website || !headquarters_location) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  con.query(
    `INSERT INTO companies(name,website,headquarters_location)
    VALUES(?,?,?)`,
    [name, website, headquarters_location],
    (err, result) => {
      if (err) {
        console.log("error:", err);
        return res.status(500).json({ err: "database error" });
      }
      return res.status(201).json({ message: "Company added successfully" });
    }
  );
});
//delete company 
app.delete("/dashboard/delete_company", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ err: "Missing company name in request body" });
  }

  con.query(
    `delete From companies
     WHERE name = ?`,
    [name],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ err: "Database error" });
      }

      if (result.affectedRows == 0) {
        return res.status(401).json({ message: "name not found" });
      }

      return res.json({ message: "Deleted successfuly" });
    }
  );
});




