import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeContent = keyframes`
  from {
    transform: translateY(-40px);
  }
  to {
    transform: translateY(0);
  }
`;

const PopUpStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  min-width: 320px;
  padding: 16px;

  animation: ${fadeIn} 0.3s ease;
`;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.cardBacground};
  color: ${({ theme }) => theme.textColor};
  position: relative;

  gap: 20px;
  padding: 40px 30px 30px;

  &:hover {
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.cardBorderHover};
  }

  animation: ${fadeContent} 0.3s ease;
`;

const ExitPopUpStyled = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.buttonSecondColor} !important;
  }
`;

export { PopUpStyled, ContainerStyled, ExitPopUpStyled };
