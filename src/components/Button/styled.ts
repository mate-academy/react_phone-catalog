import styled, { css } from 'styled-components';

type ButtonProps = {
  variant: 'dark' | 'white';
  cssStyle: string;
};

const ButtonStyled = styled.div<ButtonProps>`
  ${({ variant }) => {
    switch (variant) {
      case 'dark': {
        return css`
          background-color: ${({ theme }) => theme.buttonFirstColor};
          color: ${({ theme }) => theme.textThreeColor};
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
        `;
      }
    }
  }}

  padding-inline: 9.5px;
  height: 40px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  ${({ cssStyle }) => cssStyle}
`;

export { ButtonStyled };
