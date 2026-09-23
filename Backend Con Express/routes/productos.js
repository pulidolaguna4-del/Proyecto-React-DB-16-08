var express = require('express');
var router = express.Router();
var db = require('../config/db');

// GET /productos - listar todos los productos
router.get('/', async function(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;