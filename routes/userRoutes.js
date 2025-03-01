const express = require('express');
const router = express.Router();

// Exemple de route pour tester
router.get('/test', (req, res) => {
    res.send('User route is working!');
});

module.exports = router;
