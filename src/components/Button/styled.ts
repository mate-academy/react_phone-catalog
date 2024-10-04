import styled, { css } from 'styled-components';

type ButtonProps = {
  variant: 'dark' | 'white' | 'disabled' | 'activate';
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
          svg {
            fill: ${({ theme }) => theme.buttonSecondColor} !important;
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
          svg {
            fill: ${({ theme }) => theme.buttonSecondNotColor} !important;
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
          cursor: default;
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
