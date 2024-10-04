import styled from 'styled-components';

const BreadCrumbsStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.buttonSecondColor} !important;
  }
`;

const CrumbStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};

  svg {
    fill: ${({ theme }) => theme.buttonSecondNotColor} !important;
  }

  & > :last-child {
    color: ${({ theme }) => theme.textSecondColor};
  }
`;

const ContainerSVGStyled = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { BreadCrumbsStyled, CrumbStyled, ContainerSVGStyled };
