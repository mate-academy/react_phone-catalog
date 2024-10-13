import styled from 'styled-components';
import { media } from '../../../utils/const';

const ProductStyled = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.textColor};
  padding-inline: 16px;
  margin-bottom: 24px;

  ${media.desktop} {
    padding: 0;
  }

  > * {
    width: 50%;
  }
`;

const TitleStyled = styled.h2`
  font-weight: 800;
  font-family: 'Mont-Bold', sans-serif;
  font-size: 22px;
  line-height: 30.8px;
  margin: 0;

  ${media.tablet} {
    font-size: 32px;
    line-height: 41px;
  }
`;

const ButtonsBlockStyled = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 16px;
`;

const ItemsStyled = styled.div`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  gap: 16px;
  padding-inline: 16px;

  ${media.desktop} {
    padding: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export { TitleStyled, ProductStyled, ButtonsBlockStyled, ItemsStyled };
