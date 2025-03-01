const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  const { projector_id, start_time, end_time } = req.body;
  db.query("INSERT INTO reservations (user_id, projector_id, start_time, end_time) VALUES (?, ?, ?, ?)", 
    [req.user.id, projector_id, start_time, end_time], (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Réservation effectuée !" });
    }
  );
});

router.get("/", authMiddleware, (req, res) => {
  db.query("SELECT * FROM reservations WHERE user_id = ?", [req.user.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;
