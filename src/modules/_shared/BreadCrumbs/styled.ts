import styled from 'styled-components';

const BreadCrumbsStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.buttonSecondColor} !important;
  }

  & > :first-child {
    cursor: pointer;
  }
`;

const CrumbStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};
  user-select: none;

  svg {
    fill: ${({ theme }) => theme.buttonSecondNotColor} !important;
  }

  & > :nth-child(2) {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.textColor};
    }
  }

  & > :last-child {
    color: ${({ theme }) => theme.textSecondColor};
    cursor: default;
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
