import styled, { css } from 'styled-components';

type ButtonProps = {
  variant:
    | 'dark'
    | 'white'
    | 'disabled'
    | 'activate'
    | 'pagination'
    | 'capacity'
    | 'notCapacity';
  cssStyle: string;
};

const ButtonStyled = styled.div<ButtonProps>`
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case 'dark': {
        return css`
          background-color: ${({ theme }) => theme.buttonFirstColor};
          color: ${({ theme }) => theme.textThreeColor};
          border-radius: ${({ theme }) => theme.buttonFirstRadius};

          &:hover {
            background-color: ${({ theme }) => theme.buttonHoverBacground};
            box-shadow: 0 3px 13px 0 ${({ theme }) => theme.buttonHoverShadow};
          }
        `;
      }

      case 'white': {
        return css`
          background-color: ${({ theme }) => theme.buttonSecondBacground};
          border: 1px solid ${({ theme }) => theme.buttonSecondBorder};
          border-radius: ${({ theme }) => theme.borderThreeRadius};
          svg {
            fill: ${({ theme }) => theme.buttonSecondColor};
          }
          color: ${({ theme }) => theme.buttonSecondColor};

          &:hover {
            background-color: ${({ theme }) =>
              theme.buttonSecondHoverBacground};
            border: 1px solid ${({ theme }) => theme.buttonSecondHoverBorder};
          }
        `;
      }

      case 'disabled': {
        return css`
          background-color: inherit;
          border: 1px solid ${({ theme }) => theme.cardSliderNotActive};
          border-radius: ${({ theme }) => theme.borderThreeRadius};
          svg {
            fill: ${({ theme }) => theme.buttonSecondNotColor};
          }
          color: ${({ theme }) => theme.buttonSecondNotColor};
          cursor: default;
        `;
      }

      case 'activate': {
        return css`
          background-color: ${({ theme }) => theme.buttonSecondBacground};
          border: 1px solid ${({ theme }) => theme.cardSliderNotActive};
          color: ${({ theme }) => theme.buttonThreeColor};
          border-radius: ${({ theme }) => theme.buttonFirstRadius};
          cursor: default;
        `;
      }

      case 'pagination': {
        return css`
          background-color: ${({ theme }) => theme.cardBacground};
          border: 1px solid ${({ theme }) => theme.cardBorder};
          color: ${({ theme }) => theme.buttonSecondColor};
          border-radius: ${({ theme }) => theme.borderThreeRadius};
          cursor: pointer;

          &:hover {
            background-color: ${({ theme }) => theme.buttonPaginationHover};
            border: 1px solid ${({ theme }) => theme.butPaginHovBor};
          }
        `;
      }

      case 'capacity': {
        return css`
          background-color: ${({ theme }) => theme.capacityBack};
          color: ${({ theme }) => theme.capacityColor};
          border-radius: ${({ theme }) => theme.capacityRadius};

          &:hover {
            box-shadow: 0 3px 13px 0 ${({ theme }) => theme.buttonHoverShadow};
          }
        `;
      }

      case 'notCapacity': {
        return css`
          color: ${({ theme }) => theme.capacityBack};
          border-radius: ${({ theme }) => theme.capacityRadius};
          border: 1px solid ${({ theme }) => theme.capacityBorder};

          &:hover {
            border: 1px solid ${({ theme }) => theme.capacityBack};
          }
        `;
      }
    }
  }}

  padding-inline: 9.5px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Mont-Regular', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  ${({ cssStyle }) => cssStyle}
`;

export { ButtonStyled };
