// App.js
import React, { useEffect, useState } from 'react';
import SensorData from './components/SensorData';
import HistoricalData from './components/HistoricalData';
import LineChart from './components/LineChart';
import Alerts from './components/Alerts'; // Importa el nuevo componente Alerts
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function App({ socket }) {
  const [sensorData, setSensorData] = useState({});
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Cargar datos históricos desde localStorage al iniciar
    const storedHistoricalData = JSON.parse(localStorage.getItem('historicalData')) || [];
    setHistoricalData(storedHistoricalData);

    // Manejar eventos del socket para los datos del sensor
    socket.on('sensorData', (data) => {
      console.log('Datos del sensor recibidos:', data);
      setSensorData(data);

      // Actualizar datos históricos
      updateHistoricalData(data);
    });

    return () => {
      // Desuscribirse del evento cuando el componente se desmonta
      socket.off('sensorData');
    };
  }, [socket]);

  const updateHistoricalData = (newData) => {
    // Obtener datos históricos almacenados actualmente
    const storedHistoricalData = JSON.parse(localStorage.getItem('historicalData')) || [];

    // Obtener la fecha actual
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Puedes ajustar el formato según tus necesidades

    // Agregar la fecha al nuevo dato
    const newDataWithDate = { ...newData, fecha: formattedDate };

    // Mantener solo los últimos 5 registros, agregando el nuevo dato al principio
    const updatedData = [newDataWithDate, ...storedHistoricalData.slice(0, 4)];

    // Actualizar estado y almacenar en localStorage
    setHistoricalData(updatedData);
    localStorage.setItem('historicalData', JSON.stringify(updatedData));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="md:flex-1 md:mr-4">
        <div className="container bg-white p-8 rounded-lg shadow-lg text-center mb-4">
          <h1 className="header">Monitor de Acuicultura</h1>
          <SensorData data={sensorData} />
        </div>
      </div>
      <div className="container bg-white p-8 rounded-lg shadow-lg text-center mt-4">
        <HistoricalData data={historicalData} />
      </div>
      <div className="container bg-white p-8 rounded-lg shadow-lg text-center mt-4 w-full h-96">
        <LineChart data={historicalData} />
      </div>
      {/* Añade el componente Alerts */}
      <Alerts sensorData={sensorData} />
    </div>
  );
}

export default App;
