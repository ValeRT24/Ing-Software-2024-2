import React, { useState } from 'react';

// Datos de ejemplo (simulando la conexión a una base de datos)
const clientesIniciales = [
  { id: 1, nombre: 'Juan Pérez', email: 'juanperez@correo.com' },
  { id: 2, nombre: 'Ana López', email: 'analopez@correo.com' },
  { id: 3, nombre: 'Pedro García', email: 'pedrog@correo.com' },
];

const peliculasIniciales = [
  { id: 1, titulo: 'Harry Potter y la Piedra Filosofal', genero: 'Fantasía' },
  { id: 2, titulo: 'El Señor de los Anillos: La Comunidad del Anillo', genero: 'Fantasía' },
  { id: 3, titulo: 'Star Wars: Episodio IV - Una Nueva Esperanza', genero: 'Ciencia Ficción' },
];

const rentasIniciales = [
  { id: 1, clienteId: 1, peliculaId: 1, fechaRenta: '2024-04-15', fechaDevolucion: null },
  { id: 2, clienteId: 2, peliculaId: 2, fechaRenta: '2024-04-12', fechaDevolucion: '2024-04-14' },
  { id: 3, clienteId: 3, peliculaId: 3, fechaRenta: '2024-04-10', fechaDevolucion: null },
];

const CRUDRentas = () => {
  const [clientes, setClientes] = useState(clientesIniciales);
  const [peliculas, setPeliculas] = useState(peliculasIniciales);
  const [rentas, setRentas] = useState(rentasIniciales);

  // Función para obtener el cliente por ID
  const getClienteById = (idCliente) => {
    return clientes.find((cliente) => cliente.id === idCliente);
  };

  // Función para obtener la película por ID
  const getPeliculaById = (idPelicula) => {
    return peliculas.find((pelicula) => pelicula.id === idPelicula);
  };

  // Función para agregar una nueva renta
  const agregarRenta = (nuevaRenta) => {
    const existingRenta = rentas.find(
      (renta) =>
        renta.clienteId === nuevaRenta.clienteId && renta.peliculaId === nuevaRenta.peliculaId
    );

    if (!existingRenta) {
      setRentas([...rentas, nuevaRenta]);
    } else {
      alert('Ya existe una renta para este cliente y película.');
    }
  };

  // Función para eliminar una renta
  const eliminarRenta = (idRenta) => {
    setRentas(rentas.filter((renta) => renta.id !== idRenta));
  };

  // Función para editar una renta (marcar como devuelta)
  const editarRenta = (idRenta) => {
    setRentas(
      rentas.filter((renta) => renta.id !== idRenta)
    );

    // Update the remaining rental with the new fechaDevolucion
    setRentas(
      rentas.map((renta) => {
        if (renta.id === idRenta) {
          return { ...renta, fechaDevolucion: new Date().toISOString().slice(0, 10) };
        }
        return renta;
      })
    );
  };

  return (
    <div>
      <h2>Rentas</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nuevaRenta = {
            id: Math.max(...rentas.map((renta) => renta.id)) + 1,
            clienteId: parseInt(e.target.clienteId.value),
            peliculaId: parseInt(e.target.peliculaId.value),
            fechaRenta: new Date().toISOString().slice(0, 10),
            fechaDevolucion: null,
          };
          agregarRenta(nuevaRenta);
          e.target.clienteId.value = '';
          e.target.peliculaId.value = '';
        }}
      >
        <label>Cliente:</label>
        <select name="clienteId">
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
        <label>Película:</label>
        <select name="peliculaId">
          {peliculas.map((pelicula) => (
            <option key={pelicula.id} value={pelicula.id}>
              {pelicula.titulo}
            </option>
          ))}
        </select>
        <button type="submit">Rentar</button>
      </form>
      <table>
        {/* Contenido de la tabla (no modificado) */}
      </table>
    </div>
  );
};

export default CRUDRentas;
