import styled from 'styled-components';
import { media } from '../../utils/const';

const CartStyled = styled.div`
  padding: 24px 16px 56px;

  ${media.desktop} {
    max-width: 1136px;
    min-width: 1136px;
    margin-inline: auto;
    padding: 24px 0 64px;
  }
`;

const TitleStyled = styled.h2`
  margin: 0;
  margin-bottom: 32px;
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  font-family: 'Mont-Bold', sans-serif;
  color: ${({ theme }) => theme.textColor};

  ${media.tablet} {
    font-size: 48px;
    line-height: 56px;
  }
`;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;

  ${media.desktop} {
    flex-direction: row;
    gap: 16px;
  }
`;

const ProductItemsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex-shrink: 0;

  ${media.desktop} {
    width: 752px;
  }
`;

const PriceBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.optionBorder};
  width: 100%;
  padding: 24px;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderSecRdius};

  ${media.desktop} {
    align-self: start;
  }
`;

const AllPriceStyled = styled.div`
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-family: Mont-Bold, sans-serif;
`;

const PriceInfoStyled = styled.div`
  font-family: 600;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.textSecondColor};

  padding-bottom: 16px;
  margin-bottom: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.optionBorder};

  ${media.desktop} {
    padding-bottom: 25px;
    margin-bottom: 25px;
  }
`;

const ButtonsModalStyled = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalTextStyled = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-family: Mont-SemiBold, sans-serif;

  ${media.tablet} {
    font-size: 20px;
  }
`;

export {
  CartStyled,
  TitleStyled,
  ContainerStyled,
  ProductItemsStyled,
  PriceBlockStyled,
  AllPriceStyled,
  PriceInfoStyled,
  ButtonsModalStyled,
  ModalTextStyled,
};
