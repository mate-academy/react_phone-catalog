/* eslint-disable */
import styled from 'styled-components';
import { media } from './utils/const';

const AppStyled = styled.div`
  background-color: ${({ theme }) => theme.bacgroundPage};
  padding-top: 48px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 320px;

  ${media.desktop} {
    padding-top: 64px;
  }
`;

const MainStyled = styled.main`
  flex: 1;
`;

export { AppStyled, MainStyled };
