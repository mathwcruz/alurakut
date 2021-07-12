import styled from 'styled-components';

export const Box = styled.div`
  background: #ffffff;
  border-radius: 8px;
`;

export const MainGrid = styled.main`
  display: grid;
  gap: 10px;
  padding: 16px;

  @media (min-width: 860px) {
    grid-template-areas: 'profile welcome profileRelations';
    grid-template-columns: 160px 1fr 312px;
  }
`;
