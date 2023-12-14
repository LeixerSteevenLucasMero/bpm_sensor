// LoginForm.js
import React, { useState } from "react";
import "../css/LoginForm.css"; // Archivo de estilos

const LoginForm = ({ onLogin }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      var admin = "Admin";
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin, email, password }),
      });

      if (response.ok) {
        // Login exitoso, redirigir a la página principal
        onLogin();
      } else {
        // Mostrar un mensaje de error
        alert("Usuario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label">
          Paciente:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
