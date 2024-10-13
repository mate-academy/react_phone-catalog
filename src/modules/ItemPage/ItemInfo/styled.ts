import styled from 'styled-components';
import { media } from '../../../utils/const';

const ItemInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.tablet} {
    width: 237px;
    flex-shrink: 0;
  }

  ${media.desktop} {
    width: 320px;
    margin-right: auto;
  }
`;

const BlockStyled = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.textSecondColor};
  font-weight: 600;
  font-size: 12px;
  line-height: 15.34px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.optionBorder};
  margin-bottom: 24px;
`;

const ButtonsStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: start;
`;

type MiniImgProps = {
  isActive: boolean;
};

const ColorButtonStyled = styled.div<MiniImgProps>`
  width: 32px;
  height: 32px;
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.textColor : theme.optionBorder};
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${({ isActive, theme }) =>
        isActive ? theme.textColor : theme.selectImgColor};
  }
`;

const ButtonColorInStyled = styled.div`
  border: 2px solid ${({ theme }) => theme.bacgroundDefault};
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const CountBlockStyled = styled.div`
  font-weight: 800;
  font-size: 32px;
  line-height: 41px;
  color: ${({ theme }) => theme.textColor};
  text-align: left;
  font-family: 'Mont-Bold', sans-serif;
  margin-block: 6px 16px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const RegularPriceStyled = styled.div`
  font-family: 'Mont-Regular', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 28.12px;
  color: ${({ theme }) => theme.textSecondColor};
  text-decoration: line-through;
`;

const InfoBlockStyled = styled.div`
  height: 84px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.textSecondColor};
  font-weight: 700;
  font-size: 12px;
  line-height: 15.34px;
  font-family: 'Mont-SemiBold', sans-serif;

  > * {
    display: flex;
    justify-content: space-between;
  }
`;

const InfoStyled = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const ButtonsBlockStyled = styled.div`
  display: flex;
  gap: 8px;

  & > :last-child {
    flex-shrink: 0;
  }

  margin-bottom: 32px;
`;

export {
  ItemInfoStyled,
  BlockStyled,
  ButtonsStyled,
  ColorButtonStyled,
  ButtonColorInStyled,
  CountBlockStyled,
  RegularPriceStyled,
  InfoBlockStyled,
  InfoStyled,
  ButtonsBlockStyled,
};
