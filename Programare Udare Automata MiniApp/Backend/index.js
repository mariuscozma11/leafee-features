const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
//Middleware
app.use(cors());
app.use(express.json());

//RUTE//

//creeaza o programare
app.post("/programari", async (req, res) => {
  try {
    const { date, hour, minute, duration } = req.body;
    const newProgramare = await pool.query(
      `INSERT INTO programari(date, hour, minute, duration) VALUES($1,$2,$3,$4) RETURNING *`,
      [date, hour, minute, duration]
    );
    res.json(newProgramare.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//GET toate programariile
app.get("/programari", async (req, res) => {
  try {
    const toateProgramarile = await pool.query("SELECT * FROM programari");
    res.json(toateProgramarile.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//GET o programare
app.get("/programari/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const programare = await pool.query(
      "SELECT * FROM programari WHERE programari_id=$1",
      [id]
    );
    res.json(programare.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//actualizeaza o programare

//sterge o programare

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
