import React from 'react';
import './index.css';
import CRUDClientes from './components/CRUDClientes';
import CRUDPeliculas from './components/CRUDPeliculas';
import CRUDRentas from './components/CRUDRentas';

const App = () => {
  return (
    <div className="App">
      <h1>Aplicación de gestión de videoclub</h1>

      <CRUDClientes />
      <CRUDPeliculas />
      <CRUDRentas />
    </div>
  );
};

export default App;