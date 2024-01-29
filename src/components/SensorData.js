import React from 'react';

function SensorData({ data }) {
  return (
    <div className="sensor-data bg-white border border-gray-200 rounded-lg shadow p-6 mb-6">
      <h2 className="header">Datos en vivo</h2>
      <div className='DatosEnVivo'>
        <p><strong>Temperatura del Agua:</strong> {data.temperaturaAgua !== undefined ? data.temperaturaAgua.toFixed(2) : 'N/A'} °C</p>
        <p><strong>Calidad del Agua:</strong> {data.calidadAgua !== undefined ? data.calidadAgua.toFixed(2) : 'N/A'}</p>
        <p><strong>Nivel de Oxígeno:</strong> {data.nivelOxigeno !== undefined ? data.nivelOxigeno.toFixed(2) : 'N/A'} mg/L</p>
        <p><strong>Cantidad de Comida:</strong> {data.cantidadComida !== undefined ? data.cantidadComida.toFixed(2) : 'N/A'} g</p>
        <p><strong>Nivel de pH:</strong> {data.nivelPH !== undefined ? data.nivelPH.toFixed(2) : 'N/A'}</p>
      </div>
    </div>
  );
}

export default SensorData;
