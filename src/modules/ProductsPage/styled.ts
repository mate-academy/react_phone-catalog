import styled from 'styled-components';
import { media } from '../../utils/const';

const ProductsPageStyled = styled.div`
  padding: 24px 16px 64px;

  ${media.desktop} {
    max-width: 1136px;
    margin-inline: auto;
    padding: 24px 0 64px;
  }
`;

const TitleStyled = styled.h2`
  margin: 24px 0 8px;
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  font-family: 'Mont-Bold', sans-serif;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    font-size: 48px;
    line-height: 56px;
    margin: 40px 0 8px;
  }
`;

const ModelsStyled = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textSecondColor};
  margin-bottom: 32px;
`;

const SelectsStyled = styled.div`
  display: flex;
  gap: 16px;

  width: 100%;
`;

const SelectFixInput = styled.div`
  max-width: 187px;
  width: 100%;

  ${media.desktop} {
    max-width: 176px;
  }
`;

const SelectFixSecond = styled.div`
  flex-shrink: 0.2;
  width: 136px;

  ${media.desktop} {
    width: 128px;
  }
`;

const ProductsNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  font-size: 32px;
  line-height: 41px;

  color: ${({ theme }) => theme.textColor};
`;

const NotFoundImg = styled.img`
  width: 100%;
`;

export {
  ProductsPageStyled,
  TitleStyled,
  ModelsStyled,
  SelectsStyled,
  SelectFixInput,
  SelectFixSecond,
  ProductsNotFound,
  NotFoundImg,
};
