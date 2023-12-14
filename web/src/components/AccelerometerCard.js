import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledAccelerometerCard = styled.div`
  background-color: white;
  box-shadow: 2px 2px 12px 1px rgba(140, 140, 140, 0.5);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
`;

const AccelerometerTitle = styled.p`
  color: #00795e;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Reading = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const AccelerometerCard = () => {
  const [bmpData, setBmpData] = useState(0);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor');
        const data = await response.json();

        // Actualizar el estado con el último valor de bmp
        if (data.length > 0) {
          const latestSensorData = data[0];
          setBmpData(latestSensorData.bmp);
        }
      } catch (error) {
        console.error('Error fetching latest sensor data:', error);
      }
    };

    // Llamada inicial al montar el componente
    fetchLatestData();

    // Establecer un temporizador para actualizar los datos cada 1000 milisegundos (1 segundo)
    const intervalId = setInterval(() => {
      fetchLatestData();
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledAccelerometerCard>
      <AccelerometerTitle>SENSOR DE BMP</AccelerometerTitle>
      <Reading>BMP: <span id="bmp">{bmpData}</span></Reading>
    </StyledAccelerometerCard>
  );
};

export default AccelerometerCard;
