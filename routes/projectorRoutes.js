const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO projectors (name) VALUES (?)", [name], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Projecteur ajouté !" });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM projectors WHERE disponible = TRUE", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

router.put("/:id", authMiddleware, (req, res) => {
  const { status } = req.body;
  db.query("UPDATE projectors SET status = ? WHERE id = ?", [status, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "État du projecteur mis à jour" });
  });
});

router.delete("/:id", authMiddleware, (req, res) => {
  db.query("DELETE FROM projectors WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Projecteur supprimé" });
  });
});

module.exports = router;
