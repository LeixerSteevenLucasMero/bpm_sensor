// LatestDataCard.js
import React, { useState, useEffect } from "react";

const LatestDataCard = () => {
  const [latestId, setLatestId] = useState(null);

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensor");
        const sensorData = await response.json();
        const latestId = sensorData.length > 0 ? sensorData[0].id : null;
        setLatestId(latestId);
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    };

    // Llamar a la función de búsqueda inicial y configurar la actualización periódica (cada segundo, por ejemplo)
    fetchLatestId();
    const intervalId = setInterval(fetchLatestId, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Cantidad de registros</h2>
      {latestId !== null ? (
        <p>{latestId}</p>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </div>
  );
};

export default LatestDataCard;
