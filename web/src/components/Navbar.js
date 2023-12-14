// Navbar.js
import styled from 'styled-components';

export const StyledNavbar = styled.div`
  overflow: hidden;
  background-color: #4CAF50; /* Cambia el color a uno más relacionado con la salud, por ejemplo, verde */
  color: #ffffff;
  font-size: 1rem;
  padding: 15px;
  text-align: center;
`;

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    margin-right: 10px;
  }
`;

// Resto del componente Navbar
const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledTitle>
        <i className="fas fa-heartbeat"></i> Registro de pulso cardiaco <i className="fas fa-heartbeat"></i>
      </StyledTitle>
    </StyledNavbar>
  );
};

export default Navbar;
