import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import * as hotPriceActions from '../features/hotPrice';
import { Loader } from '../components/Loader';

export const HotPrices = () => {
  const dispatch = useAppDispatch();
  const { hotPrice, loaded } = useAppSelector(state => state.hotPrice);

  const windowWidth = window.innerWidth;

  const gap = 16;
  const productsLength = hotPrice.length;
  const firstCard = 1;
  const lastCard = productsLength - 2;

  const cardWidthInPC = 272;
  const cardWidthInTablet = 237;
  const cardWidthInMobile = 212;

  const cardWidth =
    windowWidth >= 1135
      ? cardWidthInPC + gap
      : windowWidth >= 640
        ? cardWidthInTablet + gap
        : cardWidthInMobile + gap;

  const [currentCard, setCurrentCard] = useState(firstCard);

  const slider = useRef<HTMLDivElement>(null);

  const isFirstCard = currentCard === firstCard;
  const isLastCard =
    currentCard ===
    lastCard - (windowWidth >= 1135 ? 1 : windowWidth >= 640 ? 0 : 0);

  const transform = cardWidth * (currentCard - 1);

  const handleMoveLeft = useCallback(() => {
    if (!isFirstCard) {
      setCurrentCard(prev => prev - 1);
    }
  }, [isFirstCard]);

  const handleMoveRight = useCallback(() => {
    if (!isLastCard) {
      setCurrentCard(prev => prev + 1);
    }
  }, [isLastCard]);

  useEffect(() => {
    dispatch(hotPriceActions.init());
  }, [dispatch]);

  return (
    <section
      className="
        col-[1/5] 
        mb-[56px] 
        overflow-hidden 
        sm:col-[1/13] 
        sm:mb-[64px] 
        xl:col-[1/25]
        xl:mb-[80px]
      "
    >
      {loaded ? (
        <Loader />
      ) : (
        <div>
          <div
            className="
              mx-[16px]
              sm:mx-0
              sm:mr-[24px]
              xl:mr-0
            "
          >
            <SectionHeader
              title={'Hot prices'}
              hasButtons={true}
              isFirstCard={isFirstCard}
              isLastCard={isLastCard}
              handleMoveLeft={handleMoveLeft}
              handleMoveRight={handleMoveRight}
            />
          </div>

          <div
            className="ml-[16px] transition-transform duration-300 ease-in-out sm:mx-0"
            ref={slider}
            style={{ transform: `translateX(-${transform}px)` }}
          >
            <div className="flex gap-[16px]">
              <Card products={hotPrice} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
