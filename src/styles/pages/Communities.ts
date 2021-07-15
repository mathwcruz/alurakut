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
    grid-template-areas: 'profile communities';
    grid-template-columns: 160px 1fr;
  }

  ul {
    li {
      position: relative;
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

      div {
        padding: 16px 24px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 24px;

        div {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }

        section {
          p {
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            color: #2e7bb4;
          }

          strong {
            display: block;
            margin-top: 3px;
            font-size: 15px;
            font-weight: 500;
            line-height: 16px;
          }
        }
      }

      small {
        position: absolute;
        bottom: 8px;
        right: 16px;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
`;
