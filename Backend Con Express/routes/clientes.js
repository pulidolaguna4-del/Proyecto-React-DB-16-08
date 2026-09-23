var express = require('express');
var router = express.Router();
var db = require('../config/db');

// 1. OBTENER TODOS LOS CLIENTES (READ)
router.get('/', async function(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// 2. CREAR CLIENTE (CREATE)
router.post('/', async function(req, res) {
  const { nomCliente, contacto, departamento, ciudad } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO clientes (nomCliente, contacto, departamento, ciudad) VALUES (?, ?, ?, ?)',
      [nomCliente, contacto, departamento, ciudad]
    );
    res.status(201).json({ id_cliente: result.insertId, nomCliente, contacto, departamento, ciudad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// 3. ACTUALIZAR CLIENTE (UPDATE)
router.put('/:id', async function(req, res) {
  const { id } = req.params;
  const { nomCliente, contacto, departamento, ciudad } = req.body;
  try {
    await db.query(
      'UPDATE clientes SET nomCliente = ?, contacto = ?, departamento = ?, ciudad = ? WHERE id_cliente = ?',
      [nomCliente, contacto, departamento, ciudad, id]
    );
    res.json({ message: 'Cliente actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// 4. ELIMINAR CLIENTE (DELETE)
router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;