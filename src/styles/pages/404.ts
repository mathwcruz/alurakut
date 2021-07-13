import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  max-width: 980px;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    text-align: center;

    img {
      width: 25rem;
      max-width: 35rem;
    }

    p {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333333;
      margin: 2.5rem auto 1.5rem;
    }

    h4 {
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: var(--text);

      a {
        color: #333333;
        text-decoration: underline;
        transition: color 0.2s;

        &:hover {
          color: #2e7bb4;
        }
      }
    }
  }
`;
