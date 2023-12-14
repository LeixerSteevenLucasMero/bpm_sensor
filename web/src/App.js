// App.js
import React, { useState } from "react";
import CardList from "./styles/CardList";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import AccelerometerCard from "./components/AccelerometerCard";
import SensorChart from "./components/SensorChart";
import LatestDataCard from "./components/LatestDataCard"; // Importa el nuevo componente

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Actualizar el estado para indicar que el usuario ha iniciado sesión
    setLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        // Mostrar la aplicación principal si el usuario ha iniciado sesión
        <div>
          <Navbar />

          <CardList>
            <AccelerometerCard />
            <LatestDataCard />
          </CardList>

          <div>
            <h1>Gráfico del Sensor de BMP</h1>
            {/* Usa el componente SensorChart sin pasar sensorDataKeys y label */}
            <SensorChart />
          </div>
        </div>
      ) : (
        // Mostrar el formulario de inicio de sesión si el usuario no ha iniciado sesión
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
