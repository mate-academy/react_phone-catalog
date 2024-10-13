import { useEffect, useRef, useState } from 'react';
import productNew from '../../../../icons/ProductSlider/ProductSlide.png';
import productNew1 from '../../../../icons/ProductSlider/ProductSlide1.png';
import productNew2 from '../../../../icons/ProductSlider/ProductSlide2.png';
import banner from '../../../../icons/ProductSlider/Tablet/Banner.png';
import banner1 from '../../../../icons/ProductSlider/Tablet/Banner1.png';
import banner2 from '../../../../icons/ProductSlider/Tablet/Banner2.png';
import {
  ButStyled,
  ButtonBlockStyled,
  ButtonSliderStyled,
  ButtonsStyled,
  CarouselStyled,
  ImglStyled,
  MainContentStyled,
  PicturesSliderStyled,
} from './styled';
import { VECTOR_SVG } from '../../../../utils/SVG';
import { Button } from '../../../../components/Button/Button';

export const PicturesSlider = () => {
  const [caruselPosition, setCarouselPosition] = useState(0);
  const [itemOnUsed, setIitemOnUsed] = useState<string[]>([]);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isWitdhGetItem = () => {
    if (window.innerWidth >= 1200) {
      return [banner, banner1, banner2];
    } else if (window.innerWidth >= 640) {
      return [banner, banner1, banner2];
    } else {
      return [productNew, productNew1, productNew2];
    }
  };

  useEffect(() => {
    const itemsToSet = isWitdhGetItem();

    setIitemOnUsed(itemsToSet);
  }, [window.innerWidth]);

  useEffect(() => {
    if (!isTouching) {
      const interval = setInterval(() => {
        setCarouselPosition(prevPosition => (prevPosition + 1) % 3);
      }, 5000);

      return () => clearInterval(interval);
    }

    return;
  }, [isTouching]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;

    if (deltaX < -50) {
      if (caruselPosition < 2) {
        setCarouselPosition(prevIndex => prevIndex + 1);
      } else {
        setCarouselPosition(0);
      }
    } else if (deltaX > 50) {
      if (caruselPosition > 0) {
        setCarouselPosition(prevIndex => prevIndex - 1);
      } else {
        setCarouselPosition(2);
      }
    }

    setIsTouching(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleLeftSwipe = () => {
    setCarouselPosition(prevPosition => (prevPosition ? prevPosition - 1 : 2));
  };

  const handleRightSwipe = () => {
    setCarouselPosition(prevPosition => (prevPosition + 1) % 3);
  };

  return (
    <PicturesSliderStyled>
      <MainContentStyled>
        <ButtonSliderStyled onClick={handleLeftSwipe}>
          <Button variant="white" onFunc={handleLeftSwipe}>
            <VECTOR_SVG variant="left" />
          </Button>
        </ButtonSliderStyled>

        <CarouselStyled
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <ImglStyled
            src={itemOnUsed[0]}
            alt="productNew"
            positionTr={caruselPosition}
          />
          <ImglStyled
            src={itemOnUsed[1]}
            alt="productNew"
            positionTr={caruselPosition}
          />
          <ImglStyled
            src={itemOnUsed[2]}
            alt="productNew"
            positionTr={caruselPosition}
          />
        </CarouselStyled>

        <ButtonSliderStyled onClick={handleRightSwipe}>
          <Button variant="white" onFunc={handleRightSwipe}>
            <VECTOR_SVG variant="right" />
          </Button>
        </ButtonSliderStyled>
      </MainContentStyled>

      <ButtonsStyled>
        <ButtonBlockStyled onClick={() => setCarouselPosition(0)}>
          <ButStyled isActive={caruselPosition === 0} />
        </ButtonBlockStyled>
        <ButtonBlockStyled onClick={() => setCarouselPosition(1)}>
          <ButStyled isActive={caruselPosition === 1} />
        </ButtonBlockStyled>
        <ButtonBlockStyled onClick={() => setCarouselPosition(2)}>
          <ButStyled isActive={caruselPosition === 2} />
        </ButtonBlockStyled>
      </ButtonsStyled>
    </PicturesSliderStyled>
  );
};
