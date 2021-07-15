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
    grid-template-columns: 160px 1fr;
  }

  ul {
    li {
      max-width: 890px;
      background: #d9e6f6;
      border-radius: 8px;
      list-style: none;

      & + li {
        margin-top: 16px;
      }

      &:nth-child(2n + 2) {
        background: #f1f9fe;
      }

      a {
        text-decoration: none;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 24px;

        img {
          width: 92px;
          height: 92px;
          border-radius: 50%;
        }

        span {
          font-size: 18px;
          font-weight: 500;
          line-height: 18px;
          color: #2e7bb4;
        }
      }
    }
  }
`;
