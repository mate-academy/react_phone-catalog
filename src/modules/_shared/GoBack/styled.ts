import styled from 'styled-components';
import { media } from '../../../utils/const';

const BackStyled = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;
  font-family: Mont-SemiBold, sans-serif;
  cursor: pointer;
  width: 120px;

  color: ${({ theme }) => theme.footerButton};

  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${({ theme }) => theme.buttonHoverBacground};
  }

  svg {
    fill: ${({ theme }) => theme.textColor} !important;
    padding: 3.33px 5.33px;
    box-sizing: content-box;
  }

  margin-bottom: 24px;

  ${media.tablet} {
    margin-bottom: 16px;
  }
`;

export { BackStyled };
