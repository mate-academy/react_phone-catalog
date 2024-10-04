import styled from 'styled-components';

const AppStyled = styled.div`
  background-color: ${({ theme }) => theme.bacgroundDefault};
  padding-top: 48px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainStyled = styled.main`
  flex: 1;
`;

export { AppStyled, MainStyled };
