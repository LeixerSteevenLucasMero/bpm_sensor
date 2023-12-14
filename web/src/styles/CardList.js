// CardList.js
import React from 'react';
import styled from 'styled-components';

const CardListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const CardList = ({ children }) => {
  return <CardListContainer>{children}</CardListContainer>;
};

export default CardList;
