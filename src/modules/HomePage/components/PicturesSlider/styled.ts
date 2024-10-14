import styled from 'styled-components';
import { media } from '../../../../utils/const';

interface ImglStyledProps {
  positionTr: number;
}

interface ButStyledProps {
  isActive: boolean;
}

const PicturesSliderStyled = styled.div`
  ${media.tablet} {
    padding-inline: 24px;
  }

  ${media.desktop} {
    padding-inline: 0;
  }

  user-select: none;
`;

const MainContentStyled = styled.div`
  margin-bottom: 8px;

  ${media.tablet} {
    display: flex;
    gap: 16px;
    height: 100%;
  }
`;

const ButtonSliderStyled = styled.div`
  display: none;

  ${media.tablet} {
    display: flex;
  }

  > * {
    ${media.tablet} {
      height: 100%;
      width: 32px;
      flex-shrink: 0;
    }
  }
`;

const CarouselStyled = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  z-index: 1;

  border-radius: ${({ theme }) => theme.borderRadius};
`;

const ImglStyled = styled.img<ImglStyledProps>`
  width: 100%;
  z-index: -1;

  transform: ${({ positionTr }) => `translateX(-${positionTr * 100}%)`};
`;

const ButtonsStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ButtonBlockStyled = styled.div`
  padding: 10px 5px;
  cursor: pointer;
`;

const ButStyled = styled.div<ButStyledProps>`
  width: 14px;
  height: 4px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.cardSliderActive : theme.cardSliderNotActive};
`;

export {
  CarouselStyled,
  ImglStyled,
  ButtonsStyled,
  ButtonBlockStyled,
  ButStyled,
  PicturesSliderStyled,
  MainContentStyled,
  ButtonSliderStyled,
};
