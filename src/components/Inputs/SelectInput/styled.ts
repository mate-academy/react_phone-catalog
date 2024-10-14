import styled, { css } from 'styled-components';

type InputType = {
  width: string;
};

const InputBlockStyled = styled.div<InputType>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: ${({ width }) => width};
`;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LabelStyled = styled.label`
  font-weight: 600;
  font-size: 12px;
  line-height: 15.34px;
  width: 100%;
  color: ${({ theme }) => theme.textSecondColor};
  height: 19px;
`;

type SelectType = {
  isOpened: boolean;
};

const SelectStyled = styled.div<SelectType>`
  cursor: pointer;
  width: 100%;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  border: ${({ isOpened, theme }) =>
    isOpened
      ? `1px solid ${theme.selectBorderFocus}`
      : `1px solid ${theme.selectBorder}`};
  padding: 10px 12px;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  background-color: ${({ theme }) => theme.selectBackground};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    border: ${({ isOpened, theme }) => {
      if (isOpened) {
        return `1px solid ${theme.selectBorderFocus}`;
      } else {
        return `1px solid ${theme.selectBorderHover}`;
      }
    }};
  }
`;

type ImgRightProps = {
  isLabel: boolean;
  isOpenOptions: boolean;
};

const ImgRightStyled = styled.div<ImgRightProps>`
  position: absolute;
  width: 10px;
  height: 6px;
  ${({ isLabel }) => (isLabel ? `top: 35.33px;` : 'top: 17.33px;')}
  right: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;

  SVG {
    fill: ${({ theme }) => theme.selectImgColor};
  }

  ${({ isOpenOptions }) => {
    return isOpenOptions
      ? css`
          transform: rotate(-180deg);
        `
      : '';
  }}
`;

export {
  InputBlockStyled,
  ContainerStyled,
  LabelStyled,
  SelectStyled,
  ImgRightStyled,
};
