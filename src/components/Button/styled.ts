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
          background-color: #313237;
          color: white;
        `;
      }

      case 'white': {
        return css`
          border: 1px solid #b4bdc3;
          color: #313237;
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
