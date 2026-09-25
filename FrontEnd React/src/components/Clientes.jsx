import { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formulario, setFormulario] = useState({
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarClientes = () => {
    setCargando(true);
    api.get('/clientes')
      .then(response => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de clientes');
        setCargando(false);
        console.error(err);
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const manejarCambio = event => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const limpiarFormulario = () => {
    setFormulario({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
    setClienteEditando(null);
  };

  const manejarEnvio = event => {
    event.preventDefault();
    setError(null);

    const solicitud = clienteEditando
      ? api.put(`/clientes/${clienteEditando}`, formulario)
      : api.post('/clientes', formulario);

    solicitud
      .then(() => {
        limpiarFormulario();
        cargarClientes();
      })
      .catch(err => {
        setError(err.response?.data?.error || 'No se pudo guardar el cliente');
      });
  };

  const editarCliente = cliente => {
    setClienteEditando(cliente.id_cliente);
    setFormulario({
      nomCliente: cliente.nomCliente || '',
      contacto: cliente.contacto || '',
      departamento: cliente.departamento || '',
      ciudad: cliente.ciudad || ''
    });
  };

  const eliminarCliente = id => {
    if (!window.confirm('¿Deseas eliminar este cliente?')) return;

    api.delete(`/clientes/${id}`)
      .then(() => cargarClientes())
      .catch(err => {
        setError(err.response?.data?.error || 'No se pudo eliminar el cliente');
      });
  };

  if (cargando) return <p>Cargando clientes...</p>;

  return (
    <main className="clientes-page">
      <section className="clientes-panel">
        <div className="clientes-heading">
          <p className="clientes-eyebrow">Administración</p>
          <h2>Listado de clientes</h2>
          <p className="clientes-subtitle">Gestiona la información de tus clientes.</p>
        </div>

        {error && <p className="clientes-error">{error}</p>}

        <form className="clientes-form" onSubmit={manejarEnvio}>
          <input name="nomCliente" placeholder="Nombre" value={formulario.nomCliente} onChange={manejarCambio} required />
          <input name="contacto" placeholder="Contacto" value={formulario.contacto} onChange={manejarCambio} required />
          <input name="departamento" placeholder="Departamento" value={formulario.departamento} onChange={manejarCambio} required />
          <input name="ciudad" placeholder="Ciudad" value={formulario.ciudad} onChange={manejarCambio} required />
          <div className="clientes-form-actions">
            <button className="button-primary" type="submit">{clienteEditando ? 'Actualizar' : 'Crear cliente'}</button>
            {clienteEditando && <button className="button-secondary" type="button" onClick={limpiarFormulario}>Cancelar</button>}
          </div>
        </form>

        <div className="clientes-table-wrapper">
          <table className="clientes-table">
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
              {clientes.map(c => (
                <tr key={c.id_cliente}>
                  <td>{c.id_cliente}</td>
                  <td>{c.nomCliente}</td>
                  <td>{c.contacto}</td>
                  <td>{c.departamento}</td>
                  <td>{c.ciudad}</td>
                  <td className="clientes-actions">
                    <button className="button-edit" type="button" onClick={() => editarCliente(c)}>Editar</button>
                    <button className="button-delete" type="button" onClick={() => eliminarCliente(c.id_cliente)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Clientes;
