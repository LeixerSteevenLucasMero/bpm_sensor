// SensorChart.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SensorChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor de BMP",
        data: [],
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1,
      },
    ],
  });

  const MAX_DATA_POINTS = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensor");
        const sensorData = await response.json();

        setData((prevData) => {
          const newLabels = [
            new Date(sensorData[0].createdAt).toLocaleTimeString(),
            ...prevData.labels,
          ];

          const newDataset = {
            ...prevData.datasets[0],
            data: [
              sensorData.map((dataPoint) => dataPoint.bmp),
              ...prevData.datasets[0].data,
            ],
          };

          // Limitar el historial de datos
          if (newLabels.length > MAX_DATA_POINTS) {
            newLabels.pop();
            newDataset.data.pop();
          }

          return {
            labels: newLabels,
            datasets: [newDataset],
          };
        });

        setTimeout(fetchData, 1000);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        // Manejar el error aquí, y luego volver a intentar después de un tiempo
        setTimeout(fetchData, 1000);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SensorChart;
