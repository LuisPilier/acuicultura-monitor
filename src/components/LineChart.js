import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(entry => entry.fecha); // Utiliza la fecha como etiquetas
    const temperaturaData = data.map(entry => entry.temperaturaAgua);
    const calidadAguaData = data.map(entry => entry.calidadAgua);
    const nivelOxigenoData = data.map(entry => entry.nivelOxigeno);
    const cantidadComidaData = data.map(entry => entry.cantidadComida);
    const nivelPHData = data.map(entry => entry.nivelPH);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperatura del Agua (°C)',
            data: temperaturaData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Calidad del Agua',
            data: calidadAguaData,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Nivel de Oxígeno (mg/L)',
            data: nivelOxigenoData,
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Cantidad de Comida (g)',
            data: cantidadComidaData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Nivel de pH',
            data: nivelPHData,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category', // Cambiado a 'category' para las etiquetas de fecha
            labels: labels, // Proporciona las etiquetas de fecha
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Limpia el gráfico cuando el componente se desmonta
    };
  }, [data]);

  return (
    <div>
      <h2 className="header">Comparación de Datos</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default LineChart;