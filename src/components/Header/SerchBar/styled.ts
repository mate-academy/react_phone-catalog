import styled from 'styled-components';
import { media } from '../../../utils/const';

type Props = {
  isFocused: boolean;
};

const FormStyled = styled.div<Props>`
  position: absolute;
  right: 50px;
  width: ${({ isFocused }) => (isFocused ? '150px' : '48px')};
  height: 48px;
  background: ${({ theme }) => theme.bacgroundDefault};
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.tablet} {
    right: 98px;
  }

  ${media.desktop} {
    right: 130px;
    height: 64px;
    width: ${({ isFocused }) => (isFocused ? '300px' : '64px')};
  }

  box-shadow: -1px 0 0 ${({ theme }) => theme.borderDefault};
`;

const InputStyled = styled.input<Props>`
  width: ${({ isFocused }) => (isFocused ? '100px' : '0')};
  height: 42.5px;
  line-height: 30px;
  outline: 0;
  border: 0;
  padding: ${({ isFocused }) => (isFocused ? '0 2px 0 5px' : '0')};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.bacgroundDefault};
  font-size: 15px;
  font-weight: 600;
  font-family: 'Mont-Regular', sans-serif;

  &::-webkit-search-decoration,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  appearance: none;

  ${media.desktop} {
    width: ${({ isFocused }) => (isFocused ? '236px' : '0')};
  }
`;

const IconStyled = styled.div<Props>`
  width: 39px;
  height: 39px;
  border-radius: 4px;
  background: ${({ isFocused, theme }) =>
    isFocused ? theme.textColor : theme.bacgroundDefault};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    stroke: ${({ isFocused, theme }) =>
      isFocused ? theme.bacgroundDefault : theme.textColor};
    transition: all 0s;
  }
`;

export { FormStyled, InputStyled, IconStyled };
