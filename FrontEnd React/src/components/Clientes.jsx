import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });
  
  // Guardar ID si estamos editando
  const [editandoId, setEditandoId] = useState(null);

  // Obtener lista de clientes
  const obtenerClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
      setCargando(false);
    } catch (err) {
      setError('No se pudo cargar la lista de clientes');
      setCargando(false);
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // Manejar inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar campos
  const resetForm = () => {
    setFormData({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
    setEditandoId(null);
  };

  // Guardar (Crear / Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/clientes/${editandoId}`, formData);
      } else {
        await api.post('/clientes', formData);
      }
      resetForm();
      obtenerClientes();
    } catch (err) {
      console.error('Error al guardar:', err);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (cliente) => {
    setEditandoId(cliente.id_cliente);
    setFormData({
      nomCliente: cliente.nomCliente || '',
      contacto: cliente.contacto || '',
      departamento: cliente.departamento || '',
      ciudad: cliente.ciudad || ''
    });
  };

  // Eliminar un registro
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return;
    try {
      await api.delete(`/clientes/${id}`);
      obtenerClientes();
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error al eliminar el cliente');
    }
  };

  if (cargando) return <p>Cargando clientes...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Clientes</h2>

      {/* Formulario Crear/Editar */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
        <h3>{editandoId ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
        
        <input
          type="text"
          name="nomCliente"
          placeholder="Nombre del Cliente"
          value={formData.nomCliente}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contacto"
          placeholder="Contacto / Teléfono"
          value={formData.contacto}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={formData.departamento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">{editandoId ? 'Actualizar' : 'Guardar'}</button>
          {editandoId && (
            <button type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Tabla de Clientes */}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomCliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>{' '}
                <button onClick={() => handleDelete(c.id_cliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;