// import dependencies
const express = require('express');
const path = require('path');

// instantiate router
const router = express.Router();

// returns index.html to browser when hitting '/' endpoint
router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, "../public/index.html");
    res.sendFile(indexPath);
});

// returns notes.html to browser when hitting '/notes' endpoint
router.get('/notes', (req, res) => {
    const notePath = path.join(__dirname, '../public/notes.html');
    res.sendFile(notePath);
});

module.exports = router;