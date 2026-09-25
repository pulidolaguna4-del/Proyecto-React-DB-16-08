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

<<<<<<< master
// 2. CREAR CLIENTE (CREATE)
router.post('/', async function(req, res) {
  const { nomCliente, contacto, departamento, ciudad } = req.body;
=======
// POST /clientes - crear un cliente
router.post('/', async function(req, res) {
  const { nomCliente, contacto, departamento, ciudad } = req.body;

  if (!nomCliente || !contacto || !departamento || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

>>>>>>> local
  try {
    const [result] = await db.query(
      'INSERT INTO clientes (nomCliente, contacto, departamento, ciudad) VALUES (?, ?, ?, ?)',
      [nomCliente, contacto, departamento, ciudad]
    );
<<<<<<< master
    res.status(201).json({ id_cliente: result.insertId, nomCliente, contacto, departamento, ciudad });
=======
    res.status(201).json({
      id_cliente: result.insertId,
      nomCliente,
      contacto,
      departamento,
      ciudad
    });
>>>>>>> local
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

<<<<<<< master
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
=======
// PUT /clientes/:id - actualizar un cliente
router.put('/:id', async function(req, res) {
  const { nomCliente, contacto, departamento, ciudad } = req.body;

  if (!nomCliente || !contacto || !departamento || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [clientesEncontrados] = await db.query(
      'SELECT id_cliente FROM clientes WHERE id_cliente = ?',
      [req.params.id]
    );

    if (clientesEncontrados.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const [result] = await db.query(
      'UPDATE clientes SET nomCliente = ?, contacto = ?, departamento = ?, ciudad = ? WHERE id_cliente = ?',
      [nomCliente, contacto, departamento, ciudad, req.params.id]
    );

    res.json({
      id_cliente: Number(req.params.id),
      nomCliente,
      contacto,
      departamento,
      ciudad
    });
>>>>>>> local
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

<<<<<<< master
// 4. ELIMINAR CLIENTE (DELETE)
router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    res.json({ message: 'Cliente eliminado correctamente' });
=======
// DELETE /clientes/:id - eliminar un cliente
router.delete('/:id', async function(req, res) {
  try {
    const [result] = await db.query(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(204).send();
>>>>>>> local
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;