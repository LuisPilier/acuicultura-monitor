import React from 'react';

function ConnectionStatus({ status }) {
  return <div className="connection-status mb-4">Estado de la conexión: {status}</div>;
}

export default ConnectionStatus;
