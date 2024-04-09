import React, { useEffect, useState } from 'react';
import SensorData from './components/SensorData';
import HistoricalData from './components/HistoricalData';
import LineChart from './components/LineChart';
import Alerts from './components/Alerts';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
  extraHeaders: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
  transports: ['websocket'],
});

function App() {
  const [sensorData, setSensorData] = useState({});
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const storedHistoricalData = JSON.parse(localStorage.getItem('historicalData')) || [];
    setHistoricalData(storedHistoricalData);

    socket.on('sensorData', (data) => {
      console.log('Datos del sensor recibidos:', data);
      setSensorData(data);
      updateHistoricalData(data);
    });

    return () => {
      socket.off('sensorData');
    };
  }, []);

  const updateHistoricalData = (newData) => {
    const storedHistoricalData = JSON.parse(localStorage.getItem('historicalData')) || [];
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const newDataWithDate = { ...newData, fecha: formattedDate };
    const updatedData = [newDataWithDate, ...storedHistoricalData.slice(0, 4)];
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
      <Alerts sensorData={sensorData} />
    </div>
  );
}

export default App;
