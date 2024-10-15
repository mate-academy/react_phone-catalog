import styled from 'styled-components';
import { media } from '../../../../utils/const';

const CartCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.cardBacground};
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderSecRdius};

  gap: 16px;
  padding: 16px;

  &:hover {
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.cardBorderHover};
  }

  ${media.tablet} {
    padding: 24px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const InfoStyled = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  height: 80px;

  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  & * {
    flex-shrink: 0;
  }

  svg {
    fill: ${({ theme }) => theme.buttonSecondNotColor};
    cursor: pointer;

    &:hover {
      transform: scale(1.3);
    }
  }
`;

const InfoImgStyled = styled.img`
  height: 100%;
  object-fit: cover;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }
`;

const InfoSecondStyled = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const CountCalcStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 96px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textColor};
  user-select: none;
`;

const CountNumberStyled = styled.div`
  width: 32px;
  text-align: center;
`;

const PriceItemStyled = styled.div`
  font-weight: 800;
  font-size: 22px;
  line-height: 30.8px;
  font-family: Mont-Bold, sans-serif;
  width: 90px;
`;

export {
  CartCardStyled,
  InfoStyled,
  InfoImgStyled,
  InfoSecondStyled,
  CountCalcStyled,
  CountNumberStyled,
  PriceItemStyled,
};
