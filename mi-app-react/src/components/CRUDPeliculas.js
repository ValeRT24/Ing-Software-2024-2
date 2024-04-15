import React, { useState } from 'react';

// Datos de ejemplo (simulando la conexión a una base de datos)
const peliculasIniciales = [
  { id: 1, titulo: 'Harry Potter y la Piedra Filosofal', genero: 'Fantasía' },
  { id: 2, titulo: 'El Señor de los Anillos: La Comunidad del Anillo', genero: 'Fantasía' },
  { id: 3, titulo: 'Star Wars: Episodio IV - Una Nueva Esperanza', genero: 'Ciencia Ficción' },
];

const CRUDPeliculas = () => {
  const [peliculas, setPeliculas] = useState(peliculasIniciales);

  // Función para agregar una nueva película
  const agregarPelicula = (nuevaPelicula) => {
    setPeliculas([...peliculas, nuevaPelicula]);
  };

  // Función para eliminar una película
  const eliminarPelicula = (idPelicula) => {
    setPeliculas(peliculas.filter((pelicula) => pelicula.id !== idPelicula));
  };

  // Función para editar una película
  const editarPelicula = (peliculaEditada) => {
    setPeliculas(
      peliculas.map((pelicula) => {
        if (pelicula.id === peliculaEditada.id) {
          return peliculaEditada;
        }
        return pelicula;
      })
    );
  };

  return (
    <div>
      <h2>Películas</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const nuevaPelicula = {
          id: Math.max(...peliculas.map((pelicula) => pelicula.id)) + 1,
          titulo: e.target.titulo.value,
          genero: e.target.genero.value,
        };
        agregarPelicula(nuevaPelicula);
        e.target.titulo.value = '';
        e.target.genero.value = '';
      }}>
        <label>Título:</label>
        <input type="text" name="titulo" />
        <label>Género:</label>
        <input type="text" name="genero" />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula) => (
            <tr key={pelicula.id}>
              <td>{pelicula.id}</td>
              <td>{pelicula.titulo}</td>
              <td>{pelicula.genero}</td>
              <td>
                <button onClick={() => editarPelicula(pelicula)}>Editar</button>
                <button onClick={() => eliminarPelicula(pelicula.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDPeliculas;
