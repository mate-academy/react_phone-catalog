import styled from 'styled-components';

type OptionsSelectType = {
  css: { [key: string]: string };
  isActive: boolean;
  variant: 'default' | 'topSwipe';
};

const OptionsSelectStyled = styled.div<OptionsSelectType>`
  max-height: 144px;
  overflow: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.optionBackground};
  box-shadow: 0px 2px 15px 0px #0000000d;
  border: 1px solid ${({ theme }) => theme.optionBorder};
  padding-block: 8px;
  transform: ${({ isActive }) => (isActive ? 'scaleY(100%)' : 'scaleY(0%)')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  transform-origin: ${({ variant }) =>
    variant === 'default' ? 'top' : 'bottom'};
  z-index: 1000;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ css }) => css}
`;

type OptionType = {
  isActive: boolean;
};

const OptionStyled = styled.p<OptionType>`
  flex-shrink: 0;
  cursor: pointer;
  margin: 0;
  padding-left: 12px;
  width: 100%;
  height: 32px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.optionText};

  &:hover {
    background-color: ${({ theme }) => theme.optionHoverItem};
    color: ${({ theme }) => theme.optionHoverText};
  }
`;

export { OptionsSelectStyled, OptionStyled };
