import React from 'react';

function HistoricalData({ data }) {
  return (
    <div className="historical-data bg-white p-4 rounded-lg shadow-lg mt-4">
      <h2 className="header mb-4">Datos Históricos</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2 border border-gray-500">Temperatura</th>
            <th className="px-4 py-2 border border-gray-500">Calidad del Agua</th>
            <th className="px-4 py-2 border border-gray-500">Nivel de Oxígeno</th>
            <th className="px-4 py-2 border border-gray-500">Cantidad de Comida (g)</th>
            <th className="px-4 py-2 border border-gray-500">Nivel de pH</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2 border border-gray-500">{item.temperaturaAgua !== undefined ? item.temperaturaAgua.toFixed(2) : 'N/A'}</td>
              <td className="px-4 py-2 border border-gray-500">{item.calidadAgua !== undefined ? item.calidadAgua.toFixed(2) : 'N/A'}</td>
              <td className="px-4 py-2 border border-gray-500">{item.nivelOxigeno !== undefined ? item.nivelOxigeno.toFixed(2) : 'N/A'}</td>
              <td className="px-4 py-2 border border-gray-500">{item.cantidadComida !== undefined ? item.cantidadComida.toFixed(2) : 'N/A'}</td>
              <td className="px-4 py-2 border border-gray-500">{item.nivelPH !== undefined ? item.nivelPH.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricalData;
