var express = require('express');
var router = express.Router();
var db = require('../config/db');

// GET /clientes - listar todos los clientes
router.get('/', async function(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

module.exports = router;