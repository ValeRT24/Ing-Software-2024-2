import React, { useState } from 'react';

// Datos de ejemplo (simulando la conexión a una base de datos)
const clientesIniciales = [
  { id: 1, nombre: 'Juan Pérez', email: 'juanperez@correo.com' },
  { id: 2, nombre: 'Ana López', email: 'analopez@correo.com' },
  { id: 3, nombre: 'Pedro García', email: 'pedrog@correo.com' },
];

const CRUDClientes = () => {
  const [clientes, setClientes] = useState(clientesIniciales);

  // Función para agregar un nuevo cliente
  const agregarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  // Función para eliminar un cliente
  const eliminarCliente = (idCliente) => {
    setClientes(clientes.filter((cliente) => cliente.id !== idCliente));
  };

  // Función para editar un cliente
  const editarCliente = (clienteEditado) => {
    setClientes(
      clientes.map((cliente) => {
        if (cliente.id === clienteEditado.id) {
          return clienteEditado;
        }
        return cliente;
      })
    );
  };

  return (
    <div>
      <h2>Clientes</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const nuevoCliente = {
          id: Math.max(...clientes.map((cliente) => cliente.id)) + 1,
          nombre: e.target.nombre.value,
          email: e.target.email.value,
        };
        agregarCliente(nuevoCliente);
        e.target.nombre.value = '';
        e.target.email.value = '';
      }}>
        <label>Nombre:</label>
        <input type="text" name="nombre" />
        <label>Email:</label>
        <input type="email" name="email" />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => editarCliente(cliente)}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDClientes;
