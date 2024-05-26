import styled from 'styled-components';

interface ImglStyledProps {
  positionTr: number;
}

interface ButStyledProps {
  isActive: boolean;
}

interface ButtonSliderProps {
  height: number;
}

const PicturesSliderStyled = styled.div`
  @media (min-width: 640px) {
    padding-inline: 24px;
  }

  @media (min-width: 1200px) {
    padding-inline: 0;
  }
`;

const MainContentStyled = styled.div`
  margin-bottom: 8px;

  @media (min-width: 640px) {
    display: flex;
    gap: 16px;
    height: 100%;
  }
`;

const ButtonSliderStyled = styled.div<ButtonSliderProps>`
  display: none;

  @media (min-width: 640px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => `${height}px`};
    width: 32px;
    border: 1px solid #b4bdc3;
    flex-shrink: 0;
    cursor: pointer;
  }
`;

const CarouselStyled = styled.div`
  display: flex;
  overflow: hidden;
`;

const ImglStyled = styled.img<ImglStyledProps>`
  width: 100%;
  transition: transform 0.3s;

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
  background-color: ${({ isActive }) => (isActive ? '#313237' : '#E2E6E9')};
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
