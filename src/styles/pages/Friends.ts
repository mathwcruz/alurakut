import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;

  .profile {
    display: none;

    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 'profile friends';
    grid-template-columns: 1fr 3fr;
  }
`;
