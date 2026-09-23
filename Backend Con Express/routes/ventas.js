var express = require('express');
var router = express.Router();
var db = require('../config/db');

// GET /ventas - listar todas las ventas
router.get('/', async function(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM ventas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

module.exports = router;