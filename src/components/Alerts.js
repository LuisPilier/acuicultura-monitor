// Alerts.js
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Alerts({ sensorData }) {
  useEffect(() => {
    // Validar temperatura del agua
    if (sensorData.temperaturaAgua !== undefined && sensorData.temperaturaAgua > 28) {
      showTemperatureAlert();
    }

    // Validar calidad del agua
    if (sensorData.calidadAgua !== undefined && sensorData.calidadAgua < 80) {
      showWaterQualityAlert();
    }

    // Validar nivel de oxígeno
    if (sensorData.nivelOxigeno !== undefined && sensorData.nivelOxigeno < 7) {
      showOxygenLevelAlert();
    }

    // Validar cantidad de comida
    if (sensorData.cantidadComida !== undefined && sensorData.cantidadComida < 200) {
      showFoodLevelAlert();
    }

    // Validar nivel de pH
    if (
      sensorData.nivelPH !== undefined &&
      (sensorData.nivelPH < 6 || sensorData.nivelPH > 700.5)
    ) {
      showPHLevelAlert();
    }
  }, [sensorData]);

  const showTemperatureAlert = () => {
    showCustomAlert(
      '¡Alerta de Temperatura!',
      'La temperatura del agua es alta. Recomendaciones: Ajustar la temperatura del entorno acuático si es posible y verificar el funcionamiento del sistema de refrigeración.'
    );
  };

  const showWaterQualityAlert = () => {
    showCustomAlert(
      '¡Alerta de Calidad del Agua!',
      'La calidad del agua es baja. Recomendaciones: Verificar el sistema de filtración y realizar un cambio parcial del agua si es necesario. Además, ajustar la cantidad de alimento proporcionado.'
    );
  };

  const showOxygenLevelAlert = () => {
    showCustomAlert(
      '¡Alerta de Nivel de Oxígeno!',
      'El nivel de oxígeno es bajo. Recomendaciones: Aumentar la aireación del agua, revisar el estado del sistema de oxigenación y verificar la salud de los peces.'
    );
  };

  const showFoodLevelAlert = () => {
    showCustomAlert(
      '¡Alerta de Cantidad de Comida!',
      'La cantidad de comida es baja. Recomendaciones: Ajustar la alimentación de acuerdo con las necesidades de los peces y evaluar la salud general de los organismos acuáticos.'
    );
  };

  const showPHLevelAlert = () => {
    showCustomAlert(
      '¡Alerta de Nivel de pH!',
      'El nivel de pH es fuera del rango óptimo. Recomendaciones: Ajustar el pH utilizando productos seguros para la acuicultura y monitorear continuamente el equilibrio del pH en el sistema.'
    );
  };

  const showCustomAlert = (title, message) => {
    MySwal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Entendido',
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white',
      },
    });
  };

  return null; // No renderizamos nada en el DOM, ya que las alertas son mostradas por SweetAlert
}

export default Alerts;
